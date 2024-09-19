import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  sql: NeonQueryFunction<false, false> | undefined;
};

const sql =
  globalForDb.sql ??
  neon(
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_DATABASE_URL!
      : process.env.DATABASE_URL!,
  );
if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;

export const db = drizzle(sql, { schema, logger: process.env.NODE_ENV === "development" ? true : false });
