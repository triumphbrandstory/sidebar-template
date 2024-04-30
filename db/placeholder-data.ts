// USERS - (id, clerk_id, first_name, last_name, email)
// MEMORIES - (id, user_id, title, description, date, time, location_1, location_2, notify_date, shared_with_email)
// USER_PREFERENCES - (id, user_id, app_notification, email_notification)

import type {
  insertUserUserType,
  insertUserPreferencesType,
  insertMemoryType,
} from "./schema";

export const placeholder_users: insertUserUserType[] = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    clerk_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    first_name: "Laila",
    last_name: "Varaschin",
    email: "laila@laila.com",
  },
];

export const placeholder_user_preferences: insertUserPreferencesType[] = [
  {
    user_id: placeholder_users[0].clerk_id!,
    app_notification: true,
    email_notification: false,
  },
];

export const placeholder_memories: insertMemoryType[] = [
  {
    user_id: placeholder_users[0].clerk_id,
    title: "",
    description: "",
    date: "2025-6-30",
    time: "19:30",
    location_1: "",
    location_2: "",
    notify_date: "2024-12-30",
    shared_with_email: placeholder_users[1].email,
  },
];
