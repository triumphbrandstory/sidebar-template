import { db } from "@/db/drizzle";
import {
  MemoriesTable,
  UserPreferencesTable,
  UsersTable,
  insertUserUserType,
} from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq, or } from "drizzle-orm";

export const users = {
  mutate: {
    createUser: async (user: insertUserUserType) => {
      const [userExists] = await db
        .selectDistinct({
          clerk_id: UsersTable.clerk_id,
        })
        .from(UsersTable)
        .where(
          or(
            eq(UsersTable.clerk_id, user.clerk_id),
            eq(UsersTable.email, user.email),
          ),
        );

      if (userExists) {
        throw new Error("User already exists");
      }

      return Promise.all([
        await db.insert(UsersTable).values(user),
        await db
          .insert(UserPreferencesTable)
          .values({ user_id: user.clerk_id }),
      ]);
    },
    deleteUser: async (userId: string) => {
      const user = await currentUser();

      if (!user?.id) throw new Error("You don't have access to this resource");

      const userExistsAndCanBeDeleted = await db
        .select()
        .from(UsersTable)
        .where(
          and(
            eq(UsersTable.clerk_id, userId),
            eq(UsersTable.clerk_id, user.id),
          ),
        );

      // TODO: webhook to delete user from clerk or vice-versa
      if (!userExistsAndCanBeDeleted)
        throw new Error("You don't have access to delete this user");

      // transaction to delete in order (1) user preferences, (2) memories, (3) user
      if (userExistsAndCanBeDeleted) {
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
