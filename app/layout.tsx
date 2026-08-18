import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://mkii-profile.vercel.app"),
  title: {
    default: "Muhammad Khoirul | AI & Machine Learning Engineer",
    template: "%s | Muhammad Khoirul",
  },
  description:
    "Portfolio of Muhammad Khoirul Irsyadul Ibad — AI Engineer & Mathematics graduate from Airlangga University. Specializing in Time-Series Forecasting, Deep Learning, MLOps, and Generative AI systems.",
  keywords: [
    "Muhammad Khoirul",
    "AI Engineer",
    "Machine Learning Engineer",
    "Deep Learning",
    "Forecasting",
    "GRU-HHO",
    "Computational Mathematics",
    "Universitas Airlangga",
    "Next.js Portfolio",
    "Python AI",
    "FastAPI",
    "Turso Database",
    "Generative AI",
    "RAG",
    "Sidoarjo AI Engineer",
  ],
  authors: [{ name: "Muhammad Khoirul Irsyadul Ibad", url: "https://github.com/MKHO1RUL" }],
  creator: "Muhammad Khoirul Irsyadul Ibad",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mkii-profile.vercel.app",
    title: "Muhammad Khoirul | AI & Machine Learning Engineer",
    description:
      "Explore AI research missions, forecasting architectures, and shinobi-level technical mastery.",
    siteName: "Muhammad Khoirul AI Portfolio",
    images: [
      {
        url: "/profile-expand.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Khoirul - AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Khoirul | AI & Machine Learning Engineer",
    description: "Explore AI missions, time-series forecasting research, and tech mastery.",
    creator: "@m_khoiruli",
    images: ["/profile-expand.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-slate-950 text-orange-100">{children}</body>
    </html>
  )
}
