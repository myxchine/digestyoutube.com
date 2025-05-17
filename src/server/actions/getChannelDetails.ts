"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

type YTData = {
  items: [
    {
      snippet: {
        thumbnails: {
          default: {
            url: string;
          };
          medium: {
            url: string;
          };
          high: {
            url: string;
          };
          standard: {
            url: string;
          };
        };
      };
    }
  ];
};

export async function getYouTubeChannelImageUrl(
  channelId: string
): Promise<string | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const apiKey = env.YOUTUBE_SEARCH_API_KEY;

    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json() as YTData;

    const channel = data.items?.[0];
    if (
      channel &&
      channel.snippet &&
      channel.snippet.thumbnails &&
      channel.snippet.thumbnails.default &&
      channel.snippet.thumbnails.default.url
    ) {
      return channel.snippet.thumbnails.default?.url;
    }
    if (
      channel &&
      channel.snippet &&
      channel.snippet.thumbnails &&
      channel.snippet.thumbnails.standard &&
      channel.snippet.thumbnails.standard.url
    ) {
      return channel.snippet.thumbnails.standard?.url;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching channel details for ID ${channelId}:`, error);
    return null;
  }
}
