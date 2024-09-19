import { db } from "@/db/drizzle";
import {
  MemoriesTable,
  UserPreferencesTable,
  UsersTable,
  insertUserUserType,
} from "@/db/schema";
import { eq, or } from "drizzle-orm";

export const users = {
  mutation: {
    createUser: async (user: insertUserUserType) => {
      const userExists = await db
        .select()
        .from(UsersTable)
        .where(
          or(
            eq(UsersTable.clerk_id, user.clerk_id),
            eq(UsersTable.email, user.email),
          ),
        );

      if (userExists.length > 0) {
        throw new Error("User already exists");
      }

      return await db.transaction(async (tx) => {
        await tx.insert(UsersTable).values(user);
        await tx
          .insert(UserPreferencesTable)
          .values({ user_id: user.clerk_id });
      });
    },
    deleteUser: async (userId: string) => {
      const userExists = await db
        .select()
        .from(UsersTable)
        .where(
          or(eq(UsersTable.clerk_id, userId), eq(UsersTable.email, userId)),
        );

      // TODO: make sure user can only delete themselves
      const userCanBeDeleted = false;

      // create transaction to delete in order
      // 1. user preferences
      // 2. memories
      // 3. user
      if (userExists && userCanBeDeleted) {
        return await db.transaction(async (tx) => {
          await tx
            .delete(UserPreferencesTable)
            .where(eq(UserPreferencesTable.user_id, userId));
          await tx
            .delete(MemoriesTable)
            .where(eq(MemoriesTable.user_id, userId));
          await tx.delete(UsersTable).where(eq(UsersTable.clerk_id, userId));
        });
      }
    },
  },
};
