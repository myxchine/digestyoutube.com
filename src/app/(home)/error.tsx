"use client";
import { SpinnerIcon } from "@/components/icons";
import { Block, Row, Section } from "@/components/ui";
import { notFound, redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section>
      <Row>
        <Block centered padding>
          <SpinnerIcon className="size-6 text-black animate-spin" />
          <p className="text-xl text-center">
            An error occured please try again later or contact us at
            info@digestyoutube.com for help.
          </p>
        </Block>
      </Row>
    </Section>
  );
}
