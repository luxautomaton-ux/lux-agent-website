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
  title: "Lux Agent — Your AI Team and Business Workspace",
  description: "Lux Agent is the customer-facing AI workspace for LANA, specialist agents, business context, guided workflows, approvals, tools, and day-to-day operations.",
  applicationName: "Lux Agent — Your AI Team and Business Workspace",
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
    title: "Lux Agent — Your AI Team and Business Workspace",
    description: "Lux Agent brings LANA, specialist agents, business context, workflows, and human approvals into one customer workspace.",
    type: "website",
    url: "https://luxautomaton-ux.github.io/lux-agent-website/",
    images: [{ url: "https://luxautomaton-ux.github.io/lux-agent-website/og.png", width: 1200, height: 630, alt: "Lux Agent — Your AI Team and Business Workspace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lux Agent — Your AI Team and Business Workspace",
    description: "A customer AI workspace with LANA, specialist agents, business context, workflows, and human approvals.",
    images: ["https://luxautomaton-ux.github.io/lux-agent-website/og.png"],
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
