import { and, eq, lte, or } from "drizzle-orm";
import db from "./drizzle";
import { MemoriesTable, UserPreferencesTable } from "./schema";
import { auth } from "@clerk/nextjs";

// TODO: perhaps get user's info on top of file to be shared between functions
const { user: clerkUser, userId } = auth();

export async function getAllUserMemories(clerkId: string, userEmail: string) {
  // TODO: use session's information to avoid passing it every time
  // const { userId } = auth();
  // const email = user?.primaryEmailAddressId;

  return await db
    .select()
    .from(MemoriesTable)
    .where(
      or(
        eq(MemoriesTable.user_id, clerkId),
        eq(MemoriesTable.shared_with_email, userEmail),
      ),
    );
}

export async function getUnseenUserMemories(
  clerkId: string,
  userEmail: string,
) {
  // TODO: use session's information to avoid passing it every time
  // const { userId } = auth();
  // const email = user?.primaryEmailAddressId;

  // select memories created by the user,
  // that were shared with the user,
  // that were not yet seen
  const byUserMemories = await db
    .select()
    .from(MemoriesTable)
    .where(
      and(
        eq(MemoriesTable.user_id, clerkId),
        eq(MemoriesTable.seen_by_owner, false),
        lte(MemoriesTable.notify_date, new Date().toISOString()),
      ),
    );

  const toUserMemories = await db
    .select()
    .from(MemoriesTable)
    .where(
      and(
        eq(MemoriesTable.shared_with_email, userEmail),
        eq(MemoriesTable.seen_by_other, false),
        lte(MemoriesTable.notify_date, new Date().toISOString()),
      ),
    );

  const allMemories = {
    byUser: byUserMemories,
    toUser: toUserMemories,
    total: byUserMemories.length + toUserMemories.length,
  };

  return allMemories;
}

// TODO: function to get the count of yet to be seen memories
// instead of getting all the memories, just get the number of available memories to render shells on lake page
export async function getUnseenMemoriesCount() {}
// TODO: function do grab one single memory from the unseen lake instead of getting all and making the data available
// instead of getting all the memories from the db, just get one that hasn't surfaced yet
export async function getSingleRandomUnseenMemory() {}

export async function getUserPreferences() {
  if (!clerkUser?.id) {
    return { error: "You don't have access to this resource" };
  }

  const user_preferences = await db
    .selectDistinct()
    .from(UserPreferencesTable)
    .where(eq(UserPreferencesTable.user_id, clerkUser?.id));

  return user_preferences;
}
