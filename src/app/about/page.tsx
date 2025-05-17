import { Block, Row, Section } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "DIGEST YOUTUBE is a free YouTube video summariser that allows you to summarise any YouTube video of any length for free. Simply copy and paste a YouTube video URL and get an accurate excerpt and detailed summary.",
};

export default function AboutPage() {
  return (
    <Section>
      <Row>
        <Block centered padding small>
          <h1 className="heading1">About Us</h1>
          <p>
            <strong>DIGEST YOUTUBE</strong> is a free YouTube video summariser
            that allows you to summarise any YouTube video of any length for
            free. Simply copy and paste a YouTube video URL and get an accurate
            excerpt and detailed summary.
          </p>
        </Block>
      </Row>
    </Section>
  );
}
