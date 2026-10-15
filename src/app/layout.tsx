import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Cursor from "@/components/shell/Cursor";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sapok-portfolio.vercel.app"),
  title: "Adedara Samuel — Frontend & Full-Stack Engineer",
  description:
    "Portfolio of Adedara Samuel (SAPOK): multi-tenant platforms, healthcare systems and fintech infrastructure — designed and engineered end to end.",
  keywords: ["Adedara Samuel", "SAPOK", "software engineer", "full-stack developer", "UI/UX designer", "Next.js", "NestJS", "Lagos"],
  authors: [{ name: "Adedara Samuel" }],
  icons: { icon: "/images/logo.png" },
  openGraph: {
    title: "Adedara Samuel — Frontend & Full-Stack Engineer",
    description: "Multi-tenant platforms, healthcare systems and fintech infrastructure — designed and engineered end to end.",
    type: "website",
    images: ["/work/covers/onegrid.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050b1f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          <Cursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
