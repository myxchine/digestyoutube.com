"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

type YTData = {
  items: [
    {
      id: string;
      snippet: {
        title: string;
        thumbnails: {
          maxres: {
            url: string;
          };
          high: {
            url: string;
          };
          default: {
            url: string;
          };
        };
        publishedAt: string;
        channelTitle: string;
        channelId: string;
      };
      contentDetails: {
        duration: string;
      };
    }?
  ];
};

export async function getYouTubeVideoDetails(
  videoId: string
): Promise<VideoDetails | null> {
  try {
    const { env } = getCloudflareContext();
    const apiKey = env.YOUTUBE_SEARCH_API_KEY;

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`;
    const res = await fetch(url);
    const data = (await res.json()) as YTData;

    if (!data.items[0]) {
      console.error("No video details found");
      return null;
    }

    const video = data.items[0];

    const title = video.snippet?.title;
    const thumbnail_url =
      video.snippet?.thumbnails?.maxres?.url ??
      video.snippet?.thumbnails?.high?.url ??
      video.snippet?.thumbnails?.default?.url;
    const rawduration = video.contentDetails?.duration;
    const publishedAt = video.snippet?.publishedAt;
    const id = video.id;
    const channelName = video.snippet?.channelTitle;
    const channelId = video.snippet?.channelId;

    if (
      !title ||
      !thumbnail_url ||
      !rawduration ||
      !publishedAt ||
      !id ||
      !channelName ||
      !channelId
    ) {
      console.error("Missing video details", {
        title,
        thumbnail_url,
        rawduration,
        publishedAt,
        id,
        channelName,
        channelId,
      });
      throw new Error("Failed to fetch all video details");
    }

    return {
      title,
      thumbnail_url,
      duration: parseDuration(rawduration),
      id,
      publishedAt,
      channelName,
      channelId,
    };
  } catch (error) {
    console.error(`Error fetching video details for ID ${videoId}:`, error);
    return null;
  }
}

function parseDuration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (match) {
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }
  return 0;
}
