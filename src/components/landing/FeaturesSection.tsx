"use client"

import React from "react"
import { Reveal } from "./Reveal"
import { features } from "./landingData"

export function FeaturesSection() {
  return (
    <section id="features" className="relative mx-auto max-w-6xl px-6 py-32">
      <Reveal className="mb-16 max-w-2xl">
        <p className="font-medium text-sm uppercase tracking-[0.2em] text-indigo-400/70">
          Features
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-[clamp(1.75rem,4vw,3rem)] leading-tight tracking-tight">
          Everything you need.<br />Nothing&nbsp;you&nbsp;don&apos;t.
        </h2>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <Reveal key={f.title} delay={i * 0.06} className={f.span}>
              <div className="group relative h-full min-h-[220px] overflow-hidden rounded-[2rem] border border-white/5 bg-[#0c1221] transition-all duration-500 hover:border-white/10">
                {/* Grain Texture */}
                <div
                  className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Subtle Glow - White only, no colors */}
                <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/[0.02] blur-3xl transition-all duration-500 group-hover:bg-white/[0.04]" />

                <div className="relative z-10 flex h-full flex-col justify-between p-8">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] text-white/60 transition-colors duration-300 group-hover:bg-white/[0.08] group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="mb-2 font-[family-name:var(--font-inter)] text-xl font-medium text-white/90">
                      {f.title}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-500">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
