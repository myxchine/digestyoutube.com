export default function Section({
  children,
  full,
  grey,
  className,
}: Readonly<{
  children: React.ReactNode;
  full?: boolean;
  grey?: boolean;
  className?: string;
}>) {
  return (
    <div
      className={`flex flex-col gap-8 w-full  relative   ${
        full ? "" : "my-4 md:my-8 "
      }
  ${className}`}
    >
      {children}
    </div>
  );
}
