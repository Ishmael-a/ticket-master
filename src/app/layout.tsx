import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";
import { RedirectToast } from "@/components/redirect-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ishmael's Road To Next",
  description: "My Road To Next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main
            className="
            min-h-screen flex-1 overflow-y-auto overflow-x-hidden
            py-24 px-5
            bg-secondary/20
            flex flex-col
            "
          >
            {children}
          </main>
          <RedirectToast />
          <Toaster expand />
        </ThemeProvider>
      </body>
    </html>
  );
}
