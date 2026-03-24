import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adedara S.P | Software Developer & UI/UX Designer",
  description: "Professional portfolio of Adedara S.P - Software Engineer & UI/UX Designer specializing in full-stack development",
  keywords: ["software engineer", "fullstack developer", "web developer", "UI/UX designer", "Next.js", "React"],
  authors: [{ name: "Adedara Samuel" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "Adedara S.P | Software Developer",
    description: "Professional portfolio of Adedara S.P - Software Engineer & UI/UX Designer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} bg-background text-foreground`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
