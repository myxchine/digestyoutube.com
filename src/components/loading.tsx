import { SpinnerIcon } from "./icons";

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-12">
      <SpinnerIcon className="size-8 animate-spin" />
    </div>
  );
}
