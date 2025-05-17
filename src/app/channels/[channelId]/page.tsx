import { QUERIES } from "@/server/db/queries";
import { notFound } from "next/navigation";
import { Row, Section, Block } from "@/components/ui";
import { Suspense } from "react";
import Link from "next/link";
import { SummarisedVideoList } from "@/components/videos/list";
export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ channelId: string }>;
}) {
  const channelId = (await params).channelId;
  const channel = await QUERIES.getChannelById(channelId);
  if (!channel) {
    return notFound();
  }
  return {
    title: `${channel.name} YouTube Channel Video Summaries`,
    description: `Explore curated summaries of YouTube videos created by ${channel.name} that have been generated on DIGEST YOUTUBE.`,
  };
}

export default async function ChannelPage({
  params,
  searchParams,
}: {
  params: Promise<{ channelId: string }>;
  searchParams: Promise<{ page: string }>;
}) {
  const channelId = (await params).channelId;
  const page = Number((await searchParams).page) || 1;
  const channelWithVideos = await QUERIES.getSummarisedvideoByChannelId({
    id: channelId,
    limit: 12,
    page,
  });
  if (!channelWithVideos) return notFound();

  const { name, id, video = [], imageUrl } = channelWithVideos;

  return (
    <Section>
      <Row>
        <Block small centered padding>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={name}
              className=" object-cover rounded-full aspect-square size-24 "
            />
          )}
          <h1 className="text-3xl md:text-5xl">
            {name} YouTube Channel Video Summaries
          </h1>
          <p>
            Explore curated summaries of YouTube videos created by {name} that
            have been generated on DIGEST YOUTUBE.
          </p>
          <Link
            href="/"
            className="bg-accent font-medium  rounded-full hover:bg-transparent hover:text-accent border border-accent text-white  text-[16px] px-5 py-[6px] transition-all duration-300 ease-in-out w-fit"
          >
            Summarise a Video for free
          </Link>
          <a
            href={`https://www.youtube.com/channel/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black w-fit text-white px-4 py-2  rounded-xl hover:bg-black/80 flex flex-row items-center justify-center gap-1"
          >
            {name} <ViewIcon />
          </a>
        </Block>
      </Row>
      <Row>
        {!video || video.length === 0 ? (
          <p className="w-full text-center py-8 text-sm text-black/60">
            No summarised videos yet
          </p>
        ) : (
          <SummarisedVideoList videos={video} h3 />
        )}
      </Row>
    </Section>
  );
}

function ViewIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-3 md:size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}
