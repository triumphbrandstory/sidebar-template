import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { local } from "@/env";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  sql: NeonQueryFunction<false, false> | undefined;
};

const sql =
  globalForDb.sql ?? neon(process.env.DATABASE_URL || local.NEON_DATABASE_URL);

export const db = drizzle(sql, { schema });
