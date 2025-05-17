import { db } from "@/server/db";
import { video, channel } from "@/server/db/schema";
import { eq, desc, asc, sql } from "drizzle-orm";
import { SummarisedVideo, Channel } from "@/server/db/schema";

export const QUERIES = {
  getSummarisedVideo: async function ({
    limit,
    page,
  }: {
    limit: number;
    page?: number;
  }) {
    if (page === undefined) {
      return (await db)
        .select()
        .from(video)
        .limit(limit)
        .orderBy(desc(video.createdAt));
    }
    return (await db)
      .select()
      .from(video)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(desc(video.createdAt));
  },

  getSummarisedvideoByChannelId: async function ({
    id,
    limit,
    page,
  }: {
    id: string;
    limit: number;
    page: number | undefined;
  }) {
    if (page === undefined) {
      const rows = await (await db)
        .select()
        .from(channel)
        .leftJoin(video, eq(video.channelId, channel.id))
        .where(eq(channel.id, id))
        .orderBy(desc(video.createdAt))
        .limit(limit);

      if (!rows.length) return null;

      const channelvideo = rows
        .map((row) => row.video)
        .filter((video) => video !== null);

      return {
        ...rows[0].channel,
        video: channelvideo,
      };
    }
    const rows = await (
      await db
    )
      .select()
      .from(channel)
      .leftJoin(video, eq(video.channelId, channel.id))
      .where(eq(channel.id, id))
      .orderBy(desc(video.createdAt))
      .limit(limit)
      .offset(page ? (page - 1) * limit : 0);

    if (!rows.length) return null;

    const channelvideo = rows
      .map((row) => row.video)
      .filter((video) => video !== null);

    return {
      ...rows[0].channel,
      video: channelvideo,
    };
  },
  getSummarisedVideoById: async function (
    videoId: string
  ): Promise<SummarisedVideo | null> {
    const rawvideo = await (await db)
      .select()
      .from(video)
      .where(eq(video.id, videoId));

    if (rawvideo.length === 0) {
      return null;
    }
    return rawvideo[0];
  },
  getChannels: async function ({
    limit,
    page,
  }: {
    limit: number;
    page?: number;
  }) {
    if (page === undefined) {
      const rows = await (await db)
        .select()
        .from(channel)
        .orderBy(asc(channel.name))
        .limit(limit);
      return rows;
    }
    const rows = await (
      await db
    )
      .select()
      .from(channel)
      .orderBy(asc(channel.name))
      .limit(limit)
      .offset(page ? (page - 1) * limit : 0);
    return rows;
  },
  getChannelById: async function (channelId: string): Promise<Channel | null> {
    const rawchannel = await (await db)
      .select()
      .from(channel)
      .where(eq(channel.id, channelId));

    if (rawchannel.length === 0) {
      return null;
    }
    return rawchannel[0];
  },
  getSummarisedVideoByYouTubeId: async function (
    videoYouTubeId: string
  ): Promise<SummarisedVideo | null> {
    const rawvideo = await (await db)
      .select()
      .from(video)
      .where(eq(video.videoId, videoYouTubeId));
    if (rawvideo.length === 0) {
      return null;
    }
    return rawvideo[0];
  },
};
