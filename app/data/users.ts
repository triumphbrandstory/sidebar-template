import { db } from "@/db/drizzle";
import { UsersTable, insertUserUserType } from "@/db/schema";
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
      if (userExists) {
        console.info("User already exists");
        return;
      }

      return await db.insert(UsersTable).values(user);
    },
  },
};
