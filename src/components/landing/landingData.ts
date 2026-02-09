import {
  EyeOff,
  ShieldCheck,
  Zap,
  ToggleRight,
  Link2,
  Rocket,
  UserPlus,
  Share2,
  Mail,
  Briefcase,
  GraduationCap,
  Heart,
  Mic,
  Gift,
  MessageCircle,
} from "lucide-react"

export const messages = [
  { text: "You genuinely made my day better 💛", x: "10%", y: "20%", rotate: -5, delay: 0.6 },
  { text: "Your presentation was incredible", x: "85%", y: "15%", rotate: 4, delay: 0.9 },
  { text: "I wish I could tell you in person…", x: "80%", y: "70%", rotate: -3, delay: 1.2 },
  { text: "Keep going, you're almost there 🔥", x: "10%", y: "60%", rotate: 2, delay: 1.0 },
  { text: "Best professor on campus, hands down", x: "25%", y: "85%", rotate: -4, delay: 1.4 },
]

export const features = [
  {
    title: "Completely Anonymous",
    desc: "No sender identity is ever stored or tracked. Ever.",
    icon: EyeOff,
    span: "md:col-span-2",
    gradient: "group-hover:from-indigo-500/10",
    iconColor: "text-indigo-400",
  },
  {
    title: "Secure & Private",
    desc: "Email-verified accounts with encrypted sessions.",
    icon: ShieldCheck,
    span: "md:col-span-1",
    gradient: "group-hover:from-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    title: "AI Suggestions",
    desc: "Gemini crafts thoughtful messages when words fail you.",
    icon: Zap,
    span: "md:col-span-1",
    gradient: "group-hover:from-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    title: "Full Control",
    desc: "One toggle to accept or pause messages instantly.",
    icon: ToggleRight,
    span: "md:col-span-2",
    gradient: "group-hover:from-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    title: "One Link, Everywhere",
    desc: "Share your unique profile link on any platform.",
    icon: Link2,
    span: "md:col-span-2",
    gradient: "group-hover:from-sky-500/10",
    iconColor: "text-sky-400",
  },
  {
    title: "Instant Delivery",
    desc: "Messages land in your dashboard the moment they're sent.",
    icon: Rocket,
    span: "md:col-span-1",
    gradient: "group-hover:from-rose-500/10",
    iconColor: "text-rose-400",
  },
]

export const steps = [
  { num: "01", title: "Sign up", desc: "30 seconds. Just an email.", icon: UserPlus },
  { num: "02", title: "Grab your link", desc: "A unique /u/you URL, ready to share.", icon: Link2 },
  { num: "03", title: "Share it", desc: "Drop it in your bio, story, or DMs.", icon: Share2 },
  { num: "04", title: "Read messages", desc: "Honest words, straight to your dashboard.", icon: Mail },
]

export const useCases = [
  { icon: Briefcase, title: "Team Feedback", desc: "Unfiltered thoughts from colleagues." },
  { icon: GraduationCap, title: "Campus Confessions", desc: "Anonymous notes across classrooms." },
  { icon: Heart, title: "Secret Admirers", desc: "Compliments that make someone's day." },
  { icon: Mic, title: "Audience Q&A", desc: "Let followers ask anything." },
  { icon: Gift, title: "Birthday Wishes", desc: "Collect heartfelt messages." },
  { icon: MessageCircle, title: "Honest Opinions", desc: "The truth, without the tension." },
]

export const faqs = [
  {
    question: "Is Sayit truly anonymous?",
    answer:
      "Yes. We do not store any sender data, IP addresses, or device information. Your identity is completely hidden from the recipient.",
  },
  {
    question: "Does it cost anything to use?",
    answer:
      "No, MysteryMessaging is 100% free for everyone. You can send and receive unlimited messages without paying a dime.",
  },
  {
    question: "How do I share my profile?",
    answer:
      "Once you sign up, you'll get a unique link (e.g., mystery.msg/u/yourname). You can post this on Instagram, Snapchat, Twitter, or anywhere else.",
  },
  {
    question: "Do I need an app?",
    answer:
      "No app required! MysteryMessaging works directly in your browser on any phone, tablet, or computer.",
  },
]
