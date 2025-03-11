import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  postgres: NeonQueryFunction<false, false> | undefined;
};

const postgres = globalForDb.postgres ?? neon(process.env.DATABASE_URL!);

if (process.env.NODE_ENV !== "production") globalForDb.postgres = postgres;

export const db = drizzle(postgres, {
  schema,
  logger: process.env.NODE_ENV === "development" ? true : false,
});
