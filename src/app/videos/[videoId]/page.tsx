import { QUERIES } from "@/server/db/queries";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import markdownToHtml from "@/server/posts/helpers";
import { Row, Section, Block } from "@/components/ui";

export const runtime = "edge";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const videoId = (await params).videoId;
  const video = await QUERIES.getSummarisedVideoById(videoId);
  if (!video) {
    return notFound();
  }

  return {
    title: `${video.title} | ${video.channelName} YouTube Video Summary`,
    description: video.description,
  };
}

export default async function Video({
  params,
}: {
  params: Promise<{ videoId: string }>;
}) {
  const videoId = (await params).videoId;
  const video = await QUERIES.getSummarisedVideoById(videoId);
  if (!video) {
    return notFound();
  }
  const publishedDate = new Date(video.videoPublishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  return (
    <Section>
      <Row>
        <article className="flex flex-col md:flex-row gap-10 md:gap-12 relative">
          <div className="flex flex-col  w-full shadow-2xl shadow-black/80 md:shadow-black bg-black h-fit rounded-2xl overflow-hidden md:sticky md:top-34">
            <img
              src={video.thumbnailUrl}
              alt="Video Thumbnail"
              className="w-full object-cover aspect-6/3  "
            />
            <div className="flex flex-col gap-2 md:gap-4 text-white  p-4 md:p-6  bg-gradient-to-t from-black via-black via-85% to-transparent -mt-16 md:-mt-12">
              <h1 className="text-2xl md:text-4xl">
                {video.title} | {video.channelName} YouTube Video Summary
              </h1>
              <p className="text-sm text-white/80">{video.description}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 w-fit text-white px-3 py-2 text-xs md:text-sm rounded-xl hover:bg-white/15 flex flex-row items-center justify-center gap-1"
                >
                  {video.channelName} <ViewIcon />
                </a>
                {video.duration > 0 && (
                  <p className="bg-white/10 w-fit text-white px-3 py-2 text-xs md:text-sm rounded-xl  flex flex-row items-center justify-center gap-1">
                    {Math.floor(video.duration / 60)} min
                  </p>
                )}

                <div className="bg-white/10 max-w-[90px] rounded-xl flex items-center justify-center">
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap text-white px-3 py-2 text-xs md:text-sm">
                    {timeAgo}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Block>
            <h2 className="text-3xl md:text-4xl mb-4 mt-4 md:mt-0">
              Detailed Summary:
            </h2>
            <div
              className="flex flex-col gap-8 md:gap-8 markdown-content w-full"
              dangerouslySetInnerHTML={{
                __html: await markdownToHtml(video.summary),
              }}
            />
          </Block>
        </article>
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
