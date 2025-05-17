import { type SummarisedVideo } from "@/server/db/schema";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
export function SummarisedVideoList({
  videos,
  h3,
}: {
  videos: SummarisedVideo[];
  h3?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-8 w-full">
      {videos.map((video) => (
        <SummarisedVideoCard key={video.id} video={video} h3={h3} />
      ))}
    </div>
  );
}

export function SummarisedVideoCard({
  video,
  h3,
}: {
  video: SummarisedVideo;
  h3?: boolean;
}) {
  const publishedDate = new Date(video.videoPublishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });
  return (
    <Link
      href={`/videos/${video.id}`}
      className="flex flex-col  w-full shadow-2xl shadow-black/80 md:shadow-black h-fit rounded-2xl overflow-hidden bg-black hover:scale-102 transition-all duration-300"
    >
      <img
        src={video.thumbnailUrl}
        alt="Video Thumbnail"
        className="w-full object-cover aspect-6/3  max-w-[4050px] "
      />
      <div className="flex flex-col gap-2 md:gap-2 text-white  p-4 md:p-4  bg-gradient-to-t from-black via-black via-80% to-transparent -mt-16 md:-mt-12">
        {h3 ? (
          <h3 className="line-clamp-1 text-xl md:text-2xl">
            {video.title} | {video.channelName} YouTube Video Summary
          </h3>
        ) : (
          <h2 className="line-clamp-1 text-xl md:text-2xl">
            {video.title} | {video.channelName} YouTube Video Summary
          </h2>
        )}
        <p className="text-sm text-white/80 line-clamp-2">
          {video.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          <p className="bg-white/10 w-fit  text-white px-3 py-2 text-xs md:text-sm rounded-xl flex flex-row items-center justify-center gap-1">
            {video.channelName}
          </p>

          {video.duration > 0 && (
            <p className="bg-white/10 w-fit text-white px-3 py-2 text-xs md:text-sm rounded-xl  flex flex-row items-center justify-center gap-1">
              {Math.floor(video.duration / 60)} mins
            </p>
          )}

          <div className="bg-white/10 max-w-[90px] rounded-xl flex items-center justify-center">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-white px-3 py-2 text-xs md:text-sm">
              {timeAgo}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SummariseVideCardSkeleton() {
  return (
    <div className="flex flex-col  w-full shadow-2xl shadow-black/40 md:shadow-black/50 h-fit rounded-2xl overflow-hidden bg-black hover:scale-102 transition-all duration-300">
      <div className="w-full aspect-6/3 bg-white/80 animate-pulse"></div>
      <div className="w-full h-4 bg-white/80 animate-pulse"></div>
      <div className="w-full h-4 bg-white/80 animate-pulse"></div>
    </div>
  );
}

export function SummarisedVideoListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-6 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <SummariseVideCardSkeleton key={i} />
      ))}
    </div>
  );
}
