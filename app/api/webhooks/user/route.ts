import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { data } from "@/app/data";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      await data.users.mutation.createUser({
        clerk_id: evt.data.id,
        first_name:
          evt.data.first_name || evt.data.email_addresses[0].email_address,
        last_name: evt.data.last_name || "",
        email: evt.data.email_addresses[0].email_address,
      });
      await data.user_preferences.mutation.createUserPreference({
        user_id: evt.data.id,
      });
      return new Response("User successfully created", { status: 201 });
    } catch (error) {
      return new Response("Error creating user", { status: 400 });
    }
  }
  //   TODO: For future updates
  //   if (eventType === "user.updated") {
  //     console.log("Updated user: ", {
  //       id: evt.data.id,
  //       firstName: evt.data.first_name,
  //       lastName: evt.data.last_name,
  //       email: evt.data.email_addresses[0].email_address,
  //     });
  //   }

  //   TODO: For future updates
  //   if (eventType === "user.deleted") {
  //     console.log("deleted user: ", {
  //       id: evt.data.id,
  //       email: evt.data.email_addresses[0].email_address,
  //     });
  //   }

  return new Response("", { status: 200 });
}
