import { Block, Row, Section } from "@/components/ui";
import "../legal.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "DIGEST YOUTUBE is a free YouTube video summariser that allows you to summarise any YouTube video of any length for free. Simply copy and paste a YouTube video URL and get an accurate excerpt and detailed summary.",
};
export default function TermsOfServicePage() {
  return (
    <Section>
      <Row>
        <Block>
          <h1>Terms of Service for DIGEST YOUTUBE</h1>
          <p>
            <strong>Last Updated: 12th May, 2025</strong>
          </p>
          <p>
            These terms and conditions outline the rules and regulations for the
            use of DIGEST YOUTUBE's Website, located at https://digestyoutube.com.
          </p>
        </Block>
        <Block>
          <h2>1. Acceptance of Terms</h2>
          <p>By using this site, you agree to these terms.</p>
        </Block>
        <Block>
          <h2>2. Content Usage</h2>
          <ul>
            <li>
              Summaries are original, transformative works under fair use (U.S.)
              or fair dealing (EU).
            </li>
            <li>
              Do not redistribute original video content or transcripts from
              source videos.
            </li>
          </ul>
        </Block>
        <Block>
          <h2>3. DMCA Complianc</h2>
          <p>
            To report copyright infringement, email dmca@digestyoutube.com
            with:
          </p>
          <ul>
            <li>A physical or electronic signature.</li>
            <li>Identification of the infringing material.</li>
          </ul>
          <p>
            We will remove infringing content within 48 hours of valid notice.
          </p>
        </Block>
        <Block>
          <h2>4. Limitation of Liability</h2>
          <p>
            We are not responsible for inaccuracies in summaries or third-party
            content.
          </p>
        </Block>
        <Block>
          <h2>5. Termination</h2>
          <p>We reserve the right to ban users who violate these terms.</p>
        </Block>
      </Row>
    </Section>
  );
}
