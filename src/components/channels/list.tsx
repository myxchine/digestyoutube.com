import { type Channel } from "@/server/db/schema";
import Link from "next/link";
import { Block } from "@/components/ui";

export function ChannelsList({
  channels,
  h3,
}: {
  channels: Channel[];
  h3?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-8 w-full">
      {channels.map((channel) => (
        <Link
          href={`/channels/${channel.id}`}
          key={channel.id}
          className="p-4 md:p-6 rounded-2xl shadow-2xl shadow-black/40 md:shadow-black/50  hover:scale-102 transition-all duration-300"
        >
          <Block>
            <div className="flex flex-row gap-2 items-center">
              {channel.imageUrl ? (
                <img
                  src={channel.imageUrl}
                  alt={channel.name}
                  className=" object-cover rounded-full aspect-square size-16 "
                />
              ) : (
                <div className=" rounded-full size-16 aspect-square" />
              )}
              {h3 ? (
                <h3 className="line-clamp-1 text-xl md:text-2xl">
                  {channel.name} YouTube Channel Video Summaries
                </h3>
              ) : (
                <h2 className="line-clamp-1 text-xl md:text-2xl">
                  {channel.name} YouTube Channel Video Summaries
                </h2>
              )}
            </div>

            <p>
              Explore curated summaries of YouTube videos created by{" "}
              {channel.name} that have been generated on DIGEST YOUTUBE.
            </p>
            <span className="px-4 py-2 rounded-full shadow-2xl shadow-black/40 md:shadow-black/50 bg-accent text-white text-sm font-medium transition-all duration-300 ease-in-out w-fit">
              See Summarised Videos {"->"}
            </span>
          </Block>
        </Link>
      ))}
    </div>
  );
}
