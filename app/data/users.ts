import { db } from "@/db/drizzle";
import {
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
  },
};
