import { Block, Row, Section } from "@/components/ui";
import "../legal.css";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "DIGEST YOUTUBE is a free YouTube video summariser that allows you to summarise any YouTube video of any length for free. Simply copy and paste a YouTube video URL and get an accurate excerpt and detailed summary.",
};
export default function PrivacyPolicyPage() {
  return (
    <Section>
      <Row>
        <Block>
          <h1>Privacy Policy for DIGEST YOUTUBE</h1>
          <p>
            <strong>Last Updated: 12th May, 2025</strong>
          </p>
        </Block>
        <Block>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>
              <strong>Automatically Collected Data</strong>: IP addresses,
              browser type, and cookies (used for analytics via tools like
              Google Analytics).
            </li>
            <li>
              <strong>User-Submitted Data</strong>: All users who create an
              account can only do so through google sign in where they consent
              to allowing email addresses and name used for the purpose of
              creating an account.
            </li>
            <li>
              <strong>Payment Processing</strong>: Users who choose to subscribe
              to a paid plan securely process payments through Stripe (using
              Polar.sh as merchant of record).
            </li>
          </ul>
        </Block>
        <Block>
          <h2>2. How We Use Your Data</h2>
          <p>
            We use your data to provide you with the services you request, to
            improve our website and user experience, and to comply with legal
            obligations.
          </p>
          <p>
            We may also use your data to send you promotional emails, to
            communicate with you about our products and services, and to provide
            you with other marketing materials.
          </p>
          <p>
            We may also use your data to analyze how our website is used, to
            improve our website and user experience, and to comply with legal
            obligations.
          </p>
        </Block>
        <Block>
          <h2>3. Data Sharing</h2>
          <p>
            We do not sell or rent your data to third parties. Data may be
            shared with:
          </p>
          <ul>
            <li>
              <strong>Service Providers</strong>: Hosting and analytics
              platforms.
            </li>
            <li>
              <strong>Legal Authorities</strong>: If required by law.
            </li>
          </ul>
        </Block>
        <Block>
          <h2>4. Your Rights (GDPR Compliance)</h2>
          <p>
            You have the right to request access to or deletion of your data.
          </p>
          <p>
            You also have the right to opt out of cookies via your browser
            settings.
          </p>
        </Block>
        <Block>
          <h2>5. Contact Us</h2>
          <p>For data requests, email info@digestyoutube.com.</p>
        </Block>
      </Row>
    </Section>
  );
}
