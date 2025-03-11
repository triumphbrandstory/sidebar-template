import { data } from "@/app/data";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const field = formData.get("field") as
      | "app_notification"
      | "email_notification";
    const valueStr = formData.get("value") as string;
    const value = valueStr === "true";

    if (
      !field ||
      (field !== "app_notification" && field !== "email_notification")
    ) {
      return NextResponse.json(
        { error: "Invalid field parameter" },
        { status: 400 },
      );
    }

    if (typeof valueStr !== "string") {
      return NextResponse.json(
        { error: "Invalid value parameter" },
        { status: 400 },
      );
    }

    const updatedUserPreferences =
      await data.user_preferences.mutate.updateUserPreferences({
        field,
        value,
      });

    if (!updatedUserPreferences?.id) {
      return NextResponse.json(
        { error: "Failed to update user preferences" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user preferences:", error);
    return NextResponse.json(
      { error: "Failed to update user preferences" },
      { status: 500 },
    );
  }
}
