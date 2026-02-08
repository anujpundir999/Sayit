"use client"

import React from "react"
import { Reveal } from "./Reveal"
import { FAQItem } from "./FAQItem"
import { faqs } from "./landingData"

export function FAQSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-32">
      <Reveal className="mb-20 text-center">
        <p className="font-medium text-sm text-indigo-400/80 mb-4 uppercase tracking-widest">
          Common Questions
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl leading-tight text-white mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-white/40 font-light">
          Everything you need to know about the platform.
        </p>
      </Reveal>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <FAQItem key={i} question={faq.question} answer={faq.answer} i={i} />
        ))}
      </div>
    </section>
  )
}
