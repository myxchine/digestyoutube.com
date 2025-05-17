import { Block, Row, Section } from "@/components/ui";
import {
  SummarisedVideoList,
  SummarisedVideoListSkeleton,
} from "@/components/videos/list";
import { type Channel } from "@/server/db/schema";
import { QUERIES } from "@/server/db/queries";
import { Suspense } from "react";
import Link from "next/link";
import { ChannelsList } from "@/components/channels/list";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Summarised YouTube Channels",
  description:
    "Explore curated summaries of YouTube videos by channel that have been generated on DIGEST YOUTUBE.",
};
export const runtime = "edge";
export default async function AllChannelsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page: pageParam } = await searchParams;
  let page = 1;
  if (pageParam !== undefined) {
    page = Number(pageParam);
  }
  return (
    <Section>
      <Row>
        <Block centered padding small>
          <h1 className="text-4xl md:text-6xl font-normal">
            All Summarised YouTube Video Channels
          </h1>
          <p className="max-w-xl mx-auto">
            Explore curated summaries of YouTube videos by channel that have
            been generated on DIGEST YOUTUBE.
          </p>
          <Link
            href="/"
            className="bg-accent font-medium  rounded-full hover:bg-transparent hover:text-accent border border-accent text-white  text-[16px] px-5 py-[6px] transition-all duration-300 ease-in-out w-fit"
          >
            Summarise a Video for free
          </Link>
        </Block>
      </Row>
      <Row>
        <Suspense fallback={<SummarisedVideoListSkeleton />}>
          <Channels page={page} />
        </Suspense>
        <Block centered>
          <div className="flex flex-row gap-2 items-center justify-center">
            {Number(page) > 1 && (
              <Link
                href={`/channels/?page=${Number(page) - 1}`}
                className="bg-accent mt-3 md:mt-4 font-medium  rounded-full hover:bg-transparent hover:text-accent border border-accent text-white  text-[16px] px-5 py-[6px] transition-all duration-300 ease-in-out w-fit"
              >
                Go to page {Number(page) - 1}
              </Link>
            )}
            <div className=" mt-3 md:mt-4 font-medium  rounded-full bg-transparent text-accent border border-accent   text-[16px] px-5 py-[6px] transition-all duration-300 ease-in-out w-fit">
              Page {page}
            </div>
            <Link
              href={`/channels/?page=${Number(page) + 1}`}
              className="bg-accent mt-3 md:mt-4 font-medium  rounded-full hover:bg-transparent hover:text-accent border border-accent text-white  text-[16px] px-5 py-[6px] transition-all duration-300 ease-in-out w-fit"
            >
              Go to page {Number(page) + 1}
            </Link>
          </div>
        </Block>
      </Row>
    </Section>
  );
}

async function Channels({ page }: { page: number }) {
  const channels = await QUERIES.getChannels({
    limit: 6,
    page,
  });
  if (channels.length === 0) {
    return (
      <p className="w-full text-center py-8 text-sm text-black/60">
        No channels on page {page} yet
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
