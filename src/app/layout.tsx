import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import { siteUrl } from "@/data/site";
import "./globals.css";

// Self-hosted through next/font: no external font request at runtime
// and no layout shift. Variable fonts, so one file covers every weight.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: profile.siteTitle,
    template: `%s | ${profile.name}`,
  },
  description: profile.siteDescription,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: profile.name,
    title: profile.siteTitle,
    description: profile.siteDescription,
    ...(siteUrl ? { url: "/" } : {}),
  },
  twitter: {
    // No X/Twitter handle exists in the portfolio data, so none is set.
    card: "summary_large_image",
    title: profile.siteTitle,
    description: profile.siteDescription,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
