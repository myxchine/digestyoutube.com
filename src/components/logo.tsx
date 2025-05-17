import { siteConfig } from "@/siteConfig";
import Link from "next/link";
import Image from "next/image";
export default function Logo() {
  return (
    <Link
      href="/"
      className="tracking-[-2px] font-bold text-[26px] md:text-4xl uppercase font-accent  flex flex-col"
    >
      Digest
      <span className="text-[9px] -mt-2 md:mt-0 md:text-[13px] font-sans tracking-[0.3rem] md:tracking-[0.4rem]">YouTube</span>
    </Link>
  );
}
