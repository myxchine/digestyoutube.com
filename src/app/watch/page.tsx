import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function WatchRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ v: string }>;
}) {
  const { v } = await searchParams;
  return redirect(`/?v=${v}`);
}
