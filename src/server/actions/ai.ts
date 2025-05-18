"use server";

import {
  GoogleGenerativeAI,
  GenerationConfig,
  SchemaType,
} from "@google/generative-ai";

import { getCloudflareContext } from "@opennextjs/cloudflare";

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: {
    type: SchemaType.OBJECT,
    properties: {
      excerpt: {
        type: SchemaType.STRING,
        description: "A concise, accurate summary of the video.",
      },
      markdownArticle: {
        type: SchemaType.STRING,
        description:
          "An in-depth article style re-write of the video in markdown format, starting with heading 2.",
      },
    },
    required: ["excerpt", "markdownArticle"],
  },
};

type SummaryObject = {
  excerpt: string;
  markdownArticle: string;
};
export async function getAiSummary({
  videoUrl,
  videoTitle,
  channelName,
}: {
  videoUrl: string;
  videoTitle: string;
  channelName: string;
}): Promise<SummaryObject | null> {
  const apiKey = getCloudflareContext().env
    .GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            fileData: {
              mimeType: "video/*",
              fileUri: videoUrl,
            },
          },
          {
            text: "You are a NO BS youtube video ingester who processes the given youtube video to firstly provide a concise summary (excerpt), and then provide a more in-depth article style re-write of the video in markdown format (only use h3 headings, h1 and h2 are reserved for other titles and dont use h4 or higher headings). If names are mentioned in the video / title / channel name feel free to refer to what is said by a person with their name if it makes grammatical sense.",
          },
        ],
      },
    ],
  });

  try {
    const result = await chatSession.sendMessage(
      `
    The youtube channel is called "${channelName}"
    the video title is "${videoTitle}"

    make sure to include relevant details in the article that backup the video if it is informative, or any important facts or data that is relevant to the video (if necessary).

    Example start of response:
   {
    "excerpt": "The excerpt is a concise summary of the entire video no longer than 4 sentences, prefereabbly 2 / 3 sentences depending on the length of the video",
    "markdownArticle": "### Start with heading 3 as heading 1 and heading 2 are used for other titles\n\nthis is relevant text for heading 3\n\n#### This is the next heading 3 tag and so on
   }

    `
    );
    const raw = result.response.text();
    const json = JSON.parse(raw);
    return json;
  } catch (error) {
    console.error("Error generating AI summary:", error);
    return null;
  }
}
