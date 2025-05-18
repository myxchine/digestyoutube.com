"use server";

import { db } from "@/server/db";
import { video, channel } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function createSummarisedVideo(input: {
  title: string;
  summary: string;
  description: string;
  videoId: string;
  thumbnailUrl: string;
  videoPublishedAt: Date;
  duration: number;
  channelName: string;
  channelId: string;
  timeToGenerateSummary: number;
}) {
  return await db()
    .insert(video)
    .values({
      ...input,
    })
    .returning();
}

export async function deleteSummarisedVideo(videoId: string) {
  return await db().delete(video).where(eq(video.id, videoId));
}
export async function createChannel(input: {
  channel: { name: string; id: string; imageUrl: string | null };
}) {
  return await db()
    .insert(channel)
    .values({
      ...input.channel,
    })
    .returning();
}
