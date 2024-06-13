import { db } from "@/db/drizzle";
import { UserPreferencesTable } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const user_preferences = {
  query: {
    getUserPreferences: async () => {
      const user = await currentUser();

      if (!user?.id) throw new Error("You don't have access to this resource");

      const user_preferences = await db
        .selectDistinct()
        .from(UserPreferencesTable)
        .where(eq(UserPreferencesTable.user_id, user.id));

      return user_preferences;
    },
  },
  mutation: {
    // TODO
    updateUserPreferences: async () => {},
  },
};
