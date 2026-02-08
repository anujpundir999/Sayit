"use client"

import React, { useCallback } from "react"
import { HeroSection } from "../../components/landing/HeroSection"
import { FeaturesSection } from "../../components/landing/FeaturesSection"
import { HowItWorksSection } from "../../components/landing/HowItWorksSection"
import { FAQSection } from "../../components/landing/FAQSection"
import { UseCasesSection } from "../../components/landing/UseCasesSection"
import { FinalCTASection } from "../../components/landing/FinalCTASection"
import { FooterSection } from "../../components/landing/FooterSection"


export default function LandingPage() {
  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-[#060a13] text-white selection:bg-indigo-500/30 font-[family-name:var(--font-inter)]">
      <HeroSection onScrollTo={scrollTo} />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <UseCasesSection />
      <FinalCTASection />
      <FooterSection onScrollTo={scrollTo} />
    </div>
  )
}
