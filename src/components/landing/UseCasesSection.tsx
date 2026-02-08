"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Reveal } from "./Reveal"
import { useCases } from "./landingData"

export function UseCasesSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section className="mx-auto max-w-6xl px-6 py-32">
      <Reveal className="mb-20 max-w-2xl">
        <p className="font-medium text-sm text-indigo-400/80 mb-4 uppercase tracking-widest">
          Use cases
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-white mb-6">
          Built for the things<br />people actually&nbsp;do
        </h2>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {useCases.map((uc, i) => {
          const Icon = uc.icon
          return (
            <Reveal key={uc.title} delay={i * 0.05}>
              <motion.div
                whileHover={prefersReduced ? {} : { y: -5 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1221] p-8 transition-all hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10"
              >
                {/* Background decoration */}
                <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-indigo-500/5 blur-2xl group-hover:bg-indigo-500/10 transition-colors duration-500" />

                {/* Large faded icon in background */}
                <div className="absolute -bottom-4 -right-4 text-white/[0.02] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:text-white/[0.05]">
                  <Icon className="h-32 w-32" />
                </div>

                <div className="relative z-10">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:text-indigo-300 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-2 font-[family-name:var(--font-inter)] text-lg font-semibold text-white/90">
                    {uc.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-white/50 font-light group-hover:text-white/70 transition-colors">
                    {uc.desc}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
