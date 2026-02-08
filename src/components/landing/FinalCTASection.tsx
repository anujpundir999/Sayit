"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "./Reveal"

export function FinalCTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] px-8 py-20 text-center md:px-16">
          {/* bg glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[100px]" />
          </div>

          <div className="relative z-10">
            <h2 className="mx-auto max-w-lg font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3.5vw,2.5rem)] leading-tight tracking-tight">
              Ready to hear what people really&nbsp;think?
            </h2>
            <p className="mt-4 text-[15px] text-white/40">
              Set up your anonymous inbox in under a&nbsp;minute.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-indigo-500 px-7 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400"
              >
                <Link href="/sign-up">Create your free account</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-12 rounded-full text-sm text-white/50 hover:bg-white/[0.04] hover:text-white/70"
              >
                <Link href="/sign-in">Sign in →</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
