"use client";

import { useState, useEffect } from "react";
import { MenuIcon, CloseIcon, SearchIcon } from "@/components/icons";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";
import Nav from "./nav";
import Link from "next/link";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  useEffect(() => {
    const main = document.getElementById("site-main");
    const footer = document.getElementById("site-footer");
    if (!main || !footer) {
      return;
    }
    main.style.display = isOpen ? "none" : "block";
    footer.style.display = isOpen ? "none" : "block";
  }, [isOpen]);
  return (
    <div
      className={`w-full  md:hidden p-3 px-4 flex flex-col items-center justify-start ${
        isOpen && "h-[calc(100svh-40px)]"
      }`}
    >
      <div className={`flex flex-row items-center justify-between w-full `}>
        <Buttons open={isOpen} setIsOpen={setIsOpen} />
        <Logo />
        <div className="w-1/3  flex-col justify-end items-end flex ">
          <SearchIcon className="size-6 text-accent" />
        </div>
      </div>

      {isOpen && (
        <>
          <Nav className="flex flex-col items-center gap-6 p-8 pb-4" />
          <Link
            href="/"
            className="bg-accent mt-2 font-medium  rounded-full hover:bg-white hover:text-accent border border-accent text-white  text-sm px-4 py-2 transition-all duration-300 ease-in-out w-fit"
          >
            Summarise Now
          </Link>
        </>
      )}
    </div>
  );
}

function Buttons({ open, setIsOpen }: { open: boolean; setIsOpen: any }) {
  if (!open) {
    return (
      <button
        aria-label="Open Mobile Menu"
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-start w-1/3"
      >
        <MenuIcon className="size-6" stroke="currentColor" />
      </button>
    );
  }
  return (
    <button
      aria-label="CLose Mobile Menu"
      className="flex items-center justify-start w-1/3  "
      onClick={() => setIsOpen(false)}
    >
      <CloseIcon stroke="currentColor" className="size-6" />
    </button>
  );
}
