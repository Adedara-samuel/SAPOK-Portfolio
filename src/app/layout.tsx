import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const theme = localStorage.getItem('theme') || 'light';
                  const root = document.documentElement;
                  if (theme === 'dark') {
                    root.style.setProperty('--color-background', 'oklch(0.15 0 250)');
                    root.style.setProperty('--color-foreground', 'oklch(0.98 0 250)');
                    root.style.setProperty('--color-card', 'oklch(0.15 0 250)');
                    root.style.setProperty('--color-card-foreground', 'oklch(0.98 0 250)');
                    root.style.setProperty('--color-muted', 'oklch(0.27 0 250)');
                    root.style.setProperty('--color-muted-foreground', 'oklch(0.7 0 250)');
                    root.style.setProperty('--color-border', 'oklch(0.27 0 250)');
                    root.style.setProperty('--color-input', 'oklch(0.27 0 250)');
                  } else {
                    root.style.setProperty('--color-background', 'oklch(1 0 250)');
                    root.style.setProperty('--color-foreground', 'oklch(0.2 0 250)');
                    root.style.setProperty('--color-card', 'oklch(1 0 250)');
                    root.style.setProperty('--color-card-foreground', 'oklch(0.2 0 250)');
                    root.style.setProperty('--color-muted', 'oklch(0.96 0 250)');
                    root.style.setProperty('--color-muted-foreground', 'oklch(0.55 0 250)');
                    root.style.setProperty('--color-border', 'oklch(0.92 0 250)');
                    root.style.setProperty('--color-input', 'oklch(0.92 0 250)');
                  }
                })();
              `,
            }}
          />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
