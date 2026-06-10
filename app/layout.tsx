import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { FilterProvider } from "@/context/FilterContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import Player from "@/components/player";
import Navbar from "@/components/navbar";
import { LastPlayedProvider } from "@/context/LastPlayedContext";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RandomFM",
  description: "A radio that won't play what you expect",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icon.svg" },
      { url: "/icon-192x192.svg", sizes: "192x192", type: "image/svg+xml" },
      { url: "/icon-512x512.svg", sizes: "512x512", type: "image/svg+xml" },
    ],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground dark:bg-foreground dark:text-background ">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkProvider>
            <FavoritesProvider>
              <FilterProvider>
                <LastPlayedProvider>
                  <header className="flex">
                    <Navbar />
                  </header>
                  <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8">
                    {children}
                    <GoogleAnalytics gaId="G-XD59YH994H" />
                  </main>
                  <Player />
                  <Toaster
                    position="bottom-center"
                    visibleToasts={3}
                    className="dark:invert"
                    duration={4000}
                  />
                </LastPlayedProvider>
              </FilterProvider>
            </FavoritesProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
