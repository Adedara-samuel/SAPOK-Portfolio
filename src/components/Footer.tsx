"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, Heart } from "lucide-react";

const footerLinks = {
  QuickLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ],
  Services: [
    { name: "Web Development", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
    { name: "Mobile Development", href: "#services" },
    { name: "Backend Development", href: "#services" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/Adedara-samuel", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/adedara-samuel", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/AdedaraSP", label: "Twitter" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container-custom py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl">
                <span className="gradient-text">SAPOK</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-4">
              A passionate Software Developer crafting exceptional digital experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.QuickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.Services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>adedarasapok@gmail.com</li>
              <li>+234 813 501 3995</li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SAPOK. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> by Adedara S.P
          </p>
        </div>
      </div>
    </footer>
  );
}
