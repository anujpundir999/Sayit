"use client"

import React from "react"
import { motion } from "framer-motion"
import { Reveal } from "./Reveal"
import { steps } from "./landingData"

export function HowItWorksSection() {
  return (
    <section id="how" className="relative mx-auto max-w-6xl px-6 py-32">
      <Reveal className="mb-24 text-center">
        <p className="font-medium text-sm result-indigo-400/80 mb-4 uppercase tracking-widest text-indigo-400">
          How it works
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-white">
          Up and running in&nbsp;minutes
        </h2>
      </Reveal>

      <div className="relative grid gap-12 md:grid-cols-4">
        {/* Animated Connecting Line (Desktop) */}
        <div className="absolute top-[3.25rem] left-0 w-full h-[2px] bg-white/[0.03] hidden md:block overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-[2px]"
            animate={{ x: ["-100%", "500%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
        </div>

        {steps.map((s, i) => {
          const Icon = s.icon
          return (
            <Reveal key={s.num} delay={i * 0.15} className="relative group">
              <div className="relative flex flex-col items-center text-center">
                {/* Icon Container with Glow */}
                <div className="relative z-10 mb-8">
                  <div className="relative flex h-26 w-26 items-center justify-center rounded-3xl border border-white/[0.08] bg-[#060a13] p-1 shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:border-indigo-500/30">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-white/[0.03] shadow-inner">
                      <Icon className="h-8 w-8 text-white/60 transition-colors duration-300 group-hover:text-indigo-400" />
                    </div>

                    {/* Floating Number Badge */}
                    <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-bold text-sm text-white shadow-lg shadow-indigo-600/40 ring-4 ring-[#060a13]">
                      {s.num}
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="relative">
                  <h3 className="mb-3 font-[family-name:var(--font-inter)] text-lg font-semibold text-white transition-colors group-hover:text-indigo-200">
                    {s.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-white/40 group-hover:text-white/60 transition-colors font-light">
                    {s.desc}
                  </p>
                </div>

                {/* Hover background glow */}
                <div className="absolute -inset-4 -z-10 rounded-xl bg-indigo-500/5 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
