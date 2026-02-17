"use client";

import Link from "next/link";
import { APP_CONFIG } from "@/shared/constants/config";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    {
      label: "Changelog",
      href: "https://github.com/diegosouzapw/OmniRoute/releases",
      external: true,
    },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs#api-reference" },
    {
      label: "Help Center",
      href: "https://github.com/diegosouzapw/OmniRoute/discussions",
      external: true,
    },
  ],
  company: [
    { label: "About", href: "https://github.com/diegosouzapw/OmniRoute", external: true },
    { label: "Blog", href: "https://github.com/diegosouzapw/OmniRoute/releases", external: true },
    {
      label: "Contact",
      href: "https://github.com/diegosouzapw/OmniRoute/issues/new/choose",
      external: true,
    },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
};

export default function Footer() {
  const renderFooterLink = (link) => {
    if (link.external) {
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link href={link.href} className="hover:text-primary transition-colors">
        {link.label}
      </Link>
    );
  };

  return (
    <footer className="bg-bg border-t border-border pt-16 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="size-6 text-primary">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 48 48">
                  <path
                    clipRule="evenodd"
                    d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-text-main">{APP_CONFIG.name}</span>
            </div>
            <p className="text-text-muted mb-6 max-w-sm font-light">
              The unified interface for modern AI infrastructure. Secure, observable, and scalable.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/diegosouzapw/OmniRoute/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Community Discussions"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
              <a
                href="https://github.com/diegosouzapw/OmniRoute"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-text-main mb-4">Product</h4>
            <ul className="flex flex-col gap-3 text-sm text-text-muted font-light">
              {footerLinks.product.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-text-main mb-4">Resources</h4>
            <ul className="flex flex-col gap-3 text-sm text-text-muted font-light">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-text-main mb-4">Company</h4>
            <ul className="flex flex-col gap-3 text-sm text-text-muted font-light">
              {footerLinks.company.map((link) => (
                <li key={link.label}>{renderFooterLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} {APP_CONFIG.name} Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-text-muted">
            <a href="/docs" className="hover:text-primary transition-colors">
              Documentation
            </a>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <a
              href="https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
