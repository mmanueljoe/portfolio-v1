import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SITE } from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <ScrollProgress />
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
