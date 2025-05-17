import { Block, Row, Section } from "@/components/ui";
import "../legal.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fair Use Disclaimer",
  description:
    "DIGEST YOUTUBE is a free YouTube video summariser that allows you to summarise any YouTube video of any length for free. Simply copy and paste a YouTube video URL and get an accurate excerpt and detailed summary.",
};

export default function FairUseDisclaimerPage() {
  return (
    <Section>
      <Row>
        <Block>
          <h1>Fair Use Disclaimer</h1>
          <p>
            DIGEST YOUTUBE creates original, transformative summaries of
            publicly available YouTube videos for educational and commentary
            purposes.
          </p>
          <p>
            <strong>Section 107 of the U.S. Copyright Act</strong>: This work
            qualifies as fair use.
          </p>
          <p>
            <strong>EU Copyright Directive</strong>: Summaries comply with
            exceptions for criticism, review, or parody.
          </p>
          <p>We attribute original creators via links to source videos.</p>
        </Block>
      </Row>
    </Section>
  );
}
