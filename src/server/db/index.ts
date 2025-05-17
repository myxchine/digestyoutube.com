import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "edge";

export async function initDbConnection() {
  const { env } = await getCloudflareContext({ async: true });
  return drizzle(env.DB, { schema });
}

export const db = initDbConnection();
