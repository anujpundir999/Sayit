"use client"

import React from "react"
import Link from "next/link"

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

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
              Say
              <span className="font-[family-name:var(--font-newsreader)] italic text-white/60">
                it
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
            © 2026 Sayit. All rights reserved.
          </p>

          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <Link
              href="https://x.com/CodeWithAnuj_"
              target="_blank"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white/10 hover:text-white text-white/60"
            >
              <XIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com/anujpundir999/Sayit"
              target="_blank"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-white/10 hover:text-white text-white/60"
            >
              <GithubIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
