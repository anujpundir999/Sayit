"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { messages } from "./landingData"

export function HeroSection({
  onScrollTo,
}: {
  onScrollTo: (id: string) => void
}) {
  const prefersReduced = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) 
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-[30%] h-[400px] w-[400px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] h-[350px] w-[350px] rounded-full bg-sky-600/5 blur-[100px]" />
      </div>

      {/* Floating Message Bubbles - Positioned absolutely but responsive to screen */}
      <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: msg.delay, ease: "easeOut" }}
            // Using calc to position from center to avoid intersection with center text
            style={{
              left: msg.x,
              top: msg.y,
              rotate: msg.rotate,
              x: "-50%",
              y: "-50%",
            }}
            className="absolute max-w-[200px] rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[13px] leading-snug text-white/40 backdrop-blur-md shadow-xl shadow-black/20"
          >
            {msg.text}
          </motion.div>
        ))}
      </div>

      <motion.div
        style={prefersReduced ? {} : { y: heroY, opacity: heroOpacity }}
        className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center py-20"
      >
        {/* announcement pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/sign-up"
            className="group mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-5 py-2 text-[13px] tracking-wide text-white/60 backdrop-blur-sm transition-all hover:border-indigo-400/20 hover:text-white/80 hover:bg-white/[0.05]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            10,000+ people are sharing anonymous messages
            <ChevronRight className="h-3.5 w-3.5 text-white/30 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
          className="max-w-5xl mx-auto font-[family-name:var(--font-playfair)] text-5xl sm:text-7xl md:text-8xl leading-[1.1] tracking-tight text-white mb-8"
        >
          The words people <br className="hidden md:block" />
          <span className="font-[family-name:var(--font-newsreader)] italic font-light text-white/80 mx-2">
            actually
          </span>
          want to say to you
        </motion.h1>

        {/* sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed mb-10 font-light"
        >
          An anonymous messaging platform for honest feedback, secret confessions,
          and real connections — without the filter.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            asChild
            size="lg"
            className="h-14 rounded-full bg-white text-black px-8 text-[15px] font-medium shadow-xl shadow-white/5 transition-all hover:bg-gray-100 hover:scale-[1.02]"
          >
            <Link href="/sign-up">
              Start receiving messages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <button
            onClick={() => onScrollTo("features")}
            className="h-14 rounded-full border border-white/[0.1] bg-white/[0.02] px-8 text-[15px] font-medium text-white/70 transition-all hover:bg-white/[0.05] hover:text-white"
          >
            Learn more
          </button>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 group cursor-pointer"
          onClick={() => onScrollTo("features")}
        >
          <span className="text-[10px] uppercase tracking-widest text-white/20 group-hover:text-white/40 transition-colors">
            Scroll
          </span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
        </motion.div>
      </motion.div>
    </section>
  )
}
