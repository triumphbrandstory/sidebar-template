import { db } from "./drizzle";
import { MemoriesTable, UserPreferencesTable, UsersTable } from "./schema";
import {
  placeholder_memories,
  placeholder_user_preferences,
  placeholder_users,
} from "./placeholder-data";

async function seedUsers() {
  try {
    const insertedUsers = await db.insert(UsersTable).values(placeholder_users);
    console.log(`Seeded ${insertedUsers.rowCount} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedMemories() {
  try {
    const insertedMemories = await db
      .insert(MemoriesTable)
      .values(placeholder_memories);
    console.log(`Seeded ${insertedMemories.rowCount} memories`);
  } catch (error) {
    console.error("Error seeding memories:", error);
    throw error;
  }
}

async function seedUserPreferences() {
  try {
    const insertedUserPreferences = await db
      .insert(UserPreferencesTable)
      .values(placeholder_user_preferences);
    console.log(`Seeded ${insertedUserPreferences.rowCount} preferences`);
  } catch (error) {
    console.error("Error seeding user preferences:", error);
    throw error;
  }
}

async function main() {
  try {
    await seedUsers();
    await seedMemories();
    await seedUserPreferences();
  } catch (error) {
    console.error(
      "An error occurred while attempting to seed the database:",
      error,
    );
  }
}

main();
