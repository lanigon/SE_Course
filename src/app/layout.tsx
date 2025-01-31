import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import SuiProvider from "@/components/providers/suiProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "Cryptocurrency market analysis platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SuiProvider>
        <div className="flex min-h-screen">
          {/* 侧边栏 */}
          <Sidebar className="w-[280px] border-r" />
          {/* 主内容区域 */}
          <main className="flex-1 overflow-y-auto">
            <div className="container p-6">
              {children}
            </div>
          </main>
        </div>
        </SuiProvider>
      </body>
    </html>
  );
}
