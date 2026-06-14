import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Adedara S.P | Software Developer & UI/UX Designer",
  description: "Professional portfolio of Adedara S.P - Software Engineer & UI/UX Designer specializing in full-stack development",
  keywords: ["software engineer", "fullstack developer", "web developer", "UI/UX designer", "Next.js", "React", "Node.js", "Python", "MongoDB", "PostgreSQL"],
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
      <body className="bg-background text-foreground">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
