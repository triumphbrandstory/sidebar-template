import { db } from "@/db/drizzle";
import { MemoriesTable, insertMemorySchema } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, count, eq, gte, isNotNull, lte, ne, or } from "drizzle-orm";
import { CreateMemoryType } from "../(dashboard)/my-lake/new-memory/schema";
import { generateNotificationDate } from "@/lib/utils";
import { subDays } from "date-fns";

export const memories = {
  query: {
    getAllUserMemories: async () => {
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0].emailAddress;

      if (!user?.id || !userEmail)
        throw new Error("You don't have access to this resource");

      // TODO: improve returning data from db
      return await db
        .select()
        .from(MemoriesTable)
        .where(
          or(
            eq(MemoriesTable.user_id, user.id),
            eq(MemoriesTable.shared_with_email, userEmail),
          ),
        );
    },
    getAllUserMemoriesCount: async () => {
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0].emailAddress;

      if (!user?.id || !userEmail)
        throw new Error("You don't have access to this resource");

      const result = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          or(
            eq(MemoriesTable.user_id, user.id),
            eq(MemoriesTable.shared_with_email, userEmail),
          ),
        );

      return result[0].count;
    },
    getUnseenUserMemories: async () => {
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0].emailAddress;

      if (!user?.id || !userEmail)
        throw new Error("You don't have access to this resource");

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
      // TODO: improve returning data from db
      return allMemories;
    },
    getCreatedUserMemoriesCount: async () => {
      const user = await currentUser();

      if (!user?.id) throw new Error("You don't have access to this resource");

      const result = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(eq(MemoriesTable.user_id, user.id));

      return result[0].count;
    },
    getSeenUserMemoriesCount: async () => {
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0].emailAddress;

      if (!user?.id || !userEmail)
        throw new Error("You don't have access to this resource");

      const seenMemoriesCreatedByUser = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.user_id, user.id),
            eq(MemoriesTable.seen_by_owner, true),
          ),
        );

      const seenMemoriesSharedWithUser = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.shared_with_email, userEmail),
            eq(MemoriesTable.seen_by_other, true),
          ),
        );

      return (
        seenMemoriesCreatedByUser[0].count + seenMemoriesSharedWithUser[0].count
      );
    },
    getUnseenUserMemoriesCount: async () => {
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0].emailAddress;

      if (!user?.id || !userEmail)
        throw new Error("You don't have access to this resource");

      const unseenMemoriesCreatedByUser = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.user_id, user.id),
            eq(MemoriesTable.seen_by_owner, false),
          ),
        );

      const unseenMemoriesSharedWithUser = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.shared_with_email, userEmail),
            eq(MemoriesTable.seen_by_other, false),
          ),
        );

      return (
        unseenMemoriesCreatedByUser[0].count +
        unseenMemoriesSharedWithUser[0].count
      );
    },
    getMemoriesSharedByUserInLast30DaysCount: async () => {
      const user = await currentUser();
      const userEmail = user?.emailAddresses[0].emailAddress;

      if (!user?.id || !userEmail)
        throw new Error("You don't have access to this resource");

      const dateLimit = subDays(new Date(), 30);

      const bottlesSentInLast30Days = await db
        .select({ count: count() })
        .from(MemoriesTable)
        .where(
          and(
            eq(MemoriesTable.user_id, user.id),
            isNotNull(MemoriesTable.shared_with_email),
            gte(MemoriesTable.created_at, dateLimit),
          ),
        );

      return bottlesSentInLast30Days[0].count;
    },

    // TODO: function do grab one single memory from the unseen lake instead of getting all and making the data available
    // instead of getting all the memories from the db, just get one that hasn't surfaced yet
    getSingleRandomUnseenUserMemory: async () => {},
  },
  mutation: {
    createMemory: async (formData: CreateMemoryType) => {
      "use server";
      const user = await currentUser();

      if (!user?.id) throw new Error("You don't have access to this resource");
      if (!formData)
        throw new Error("Failed to create memory. Form Data Missing.");

      if (
        formData.sharedWith &&
        user.emailAddresses[0].emailAddress === formData.sharedWith
      )
        throw new Error("You can't send a memory in bottle to yourself");

      let notificationDate;

      if (formData.reminderType === "at") {
        if (!formData.specificDate) {
          throw new Error("Missing the date");
        }
        notificationDate = formData.specificDate;
      }
      if (formData.reminderType === "random") {
        notificationDate = generateNotificationDate({ type: "random" });
      }
      if (formData.reminderType === "randomDay") {
        if (!formData.month || !formData.year) {
          throw new Error("Missing month or year to randomize a day");
        }
        notificationDate = generateNotificationDate({
          type: "randomDay",
          month: formData.month,
          year: formData.year,
        });
      }
      if (formData.reminderType === "randomMonth") {
        if (!formData.day || !formData.year) {
          throw new Error("Missing day or year to randomize a month");
        }
        notificationDate = generateNotificationDate({
          type: "randomMonth",
          day: formData.day,
          year: formData.year,
        });
      }
      if (formData.reminderType === "randomYear") {
        if (!formData.day || !formData.month) {
          throw new Error("Missing day or month to randomize a year");
        }
        notificationDate = generateNotificationDate({
          type: "randomYear",
          day: formData.day,
          month: formData.month,
        });
      }

      const validatedFields = insertMemorySchema.safeParse({
        user_id: user.id,
        notify_date: notificationDate,
        shared_with_email: formData.sharedWith || undefined,
        ...formData,
      });

      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: "Missing Fields. Failed to Create Memory",
        };
      }

      const createdMemory = await db
        .insert(MemoriesTable)
        .values(validatedFields.data)
        .returning({ id: MemoriesTable.id });

      return createdMemory;
    },
  },
};
