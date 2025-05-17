export default function Row({
  children,
  centered,
  row,
  justifybetween,
  small,
  padding,
  full,
}: Readonly<{
  children: React.ReactNode;
  centered?: boolean;
  row?: boolean;
  justifybetween?: boolean;
  small?: boolean;
  full?: boolean;
  padding?: boolean;
}>) {
  return (
    <div
      className={`flex flex-col relative gap-8 md:gap-10 w-full mx-auto overflow-visible lg:overflow-visible  ${
        centered ? "items-center text-center justify-center" : ""
      } ${
        small
          ? "max-w-4xl p-4 md:p-6"
          : full
          ? "p-4 md:p-6"
          : "max-w-[var(--site-width)] p-4 md:p-6"
      }
      ${padding ? "my-6 md:my-10" : ""}
      `}
    >
      {children}
    </div>
  );
}
