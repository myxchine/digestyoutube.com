"use server";

import { getYouTubeVideoDetails } from "./getVideoDetails";
import { getAiSummary } from "./ai";
import getYouTubeID from "get-youtube-id";
import { QUERIES } from "@/server/db/queries";
import { getYouTubeChannelImageUrl } from "./getChannelDetails";
import { createChannel, createSummarisedVideo } from "../db/mutations";
export async function SummariseYouTubeVideo(
  prevState: { success: boolean | null; message: string; videoId?: string },
  formData: FormData
): Promise<{ success: boolean | null; message: string; videoId?: string }> {
  const performanceStart = performance.now();
  const videoUrl = formData.get("videoUrl");
  if (!videoUrl || typeof videoUrl !== "string") {
    return { message: "No video URL provided", success: false };
  }
  const videoId = getYouTubeID(videoUrl);
  if (!videoId) {
    return {
      success: false,
      message: "Provided YouTube video is not valid",
    };
  }

  const videoAlreadyExists = await QUERIES.getSummarisedVideoByYouTubeId(
    videoId
  );

  if (videoAlreadyExists) {
    return {
      success: true,
      message: "Successfully summarised video",
      videoId: videoAlreadyExists.id,
    };
  }

  try {
    const videoDetails = await getYouTubeVideoDetails(videoId);
    if (!videoDetails) {
      return {
        success: false,
        message: "Could not find YouTube video details",
      };
    }

    const summary = await getAiSummary({
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      videoTitle: videoDetails.title,
      channelName: videoDetails.channelName,
    });
    if (!summary) {
      return {
        success: false,
        message: "Could not generate summary, please try again later",
      };
    }
    const channelExists = await QUERIES.getChannelById(videoDetails.channelId);
    if (channelExists === null) {
      const channelImageUrl = await getYouTubeChannelImageUrl(
        videoDetails.channelId
      );
      await createChannel({
        channel: {
          name: videoDetails.channelName,
          id: videoDetails.channelId,
          imageUrl: channelImageUrl,
        },
      });
    }
    const timeToGenerateSummary = Math.floor(
      performance.now() - performanceStart
    );
    const returningVideo = await createSummarisedVideo({
      videoId,
      title: videoDetails.title,
      summary: summary.markdownArticle,
      description: summary.excerpt,
      videoPublishedAt: new Date(videoDetails.publishedAt),
      duration: videoDetails.duration,
      thumbnailUrl: videoDetails.thumbnail_url,
      channelName: videoDetails.channelName,
      channelId: videoDetails.channelId,
      timeToGenerateSummary,
    });

    return {
      success: true,
      message: "Video summarised successfully",
      videoId: returningVideo[0].id,
    };
  } catch (error) {
    console.error("Error summarising video:", error);
    return {
      success: false,
      message:
        "An error occurred while summarising the video, please try again later.",
    };
  }
}
