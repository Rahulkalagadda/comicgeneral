import type { Metadata } from "next";
import { Manrope, Inter, DM_Serif_Display, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme/ThemeContext";
import { DemoModeBanner } from "@/components/layout/DemoModeBanner";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading-loaded",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif-loaded",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader-loaded",
  display: "swap",
  style: ["normal", "italic"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEADSPHERE | Premium Digital Content Platform",
  description:
    "Executive digital bookstore, prestige graphic comics, and video podcasts with verified 10-page previews and browser reading.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="executive" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${inter.variable} ${dmSerif.variable} ${newsreader.variable} ${plusJakartaSans.variable} min-h-screen flex flex-col antialiased selection:bg-[#B89555]/30`}
      >
        <ThemeProvider initialTheme="executive">
          <DemoModeBanner />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
