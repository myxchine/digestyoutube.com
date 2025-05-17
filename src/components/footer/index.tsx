import Link from "next/link";

import { footer_main_menu } from "@/siteConfig";
const legalItems = [
  { label: "Fair Use Disclaimer", href: "/fair-use-disclaimer" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Copyright Notice", href: "/copyright-notice" },
];
export default function Footer() {
  return (
    <footer
      id="site-footer"
      className=" w-full flex flex-col items-start justify-start gap-12   md:gap-16  max-w-[var(--site-width)] mx-auto p-4 md:p-6   mt-8 md:mt-12    "
    >
      <div className="flex flex-col gap-4  md:gap-6 max-w-2xl">
        <Link href="/">
          <h2 className="text-2xl md:text-4xl">
            <span className="font-accent tracking-[-1px]">DIGEST YOUTUBE </span>
            | Free YouTube Video Summariser
          </h2>
        </Link>
        <p className=" max-w-xl w-full text-balance">
          Summarise YouTube Videos of any length for Free. Simply copy and paste
          a YouTube video URL and get an accurate excerpt and detailed summary.
        </p>
        <Link
          href="/"
          className="bg-accent font-medium  rounded-full hover:bg-transparent hover:text-accent border border-accent text-white  text-[14px] px-5 py-[8px] transition-all duration-300 ease-in-out w-fit"
        >
          Summarise a YouTube Video for Free {"->"}
        </Link>
      </div>
      <div className="flex flex-wrap  my-12 md:my-16 w-full gap-16 md:gap-24 ">
        <nav className="flex flex-col items-start gap-4  w-fit md:gap-6">
          <p className="font-semibold font-custom text-lg">Main</p>
          {footer_main_menu &&
            footer_main_menu.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={` hover:underline text-black/60 font-regular text-sm`}
              >
                {item.label}
              </Link>
            ))}
        </nav>
        <nav className="flex flex-col items-start gap-4  w-fit md:gap-6">
          <p className="font-semibold font-custom text-lg">Legal</p>

          {legalItems &&
            legalItems.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                className={` hover:underline text-black/60 font-regular text-sm`}
              >
                {item.label}
              </Link>
            ))}
        </nav>
        <nav className="flex flex-col items-start gap-4  w-fit md:gap-6">
          <p className="font-semibold font-custom text-lg">Contact</p>
          <a
            href="mailto:info@digestyoutube.com"
            className="hover:underline text-black/60 font-regular text-sm"
          >
            info@digestyoutube.com
          </a>
        </nav>
      </div>
      <div className="flex flex-col items-center justify-center text-center gap-2 text-sm md:text-base  w-full mt-4 md:mt-8">
        <p>&copy; 2025 DIGEST YOUTUBE. All rights reserved.</p>
        <p className="text-xs text-black/60 max-w-xl mx-auto">
          Disclaimer: Summaries are original, however quality may vary and
          summaries may be innacurate or contain errors. Please contact us if you
          have any questions or concerns.
        </p>
      </div>
    </footer>
  );
}
