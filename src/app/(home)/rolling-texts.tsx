"use client";

import { useEffect, useState } from "react";

export function RollingProcessingTexts() {
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
