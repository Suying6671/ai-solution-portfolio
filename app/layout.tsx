import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "万舒畅｜企业 AI 解决方案 · AI 产品 · FDE",
  description: "将复杂企业业务需求转化为可落地、可交付、可复制的 AI 产品与解决方案。",
  keywords: ["企业 AI", "Agent 应用", "AI 产品", "解决方案", "万舒畅"],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    title: "万舒畅｜企业 AI 解决方案 · AI 产品 · FDE",
    description: "把复杂业务变成可交付的 AI 能力",
    images: [
      {
        url: "/og-profile.png",
        width: 1200,
        height: 630,
        alt: "万舒畅｜企业 AI 解决方案 · AI 产品 · FDE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "万舒畅｜企业 AI 解决方案 · AI 产品 · FDE",
    description: "把复杂业务变成可交付的 AI 能力",
    images: ["/og-profile.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
