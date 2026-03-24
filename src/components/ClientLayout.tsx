"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCVPage = pathname.startsWith("/cv");

  return (
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
      {!isCVPage && <Navbar />}
      <main>{children}</main>
      {!isCVPage && <Footer />}
    </ThemeProvider>
  );
}
