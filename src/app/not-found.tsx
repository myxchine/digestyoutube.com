import { Block, Row, Section } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <Section>
      <Row>
        <Block centered>
          <h1 className="text-3xl md:text-6xl font-normal">
            404 - Page Not Found
          </h1>
          <p>The page you are looking for does not exist.</p>
          <Link
            href="/"
            className="bg-black px-4 py-2 rounded-full text-white hover:bg-black/80 "
          >
            Go Home {"->"}
          </Link>
        </Block>
      </Row>
    </Section>
  );
}
