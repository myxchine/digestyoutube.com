import { Block, Row, Section } from "@/components/ui";
import {
  SummarisedVideoList,
  SummarisedVideoListSkeleton,
} from "@/components/videos/list";
import { QUERIES } from "@/server/db/queries";
import { Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Summarised YouTube Videos",
  description:
    "Explore curated summaries of YouTube videos that have been generated on DIGEST YOUTUBE.",
};
export const runtime = "edge";

export default async function AllSummarisedYouTubeVideosPage({
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
            All Summarised YouTube Videos
          </h1>
          <p className="max-w-xl mx-auto">
            Explore curated summaries of YouTube videos that have been generated
            on DIGEST YOUTUBE.
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
          <RecentSummarisedVideos page={page} />
        </Suspense>
        <Block centered>
          <div className="flex flex-row gap-2 items-center justify-center">
            {Number(page) > 1 && (
              <Link
                href={`/videos?page=${Number(page) - 1}`}
                className="bg-accent mt-3 md:mt-4 font-medium  rounded-full hover:bg-transparent hover:text-accent border border-accent text-white  text-[16px] px-5 py-[6px] transition-all duration-300 ease-in-out w-fit"
              >
                Go to page {Number(page) - 1}
              </Link>
            )}
            <div className=" mt-3 md:mt-4 font-medium  rounded-full bg-transparent text-accent border border-accent   text-[16px] px-5 py-[6px] transition-all duration-300 ease-in-out w-fit">
              Page {page}
            </div>
            <Link
              href={`/videos?page=${Number(page) + 1}`}
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

async function RecentSummarisedVideos({ page }: { page: number }) {
  const videos = await QUERIES.getSummarisedVideo({
    limit: 6,
    page,
  });
  if (videos.length === 0) {
    return (
      <p className="w-full text-center py-8 text-sm text-black/60">
        No summarised videos on page {page} yet
      </p>
    );
  }
  return <SummarisedVideoList videos={videos} h3 />;
}
