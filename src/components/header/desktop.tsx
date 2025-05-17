import Nav from "./nav";
import Logo from "@/components/logo";
import Link from "next/link";
export default function Menu() {
  return (
    <div className="md:flex hidden flex-row items-center justify-between w-full gap-8   p-6">
      <div className="flex w-fit justify-start items-center">
        <Logo />
      </div>

      <div className="flex w-full justify-end items-center gap-8">
        <Nav className="flex flex-row gap-8 w-fit justify-center items-center " />
      </div>
    </div>
  );
}

function langSwitcher() {
  return (
    <div className="flex flex-row gap-2 hover:cursor-pointer">
      <p>
        EN | <span className="hover:text-accent text-accent/60">PT</span>
      </p>
    </div>
  );
}
