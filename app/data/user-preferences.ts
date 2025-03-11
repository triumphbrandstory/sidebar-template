import { db } from "@/db/drizzle";
import { MemoriesTable, UserPreferencesTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { subDays } from "date-fns";
import { and, count, eq, gte, isNotNull, or } from "drizzle-orm";

export const user_preferences = {
  query: {
    getUserPreferences: async () => {
      const user = await currentUser();

      if (!user?.id) throw new Error("You don't have access to this resource");

      const user_preferences = await db
        .selectDistinct()
        .from(UserPreferencesTable)
        .where(eq(UserPreferencesTable.user_id, user.id));

      return {
        app_notification: user_preferences[0].app_notification,
        email_notification: user_preferences[0].email_notification,
      };
    },
    // TODO: reduce number of db calls by adding implicit data (e.g.: unseen memories + seen memories = all memories)
    getOverviewPageData: async () => {
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0].emailAddress;

      if (!user?.id || !userEmail)
        throw new Error("You don't have access to this resource");

      const [allMemories] = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          or(
            eq(MemoriesTable.user_id, user.id),
            eq(MemoriesTable.shared_with_email, userEmail),
          ),
        );

      const memoriesCount = allMemories.count;

      const [unseenMemoriesCreatedByUser] = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.user_id, user.id),
            eq(MemoriesTable.seen_by_owner, false),
          ),
        );

      const [unseenMemoriesSharedWithUser] = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.shared_with_email, userEmail),
            eq(MemoriesTable.seen_by_other, false),
          ),
        );

      const unseenMemoriesCount =
        unseenMemoriesCreatedByUser.count + unseenMemoriesSharedWithUser.count;

      const [seenMemoriesCreatedByUser] = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.user_id, user.id),
            eq(MemoriesTable.seen_by_owner, true),
          ),
        );

      const [seenMemoriesSharedWithUser] = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.shared_with_email, userEmail),
            eq(MemoriesTable.seen_by_other, true),
          ),
        );

      const seenMemoriesCount =
        seenMemoriesCreatedByUser.count + seenMemoriesSharedWithUser.count;

      const dateLimit = subDays(new Date(), 30);

      const [bottlesSentInLast30Days] = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.user_id, user.id),
            isNotNull(MemoriesTable.shared_with_email),
            gte(MemoriesTable.created_at, dateLimit),
          ),
        );

      const memoriesSharedByUserInLast30DaysCount =
        bottlesSentInLast30Days.count;

      const [user_preferences] = await db
        .selectDistinct()
        .from(UserPreferencesTable)
        .where(eq(UserPreferencesTable.user_id, user.id));

      return {
        memoriesCount,
        unseenMemoriesCount,
        seenMemoriesCount,
        memoriesSharedByUserInLast30DaysCount,
        appNotification: user_preferences?.app_notification,
        emailNotification: user_preferences?.email_notification,
      };
    },
  },
  mutate: {
    createUserPreference: async (data: { user_id: string }) => {
      const user_preferences = await db.insert(UserPreferencesTable).values({
        user_id: data.user_id,
        app_notification: true,
        email_notification: true,
      });

      return user_preferences;
    },
    updateUserPreferences: async (data: {
      field: "app_notification" | "email_notification";
      value: boolean;
    }) => {
      const user = await currentUser();

      if (!user?.id) throw new Error("You don't have access to this resource");

      if (data.field === "app_notification") {
        const user_preferences = await db
          .update(UserPreferencesTable)
          .set({ app_notification: data.value })
          .where(eq(UserPreferencesTable.user_id, user.id))
          .returning({ id: UserPreferencesTable.id });

        return user_preferences[0];
      }
      if (data.field === "email_notification") {
        const user_preferences = await db
          .update(UserPreferencesTable)
          .set({ email_notification: data.value })
          .where(eq(UserPreferencesTable.user_id, user.id))
          .returning({ id: UserPreferencesTable.id });

        return user_preferences[0];
      }
    },
  },
};
