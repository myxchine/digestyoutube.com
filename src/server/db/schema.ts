import { sql } from "drizzle-orm";
import { index, primaryKey, text, integer } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const channel = sqliteTable("channel", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export const video = sqliteTable("video", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  summary: text("summary").notNull(),
  videoId: text("video_id", { length: 255 }).notNull(),
  channelName: text("channel_name", { length: 255 }).notNull(),
  channelId: text("channel_id", { length: 255 })
    .notNull()
    .references(() => channel.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  duration: integer("duration").notNull(),
  timeToGenerateSummary: integer("time_to_generate_summary").notNull(),
  videoPublishedAt: integer("video_published_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
});

export type SummarisedVideo = typeof video.$inferSelect;
export type Channel = typeof channel.$inferSelect;
export type NewChannel = typeof channel.$inferInsert;
