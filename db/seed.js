const { db } = require("@vercel/postgres");
const {
  users,
  memories,
  user_preferences,
} = require("../app/lib/placeholder-data.js");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      clerk_id TEXT UNIQUE NOT NULL,
      first_name VARCHAR(255) NOT NULL,
      last_name VARCHAR(255),
      email TEXT UNIQUE NOT NULL
    );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        return client.sql`
        INSERT INTO users (clerk_id, first_name, last_name, email)
        VALUES (${user.clerk_id}, ${user.first_name}, ${user.last_name}, ${user.email})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedMemories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "memories" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS memories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location_1 VARCHAR(255),
    location_2 VARCHAR(255),
    notify_date DATE,
    shared_with_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

    console.log(`Created "memories" table`);

    // Insert data into the "memories" table
    const insertedMemories = await Promise.all(
      memories.map(
        (memory) => client.sql`
        INSERT INTO memories (user_id, title, description, date, time, location_1, location_2, notify_date, shared_with_email)
        VALUES (${memory.user_id}, ${memory.title}, ${memory.description}, ${memory.date}, ${memory.time}, ${memory.location_1}, ${memory.location_2}, ${memory.notify_date},, ${memory.shared_with_email})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedMemories.length} memories`);

    return {
      createTable,
      memories: insertedMemories,
    };
  } catch (error) {
    console.error("Error seeding memories:", error);
    throw error;
  }
}

async function seedUserPreferences(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "user_preferences" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS user_preferences (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        app_notification BOOLEAN NOT NULL DEFAULT TRUE,
        email_notification BOOLEAN NOT NULL DEFAULT TRUE
      );
    `;

    console.log(`Created "user_preferences" table`);

    // Insert data into the "user_preferences" table
    const insertedUserPreferences = await Promise.all(
      user_preferences.map(
        (user_preference) => client.sql`
        INSERT INTO user_preferences (user_id, app_notification, email_notification)
        VALUES (${user_preference.user_id}, ${user_preference.app_notification}, ${user_preference.email_notitication})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedUserPreferences.length} preferences`);

    return {
      createTable,
      user_preference: insertedUserPreferences,
    };
  } catch (error) {
    console.error("Error seeding user preferences:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedMemories(client);
  await seedUserPreferences(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err,
  );
});
