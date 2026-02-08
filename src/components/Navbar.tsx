"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Menu, X, ArrowRight, LayoutDashboard, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  /* track scroll for bg blur */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* close mobile menu on route change */
  useEffect(() => { setMobileOpen(false) }, [pathname])

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-[#060a13]/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* logo */}
        <Link href="/" className="flex items-center gap-2 text-white/90 transition-colors hover:text-white">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15">
            <span className="text-sm font-bold text-indigo-400">M</span>
          </div>
          <span className="text-[15px] font-semibold tracking-tight">
            Mystery<span className="text-white/40">Msg</span>
          </span>
        </Link>

        {/* desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="/#features">Features</NavLink>
          <NavLink href="/#how">How it works</NavLink>

          <div className="mx-4 h-4 w-px bg-white/[0.08]" />

          {session ? (
            <>
              <NavLink href="/dashboard" icon={<LayoutDashboard className="h-3.5 w-3.5" />}>
                Dashboard
              </NavLink>
              <button
                onClick={() => signOut()}
                className="ml-1 flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] text-white/40 transition-colors hover:bg-white/[0.04] hover:text-white/70"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="flex h-9 items-center rounded-lg px-3 text-[13px] text-white/50 transition-colors hover:text-white/80"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="ml-1 flex h-9 items-center gap-1.5 rounded-lg bg-indigo-500/15 px-4 text-[13px] font-medium text-indigo-300 transition-all hover:bg-indigo-500/25"
              >
                Get started
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </>
          )}
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white/80 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-16 border-b border-white/[0.06] bg-[#060a13]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              <MobileLink href="/#features" onClick={() => setMobileOpen(false)}>Features</MobileLink>
              <MobileLink href="/#how" onClick={() => setMobileOpen(false)}>How it works</MobileLink>

              <div className="my-2 h-px bg-white/[0.06]" />

              {session ? (
                <>
                  <MobileLink href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</MobileLink>
                  <button
                    onClick={() => { signOut(); setMobileOpen(false) }}
                    className="rounded-lg px-3 py-3 text-left text-[15px] text-red-400/70 transition-colors hover:bg-white/[0.04]"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <MobileLink href="/sign-in" onClick={() => setMobileOpen(false)}>Sign in</MobileLink>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-500/15 text-[15px] font-medium text-indigo-300 transition-all hover:bg-indigo-500/25"
                  >
                    Get started free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ── small helper components ── */

function NavLink({
  href,
  children,
  icon,
}: {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] text-white/50 transition-colors hover:bg-white/[0.04] hover:text-white/80"
    >
      {icon}
      {children}
    </Link>
  )
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-lg px-3 py-3 text-[15px] text-white/60 transition-colors hover:bg-white/[0.04] hover:text-white/90"
    >
      {children}
    </Link>
  )
}
