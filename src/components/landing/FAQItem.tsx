"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal } from "./Reveal"

export function FAQItem({
  question,
  answer,
  i,
}: {
  question: string
  answer: string
  i: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Reveal delay={i * 0.1}>
      <div className="mb-4 rounded-2xl border border-white/[0.08] bg-[#0c1221] overflow-hidden transition-colors hover:border-white/[0.15]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between p-6 text-left"
        >
          <span className="font-[family-name:var(--font-inter)] text-lg font-medium text-white/90">
            {question}
          </span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-white/40 transition-transform duration-300",
              isOpen && "rotate-180 text-white/80"
            )}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-6 pb-6 pt-0">
                <p className="text-[15px] leading-relaxed text-white/50 font-light">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}
