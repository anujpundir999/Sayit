"use client"

import React from "react"
import Link from "next/link"
import { Twitter, Github } from "lucide-react"

export function FooterSection({
  onScrollTo,
}: {
  onScrollTo: (id: string) => void
}) {
  return (
    <footer className="relative border-t border-white/10 bg-[#060a13] pb-10 pt-20 overflow-hidden z-10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-md">
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-medium text-white mb-6">
              Mystery{" "}
              <span className="font-[family-name:var(--font-newsreader)] italic text-white/60">
                Messaging
              </span>
            </h3>
            <p className="text-white/40 leading-relaxed font-light text-sm max-w-sm">
              The platform for honest conversations. Free, anonymous, and built for
              privacy.
            </p>
          </div>

          <nav className="flex flex-wrap gap-12 sm:gap-16">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                Product
              </span>
              <button
                onClick={() => onScrollTo("features")}
                className="text-white/50 hover:text-white transition-colors text-sm text-left"
              >
                Features
              </button>
              <button
                onClick={() => onScrollTo("how")}
                className="text-white/50 hover:text-white transition-colors text-sm text-left"
              >
                How it works
              </button>
              <Link
                href="/sign-up"
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                Get Started
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                Legal
              </span>
              <Link
                href="#"
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <p className="text-white/30 text-sm font-light">
            © 2026 Mystery Messaging. All rights reserved.
          </p>

          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white/10 hover:text-white text-white/60"
            >
              <Twitter className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white/10 hover:text-white text-white/60"
            >
              <Github className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
