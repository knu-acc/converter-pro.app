import type { Metadata } from "next";
import { Outfit, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocaleLangSync from "@/components/LocaleLangSync";
import JsonLd from "@/components/JsonLd";
import ScrollToTop from "@/components/ScrollToTop";
import { siteConfig } from "@/lib/site";
import { getOrganizationSchema, getRootAlternates, getWebApplicationSchema, getWebsiteSchema } from "@/lib/seo";

const outfitFont = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'technology',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  title: {
    default: `${siteConfig.name} — онлайн-конвертер единиц`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: getRootAlternates('/'),
  openGraph: {
    type: 'website',
    locale: 'ru',
    url: siteConfig.url,
    title: `${siteConfig.name} — онлайн-конвертер единиц`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — онлайн-конвертер единиц`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const websiteSchema = getWebsiteSchema();
  const applicationSchema = getWebApplicationSchema();

  return (
    <html lang="ru">
      <body
        className={`${outfitFont.variable} ${robotoMono.variable} min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] antialiased`}
      >
        <JsonLd data={[organizationSchema, websiteSchema, applicationSchema]} />
        <LocaleLangSync />
        <ScrollToTop />
        <a href="#main-content" className="skip-link">Перейти к содержимому</a>
        <Header />
        <main id="main-content" className="site-shell mx-auto flex w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
