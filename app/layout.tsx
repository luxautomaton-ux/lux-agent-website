import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanaChatWidget from "@/components/LanaChatWidget";

import { prefixPath } from "@/lib/prefix";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lux Automaton - Private AI Systems for Builders and Founders",
  description: "Lux Automaton is the AI Operating System company providing private, secure AI agents, coding environments, and automated business operating systems for builders, founders, and small businesses.",
  applicationName: "Lux Automaton - Private AI Systems for Builders and Founders",
  keywords: [
    "AI Operating System",
    "Lux OS",
    "Private AI Agents",
    "LANA AI",
    "Lux Codex",
    "Lux Coder",
    "Business Automation",
    "Founder Productivity",
    "Small Business AI",
  ],
  icons: {
    icon: [
      { url: prefixPath("/images/logo-icon.svg"), type: "image/svg+xml" },
    ],
    apple: [
      { url: prefixPath("/images/logo.png") },
    ]
  },
  openGraph: {
    title: "Lux Automaton - Private AI Systems for Builders and Founders",
    description: "Lux Automaton is the AI Operating System company providing private, secure AI agents, coding environments, and automated business operating systems.",
    type: "website",
    url: "https://luxautomaton-ux.github.io/Lux-Automaton-Website/",
    images: [{ url: "https://luxautomaton-ux.github.io/Lux-Automaton-Website/og.png", width: 1200, height: 630, alt: "Lux Automaton — Build the future with AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lux Automaton - Private AI Systems for Builders and Founders",
    description: "Private AI Operating Systems and secure agents for builders, founders, and small businesses.",
    images: ["https://luxautomaton-ux.github.io/Lux-Automaton-Website/og.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased" style={{ background: "var(--bg-base)" }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <LanaChatWidget />
      </body>
    </html>
  );
}
