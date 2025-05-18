"use client";

import { useActionState, useEffect, useState } from "react";
import { SummariseYouTubeVideo } from "@/server/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import "./home.css";
export default function InputForm({ url }: { url: string | undefined }) {
  const router = useRouter();
  const [formState, formAction, isPending] = useActionState(
    SummariseYouTubeVideo,
    { success: null, message: "", videoId: undefined }
  );
  useEffect(() => {
    if (formState.success === null) {
      return;
    }
    if (formState.success) {
      if (!formState.videoId) {
        toast.error("Something went wrong");
        return;
      }
      toast.success(formState.message);
      router.push("/videos/" + formState.videoId);
    }
    if (!formState.success) {
      toast.error(formState.message);
    }
  }, [formState]);

  return (
    <form
      action={formAction}
      className={`${
        isPending ? "moving-gradient animate-pulse" : "bg-transparent"
      } w-full  flex flex-row gap-2 md:gap-4 items-center justify-between rounded-full  shadow-2xl shadow-black/30 p-2 pl-4  border-black/100 border-2  `}
    >
      <input
        type="text"
        name="videoUrl"
        placeholder="YouTube Video Url"
        defaultValue={url ? "https://www.youtube.com/watch?v=" + url : ""}
        className={`focus:outline-none w-full ${isPending ? "hidden" : ""}`}
      />
      <button
        type="submit"
        className={` text-white font-medium transition-all duration-300 ease-in-out  rounded-full  py-1 md:py-2 px-4 ${
          isPending
            ? "w-full bg-transparent"
            : "w-fit bg-black hover:bg-black/80 hover:cursor-pointer "
        }`}
        disabled={isPending}
      >
        {isPending ? <RollingProcessingTexts /> : "Summarise"}
      </button>
    </form>
  );
}

function RollingProcessingTexts() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, texts[index].time);
    return () => clearInterval(interval);
  }, [index]);
  const texts = [
    { text: "Verifying...", time: randomIntFromInterval(2000, 5000) },
    { text: "Successfully verified", time: randomIntFromInterval(1000, 3000) },
    {
      text: "Fetching video details...",
      time: randomIntFromInterval(5000, 10000),
    },
    { text: "Fetching video title...", time: randomIntFromInterval(500, 2000) },
    {
      text: "Fetching video thumbnail...",
      time: randomIntFromInterval(500, 2000),
    },
    {
      text: "Fetching video duration...",
      time: randomIntFromInterval(500, 2000),
    },
    {
      text: "Extracting video contents...",
      time: randomIntFromInterval(500, 2000),
    },
    { text: "Processing video...", time: randomIntFromInterval(1000, 2000) },
    { text: "Summarising YouTube video...", time: 1000000000 },
  ];
  return <p className="text-white/80">{texts[index].text}</p>;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
