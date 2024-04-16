import { and, eq, lte, or } from "drizzle-orm";
import db from "./drizzle";
import { MemoriesTable, UserPreferencesTable } from "./schema";
import { currentUser } from "@clerk/nextjs";

// TODO: REMOVE USER INFO TESTS

// SERVER COMPONENTS
// const { user: authUser, userId } = auth();
// const user = currentUser();

// console.log("auth User: ", authUser);
// console.log("currentUser User: ", user);

// CLIENT COMPONENTS
// const { isLoaded: authLoaded, userId, sessionId, getToken } = useAuth();
// const { isLoaded, isSignedIn, user } = useUser();

// console.log("useAuth userId: ", userId);
// console.log("useUser User: ", user);

// TODO: improve returning data from db
export async function getAllUserMemories() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;

  if (!user?.id || !userEmail)
    return { error: "You don't have access to this resource" };

  return await db
    .select()
    .from(MemoriesTable)
    .where(
      or(
        eq(MemoriesTable.user_id, user.id),
        eq(MemoriesTable.shared_with_email, userEmail),
      ),
    );
}

// TODO: improve returning data from db
export async function getUnseenUserMemories() {
  const user = await currentUser();
  const userEmail = user?.emailAddresses[0].emailAddress;

  if (!user?.id || !userEmail)
    return { error: "You don't have access to this resource" };

  // select memories created by the user,
  // that were shared with the user,
  // that were not yet seen
  const byUserMemories = await db
    .select()
    .from(MemoriesTable)
    .where(
      and(
        eq(MemoriesTable.user_id, user.id),
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

// TODO: function to get the count of memories already emerged
export async function getSeenUserMemoriesCount() {}

// TODO: function to get the count of yet to be seen memories
// instead of getting all the memories, just get the number of available memories to render shells on lake page
export async function getUnseenUserMemoriesCount() {}

// TODO: function to count of how many memories user shared with someone in the past 30 days
export async function getMemoriesSharedByUserInLast30DaysCount() {}

// TODO: function do grab one single memory from the unseen lake instead of getting all and making the data available
// instead of getting all the memories from the db, just get one that hasn't surfaced yet
export async function getSingleRandomUnseenUserMemory() {}

export async function getUserPreferences() {
  const user = await currentUser();

  if (!user?.id) return { error: "You don't have access to this resource" };

  const user_preferences = await db
    .selectDistinct()
    .from(UserPreferencesTable)
    .where(eq(UserPreferencesTable.user_id, user.id));

  return user_preferences;
}
