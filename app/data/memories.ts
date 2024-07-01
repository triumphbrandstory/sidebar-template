import { db } from "@/db/drizzle";
import { MemoriesTable, insertMemorySchema } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, count, eq, lte, or } from "drizzle-orm";
import { CreateMemoryType } from "../(dashboard)/my-lake/new-memory/schema";

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

    // TODO: function to get the count of memories already emerged
    getSeenUserMemoriesCount: async () => {},

    // TODO: function to get the count of yet to be seen memories
    // instead of getting all the memories, just get the number of available memories to render shells on lake page
    getUnseenUserMemoriesCount: async () => {},

    // TODO: function to count of how many memories user shared with someone in the past 30 days
    getMemoriesSharedByUserInLast30DaysCount: async () => {},

    // TODO: function do grab one single memory from the unseen lake instead of getting all and making the data available
    // instead of getting all the memories from the db, just get one that hasn't surfaced yet
    getSingleRandomUnseenUserMemory: async () => {},
  },
  mutation: {
    createMemory: async (formData: CreateMemoryType) => {
      "use server";
      const user = await currentUser();
      console.log(user?.id);

      if (!user?.id) throw new Error("You don't have access to this resource");
      if (!formData)
        throw new Error("Failed to create memory. Form Data Missing.");

      const validatedFields = insertMemorySchema.safeParse({
        user_id: user.id,
        notify_date: formData.reminderType === "at" && formData.specificDate,
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
        .values(validatedFields.data);

      return createdMemory;
    },
  },
};
