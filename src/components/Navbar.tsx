"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon, ChartNoAxesGantt } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Booking", href: "#booking" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Function to set CSS variables based on theme
  const applyTheme = (themeName: string) => {
    const root = document.documentElement;
    if (themeName === "dark") {
      root.style.setProperty("--color-background", "oklch(0.15 0 250)");
      root.style.setProperty("--color-foreground", "oklch(0.98 0 250)");
      root.style.setProperty("--color-card", "oklch(0.15 0 250)");
      root.style.setProperty("--color-card-foreground", "oklch(0.98 0 250)");
      root.style.setProperty("--color-muted", "oklch(0.27 0 250)");
      root.style.setProperty("--color-muted-foreground", "oklch(0.7 0 250)");
      root.style.setProperty("--color-border", "oklch(0.27 0 250)");
      root.style.setProperty("--color-input", "oklch(0.27 0 250)");
    } else {
      root.style.setProperty("--color-background", "oklch(1 0 250)");
      root.style.setProperty("--color-foreground", "oklch(0.2 0 250)");
      root.style.setProperty("--color-card", "oklch(1 0 250)");
      root.style.setProperty("--color-card-foreground", "oklch(0.2 0 250)");
      root.style.setProperty("--color-muted", "oklch(0.96 0 250)");
      root.style.setProperty("--color-muted-foreground", "oklch(0.55 0 250)");
      root.style.setProperty("--color-border", "oklch(0.92 0 250)");
      root.style.setProperty("--color-input", "oklch(0.92 0 250)");
    }
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active link based on scroll position
      const sections = navLinks.map((link) => link.href.substring(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/80 backdrop-blur-md shadow-lg border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md"
            >
              <span className="text-white font-bold text-lg">S</span>
            </motion.div>
            <span className="font-bold text-xl hidden sm:block">
              <span className="gradient-text">SAPOK</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeLink === link.href.substring(1)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={handleThemeToggle}
                className="inline-flex shrink-0 items-center justify-center rounded-lg size-8 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
            <Link href="#contact">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Let's Talk
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <span className="inline-flex shrink-0 items-center justify-center rounded-lg size-8 text-sm font-medium hover:bg-muted hover:text-foreground transition-colors cursor-pointer md:hidden">
                <ChartNoAxesGantt className="h-6 w-6" />
              </span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="flex flex-col gap-6 mt-12 px-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors ${activeLink === link.href.substring(1)
                      ? "text-primary"
                      : "text-foreground"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {/* Mobile Theme Toggle */}
                {mounted && (
                  <button
                    onClick={() => {
                      handleThemeToggle();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 text-lg font-medium transition-colors"
                  >
                    {theme === "dark" ? (
                      <><Sun className="h-5 w-5" /> Light Mode</>
                    ) : (
                      <><Moon className="h-5 w-5" /> Dark Mode</>
                    )}
                  </button>
                )}
                <Link href="#contact" onClick={() => setIsOpen(false)}>
                  <Button className="mt-4 bg-gradient-to-r from-primary to-secondary w-full">
                    Let's Talk
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </motion.header>
  );
}
