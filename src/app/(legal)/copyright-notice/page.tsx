import { Block, Row, Section } from "@/components/ui";
import "../legal.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Copyright Notice",
  description:
    "DIGEST YOUTUBE is a free YouTube video summariser that allows you to summarise any YouTube video of any length for free. Simply copy and paste a YouTube video URL and get an accurate excerpt and detailed summary.",
};
export default function CopyrightNotice() {
  return (
    <Section>
      <Row>
        <Block>
          <h1>Copyright Notice </h1>
          <p>© 2025 DIGEST YOUTUBE. All rights reserved.</p>
          <ul>
            <li>
              <strong>Original Summaries</strong>: Protected under copyright
              law. Unauthorized redistribution is prohibited.
            </li>
            <li>
              <strong>Third-Party Content</strong>: Respect the rights of
              YouTube creators. Report misuse via info@digestyoutube.com.
            </li>
          </ul>
        </Block>
      </Row>
    </Section>
  );
}
