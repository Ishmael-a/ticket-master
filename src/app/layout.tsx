import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/_navigation/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";
import { RedirectToast } from "@/components/redirect-toast";
import { Sidebar } from "@/app/_navigation/sidebar/components/sidebar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactQueryProvider } from "@/app/_providers/react-query/react-query-provider";

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
          <ReactQueryProvider>
          <NuqsAdapter>
          <Navbar />
          <div className="flex h-screen overflow-hidden border-collapse">
            <Sidebar />
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
          </div>
          <RedirectToast />
          <Toaster expand />
          </NuqsAdapter>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
