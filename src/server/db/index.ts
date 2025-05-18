import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cache } from "react";

export const db = cache(() => {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
});
