import Mobile from "./mobile";
import Desktop from "./desktop";
import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full  flex flex-col sticky top-0 z-[1000000] bg-white/50 backdrop-blur-xl text-foreground">
      <div className="flex flex-col w-full  ">
        <div className="max-w-[var(--site-width)] mx-auto w-full ">
          <Mobile />
          <Desktop />
        </div>
      </div>
    </header>
  );
}
