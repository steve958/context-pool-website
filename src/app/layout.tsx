import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono  = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const SITE_URL = "https://www.contextpool.dev";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "Context Pool — Document Q&A Without Embeddings",
  description:
    "Self-hosted, open-source document Q&A. Ask questions across any document set — every chunk is checked, every answer is cited. Works with OpenAI, Anthropic, Gemini, and Ollama.",
  keywords: ["document Q&A", "RAG", "self-hosted", "open source", "LLM", "embeddings-free"],
  authors: [{ name: "Context Pool contributors" }],
  openGraph: {
    title: "Context Pool — Document Q&A Without Embeddings",
    description:
      "Self-hosted document Q&A without embeddings or vector databases. Every chunk is checked. Every answer is cited.",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/image.png", width: 1200, height: 630, alt: "Context Pool" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Context Pool",
    description: "Self-hosted document Q&A without embeddings. Open source.",
    images: ["/image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg",  type: "image/svg+xml" },
      { url: "/favicon.ico",  sizes: "any" },
      { url: "/icon-32.png",  type: "image/png", sizes: "32x32" },
      { url: "/icon-16.png",  type: "image/png", sizes: "16x16" },
    ],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Context Pool",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Self-hosted document Q&A without embeddings or vector databases. Every chunk is checked, every answer is cited.",
  url: SITE_URL,
  author: { "@type": "Organization", name: "Context Pool contributors" },
  license: "https://opensource.org/licenses/MIT",
  codeRepository: "https://github.com/steve958/Context-Pool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
