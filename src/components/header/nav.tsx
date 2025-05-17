"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/siteConfig";

export default function Nav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      {navigation.map((item, index) => (
        <Link
          key={"nav" + index}
          href={item.href}
          scroll={false}
          className={`  text-base  hover:text-accent  w-fit items-center text-center transition-all duration-300 ease-in-out ${
            pathname === item.href
              ? "text-accent"
              : "text-black/60"
          }
          `}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
