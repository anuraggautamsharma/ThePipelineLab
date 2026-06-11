import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Pipeline Lab — GTM Systems, Engineered",
  description:
    "We build AI-powered revenue engines for B2B companies. Outbound prospecting, LinkedIn ABM and content systems that fill your calendar with qualified meetings.",
  openGraph: {
    title: "The Pipeline Lab — GTM Systems, Engineered",
    description:
      "AI-powered revenue engines for B2B companies. Pipelines that don't leak.",
    url: "https://thepipelinelab.com",
    siteName: "The Pipeline Lab",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${GeistMono.variable}`}>
      <body>
        <SmoothScroll>
          <Cursor />
          <Nav />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
