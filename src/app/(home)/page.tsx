import { Block, Row, Section } from "@/components/ui";
import InputForm from "./form";
import {
  SummarisedVideoList,
  SummarisedVideoListSkeleton,
} from "@/components/videos/list";
import { QUERIES } from "@/server/db/queries";
import { Suspense } from "react";
import Link from "next/link";
import { ChannelsList } from "@/components/channels/list";
export const runtime = "edge";
export default async function SummariseYouTubeVideoHomePage({
  searchParams,
}: {
  searchParams: Promise<{ v: string }>;
}) {
  const { v } = await searchParams;
  return (
    <Section>
      <Row>
        <Block centered padding small>
          <h1 className="text-4xl md:text-6xl font-normal">
            Summarise YouTube Videos for Free
          </h1>
          <p className="max-w-xl mx-auto">
            Simply copy and paste a YouTube video URL to get an accurate excerpt
            and detailed summary.
          </p>
          <InputForm url={v} />
        </Block>
      </Row>
      <Row>
        <Block small>
          <h2 className="text-2xl md:text-4xl font-normal">
            Recently Summarised YouTube Videos
          </h2>
          <p>
            Take a look at the most recent curated summaries of YouTube videos
            that have been generated on DIGEST YOUTUBE.
          </p>
        </Block>
        <Suspense fallback={<SummarisedVideoListSkeleton />}>
          <RecentSummarisedVideos />
        </Suspense>
        <Block centered>
          <Link
            href="/videos"
            className="bg-accent mt-3 md:mt-4 font-medium rounded-full hover:bg-transparent hover:text-accent border border-accent text-white  text-[16px] px-5 py-[6px] transition-all duration-300 ease-in-out w-fit"
          >
            See All Summarised Videos
          </Link>
        </Block>
      </Row>
      <Row>
        <Block small>
          <h2 className="text-2xl md:text-4xl font-normal">
            See YouTube Video Summaries by Channel
          </h2>
          <p>
            Explore curated summaries of YouTube videos by channel that have
            been generated on DIGEST YOUTUBE.
          </p>
        </Block>
        <Suspense fallback={<SummarisedVideoListSkeleton />}>
          <Channels />
        </Suspense>
        <Block centered>
          <Link
            href="/channels"
            className="bg-accent mt-3 md:mt-4 font-medium rounded-full hover:bg-transparent hover:text-accent border border-accent text-white  text-[16px] px-5 py-[6px] transition-all duration-300 ease-in-out w-fit"
          >
            See All Channels
          </Link>
        </Block>
      </Row>
    </Section>
  );
}

async function RecentSummarisedVideos() {
  const videos = await QUERIES.getSummarisedVideo({ limit: 6 });
  if (videos.length === 0) {
    return (
      <p className="w-full text-center py-8 text-sm text-black/60">
        No summarised videos yet
      </p>
    );
  }
  return <SummarisedVideoList videos={videos} h3 />;
}

async function Channels() {
  const channels = await QUERIES.getChannels({
    limit: 6,
  });
  if (channels.length === 0) {
    return (
      <p className="w-full text-center py-8 text-sm text-black/60">
        No channels yet
      </p>
    );
  }
  return <ChannelsList channels={channels} h3 />;
}

function ChannelsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-6 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <ChannelCardSkeleton key={i} />
      ))}
    </div>
  );
}

function ChannelCardSkeleton() {
  return (
    <div className="flex flex-col  w-full shadow-2xl shadow-black/40 md:shadow-black/50 h-fit rounded-2xl overflow-hidden bg-black hover:scale-102 transition-all duration-300">
      <div className="w-full aspect-6/3 bg-white/80 animate-pulse"></div>
      <div className="w-full h-4 bg-white/80 animate-pulse"></div>
      <div className="w-full h-4 bg-white/80 animate-pulse"></div>
    </div>
  );
}
