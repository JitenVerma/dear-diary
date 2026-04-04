import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Dear Diary",
  description: "A warm, reflective diary with a living timeline, mood map, and meaningful life chapters."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg-canvas-primary)] font-sans text-[var(--text-primary)] antialiased">
        <ThemeProvider>
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[var(--app-background)]" />
            <div className="absolute inset-x-0 top-[-18rem] h-[30rem] bg-[radial-gradient(circle,rgba(255,255,255,0.45),transparent_60%)] opacity-60 blur-3xl dark:opacity-20" />
            <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[color:var(--accent-rose)]/15 blur-3xl" />
            <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[color:var(--accent-sage)]/20 blur-3xl" />
          </div>
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
