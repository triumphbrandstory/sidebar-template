import { relations } from "drizzle-orm";
import {
  date,
  text,
  boolean,
  pgTable,
  uuid,
  varchar,
  time,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const UsersTable = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerk_id: text("clerk_id").unique().notNull(),
    email: text("email").unique().notNull(),
    first_name: varchar("first_name", { length: 255 }).notNull(),
    last_name: varchar("last_name", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      clerk_id_idx: uniqueIndex("clerk_id_idx").on(table.clerk_id),
      email_idx: uniqueIndex("email_idx").on(table.email),
    };
  },
);

export const MemoriesTable = pgTable(
  "memories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: text("user_id")
      .notNull()
      .references(() => UsersTable.clerk_id),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    date: date("date").notNull(),
    time: time("time", { withTimezone: true }),
    location_1: varchar("location_1", { length: 255 }),
    location_2: varchar("location_2", { length: 255 }),
    notify_date: date("notify_date").notNull(),
    shared_with_email: text("shared_with_email"),
    seen_by_owner: boolean("seen_by_owner").default(false),
    seen_by_other: boolean("seen_by_other").default(false),
    created_at: timestamp("created_at", {
      withTimezone: true,
      mode: "date",
    })
      .defaultNow()
      .notNull(),
  },
  (table) => {
    return {
      user_id_idx: index("user_idx").on(table.user_id),
      notify_date_idx: index("notify_date_idx").on(table.notify_date),
      shared_with_email_idx: index("shared_with_email_idx").on(
        table.shared_with_email,
      ),
    };
  },
);

export const UserPreferencesTable = pgTable("user_preferences", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: text("user_id")
    .unique()
    .notNull()
    .references(() => UsersTable.clerk_id),
  app_notification: boolean("app_notification").default(true),
  email_notification: boolean("email_notification").default(true),
});

export const UsersTableRelations = relations(UsersTable, ({ one, many }) => {
  return {
    user_preferences: one(UserPreferencesTable),
    memories: many(MemoriesTable),
  };
});

export const UserPreferencesTableRelations = relations(
  UserPreferencesTable,
  ({ one }) => {
    return {
      user: one(UsersTable, {
        fields: [UserPreferencesTable.user_id],
        references: [UsersTable.clerk_id],
      }),
    };
  },
);

export const MemoriesTableRelations = relations(MemoriesTable, ({ one }) => {
  return {
    user: one(UsersTable, {
      fields: [MemoriesTable.user_id],
      references: [UsersTable.clerk_id],
    }),
  };
});

export const insertUserSchema = createInsertSchema(UsersTable, {
  email: (schema) => schema.email.email(),
});

export const selectMemorySchema = createSelectSchema(MemoriesTable);
export type selectMemoryType = z.infer<typeof selectMemorySchema>;

export const insertMemorySchema = createInsertSchema(MemoriesTable);
export type insertMemoryType = z.infer<typeof insertMemorySchema>;

// export type SelectUser = typeof UsersTable.$inferSelect;
// export type InsertUser = typeof UsersTable.$inferInsert;

// export type SelectMemories = typeof MemoriesTable.$inferSelect;
// export type InsertMemories = typeof MemoriesTable.$inferInsert;

// export type SelectUserPreferences = typeof UserPreferencesTable.$inferSelect;
// export type InsertUserPreferences = typeof UserPreferencesTable.$inferInsert;
