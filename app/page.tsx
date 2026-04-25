"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ════════════════════════════════════════════════════════════════
// ██  ANIMATION VARIANTS
// ════════════════════════════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ════════════════════════════════════════════════════════════════
// ██  COUNTER COMPONENT
// ════════════════════════════════════════════════════════════════

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * to));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, to]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ════════════════════════════════════════════════════════════════
// ██  MARQUEE DATA
// ════════════════════════════════════════════════════════════════

const marqueeItems = [
  "Remote Lock", "EMI Protection", "SIM Alerts", "Live Tracking",
  "Auto Reminders", "App Blocking", "Network Control", "Retailer Dashboard",
  "Remote Lock", "EMI Protection", "SIM Alerts", "Live Tracking",
  "Auto Reminders", "App Blocking", "Network Control", "Retailer Dashboard",
];

// ════════════════════════════════════════════════════════════════
// ██  FAQ DATA
// ════════════════════════════════════════════════════════════════

const faqs = [
  {
    q: "How does Pay-Protect lock a phone?",
    a: "Pay-Protect installs a lightweight MDM agent on the phone at the time of sale. When an EMI is overdue, the retailer locks the phone in seconds with a single tap from the dashboard — no matter where the customer is.",
  },
  {
    q: "Does it work on iPhones too?",
    a: "Yes! Pay-Protect supports both Android and iOS. The setup process differs slightly but remains simple, and our team fully guides you through it.",
  },
  {
    q: "Is the customer's personal data safe?",
    a: "Absolutely. Pay-Protect only restricts phone usage — it never accesses personal files, messages, photos, or apps. All personal data stays safely on the device.",
  },
  {
    q: "What if the customer turns off the internet?",
    a: "Pay-Protect queues the lock command and executes it the moment the device comes back online. Retailers also receive a notification when a phone goes offline.",
  },
  {
    q: "Is it available in Pakistan?",
    a: "Yes! Pay-Protect is fully available across Pakistan — from Karachi to Peshawar, thousands of retailers rely on our platform. Contact us for Pakistan-specific pricing.",
  },
  {
    q: "How does pricing work?",
    a: "Pay-Protect uses an activation code model — purchase codes per device. Flexible plans are available for individual retailers, distributors, and NBFCs. Apply for a free demo to learn more.",
  },
];

// ════════════════════════════════════════════════════════════════
// ██  FEATURES DATA
// ════════════════════════════════════════════════════════════════

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: "Remote Lock & Unlock",
    desc: "Lock any financed phone from your dashboard with a single tap. Unlock instantly once payment is received.",
    span: "col-span-2",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    title: "Auto EMI Reminders",
    desc: "Automatic SMS and app notifications sent before and on the due date — zero manual follow-up needed.",
    span: "col-span-1",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "Live Location",
    desc: "Track financed devices in real-time. Essential for recovery if a customer goes missing.",
    span: "col-span-1",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
      </svg>
    ),
    title: "SIM Change Alert",
    desc: "Instant notification the moment a customer swaps their SIM card.",
    span: "col-span-1",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: "App Blocking",
    desc: "Block specific apps — disable games while keeping calls active.",
    span: "col-span-1",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Retailer Dashboard",
    desc: "All your customers, payments, and devices in one smart place.",
    span: "col-span-1",
  },
];



// ════════════════════════════════════════════════════════════════
// ██  MAIN PAGE COMPONENT
// ════════════════════════════════════════════════════════════════

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [phoneLocked, setPhoneLocked] = useState(true);

  // ── Phone toggle animation
  useEffect(() => {
    const t = setInterval(() => setPhoneLocked((p) => !p), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="bg-[#03070f] text-[#e8f2ff] overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          ██  DOT GRID BACKGROUND
          ════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(29,110,245,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ════════════════════════════════════════════════════════
          ██  NAVBAR
          ════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[500] h-16 flex items-center justify-between px-[5%] bg-[#03070f]/85 backdrop-blur-xl border-b border-blue-500/10"
      >
        <span
          className="font-black text-xl tracking-widest"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "3px" }}
        >
          PAY<span className="text-blue-400">PROTECT</span>
        </span>
        <div className="hidden md:flex gap-8">
          {["Features", "How It Works", "Why Us", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-[13px] text-[#5a7fa8] hover:text-white transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </div>
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-bold px-5 py-2.5 rounded-md transition-all hover:-translate-y-0.5"
        >
          Free Demo →
        </Link>
      </motion.nav>

      {/* ════════════════════════════════════════════════════════
          ██  TICKER BAR
          ════════════════════════════════════════════════════ */}
      <div className="mt-16 border-b border-blue-500/10 bg-[#060d1a] overflow-hidden h-9 flex items-center">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 px-8 text-[11px] font-bold tracking-widest uppercase text-[#5a7fa8]"
            >
              <span className="w-1 h-1 bg-blue-500 rounded-full" />
              {i % 3 === 0 ? <span className="text-blue-300">{item}</span> : item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════
          ██  HERO SECTION
          ════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative flex items-center px-[5%] py-20 overflow-hidden z-10">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute left-1/4 bottom-0 w-[300px] h-[300px] bg-blue-800/8 rounded-full blur-[80px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full relative z-10">

          {/* ── Hero Left */}
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 border border-blue-500/25 bg-blue-600/8 px-4 py-1.5 rounded-sm mb-7"
            >
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-blue-300">
                Live — 5,000+ Retailers Protected
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="leading-[0.92] mb-7 tracking-wide"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(72px,9vw,118px)" }}
            >
              NEVER LOSE<br />
              <span className="[-webkit-text-stroke:1.5px_#3b82f6] text-transparent">ANOTHER</span><br />
              <span className="text-blue-400">EMI AGAIN.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[16px] text-[#5a7fa8] leading-[1.75] max-w-[440px] mb-10 font-light"
            >
              Pay-Protect gives mobile retailers{" "}
              <strong className="text-white font-bold">complete control</strong> over financed phones.
              Remotely lock overdue devices, automate EMI reminders, and protect your money — all from one
              powerful dashboard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Link
                href="/login"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[15px] font-bold px-8 py-3.5 rounded-md transition-all hover:-translate-y-0.5"
              >
                Get Free Demo
                <span className="w-5 h-5 border border-white/40 rounded-full flex items-center justify-center text-xs">→</span>
              </Link>
              <a href="#features" className="text-[14px] text-[#5a7fa8] hover:text-white transition-colors font-medium">
                See Features ↓
              </a>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex border border-blue-500/10 rounded-lg overflow-hidden w-fit"
            >
              {[
                { num: 5000, suffix: "+", label: "Retailers" },
                { num: 99, suffix: ".9%", label: "Lock Rate" },
                { num: 24, suffix: "/7", label: "Support" },
              ].map((s, i) => (
                <div key={i} className={`px-7 py-4 ${i < 2 ? "border-r border-blue-500/10" : ""}`}>
                  <div
                    className="font-black text-[28px] leading-none text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}
                  >
                    <Counter to={s.num} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] text-[#5a7fa8] mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Hero Right — Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center relative"
          >
            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-24 top-16 bg-[#0a1525]/70 border border-blue-500/25 backdrop-blur-md rounded-xl p-3 hidden lg:block"
            >
              <div className="text-[9px] text-[#5a7fa8] uppercase tracking-wider mb-1">Locked Today</div>
              <div className="font-black text-[20px] text-red-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>12</div>
              <div className="text-[9px] text-[#5a7fa8]">overdue devices</div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-20 bottom-24 bg-[#0a1525]/70 border border-blue-500/25 backdrop-blur-md rounded-xl p-3 hidden lg:block"
            >
              <div className="text-[9px] text-[#5a7fa8] uppercase tracking-wider mb-1">This Month</div>
              <div className="font-black text-[20px] text-green-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Rs.4.2L</div>
              <div className="text-[9px] text-[#5a7fa8]">collected</div>
            </motion.div>

            {/* Floating Card 3 */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-20 bottom-20 bg-[#0a1525]/70 border border-blue-500/25 backdrop-blur-md rounded-xl p-3 hidden lg:block"
            >
              <div className="inline-flex items-center gap-1.5 text-[9px] font-bold px-2 py-1 rounded-full bg-red-500/12 text-red-400 border border-red-500/20">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full" /> LOCKED
              </div>
              <div className="text-[11px] text-white font-semibold mt-1.5">Ali Hassan</div>
              <div className="text-[10px] text-[#5a7fa8]">Samsung S24</div>
            </motion.div>

            {/* Phone */}
            <div className="w-[240px] bg-[#0a1525] border-2 border-blue-500/25 rounded-[40px] p-4 shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(29,110,245,0.08)] relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent rounded-t-[40px]" />
              <div className="w-20 h-6 bg-[#03070f] rounded-b-2xl mx-auto mb-3 border border-blue-500/10 border-t-0" />
              <div className="bg-[#060d1a] rounded-[22px] p-4 border border-blue-500/10 min-h-[380px]">
                {/* Status bar */}
                <div className="flex justify-between items-center mb-5">
                  <span
                    className="text-[11px] font-black tracking-[2px] text-blue-300"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    PAY-PROTECT
                  </span>
                  <div className="flex gap-0.5 items-end">
                    {[5, 8, 11, 14].map((h, i) => (
                      <div key={i} className="w-0.5 rounded-sm" style={{ height: h, background: i < 2 ? "#1d6ef5" : "#2a4060" }} />
                    ))}
                  </div>
                </div>

                {/* Lock/Unlock Animation */}
                <AnimatePresence mode="wait">
                  {phoneLocked ? (
                    <motion.div
                      key="locked"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ boxShadow: ["0 0 0 0 rgba(29,110,245,0)", "0 0 20px 4px rgba(29,110,245,0.2)", "0 0 0 0 rgba(29,110,245,0)"] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="w-14 h-14 border-2 border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-3 bg-blue-600/8"
                      >
                        <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                      </motion.div>
                      <div className="font-black text-[16px] mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>DEVICE LOCKED</div>
                      <div className="text-[10px] text-[#5a7fa8] mb-4 leading-relaxed">Pay your EMI<br />to unlock this device</div>
                      <button className="w-full bg-blue-600 text-white text-[12px] font-bold py-2.5 rounded-lg mb-3">
                        Pay EMI Now
                      </button>
                      <div className="h-px bg-blue-500/10 mb-3" />
                      {[
                        { k: "Amount Due", v: "Rs. 7,500", c: "text-red-400" },
                        { k: "Customer", v: "Ali Hassan" },
                        { k: "Device", v: "Samsung S24" },
                        { k: "Overdue", v: "3 days", c: "text-amber-400" },
                      ].map((row, i) => (
                        <div key={i} className="flex justify-between mb-2">
                          <span className="text-[10px] text-[#2a4060]">{row.k}</span>
                          <span className={`text-[10px] font-bold ${row.c || "text-[#5a7fa8]"}`}>{row.v}</span>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unlocked"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ boxShadow: ["0 0 0 0 rgba(34,197,94,0)", "0 0 20px 4px rgba(34,197,94,0.2)", "0 0 0 0 rgba(34,197,94,0)"] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="w-14 h-14 border-2 border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-3 bg-green-500/8"
                      >
                        <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 017-4.9" />
                        </svg>
                      </motion.div>
                      <div className="font-black text-[16px] mb-1 text-green-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>UNLOCKED ✓</div>
                      <div className="text-[10px] text-[#5a7fa8] mb-4">EMI received — phone unlocked</div>
                      <div className="bg-green-500/8 border border-green-500/15 rounded-lg p-3 text-left">
                        {[
                          { k: "Customer", v: "Ali Hassan" },
                          { k: "EMI Paid", v: "Rs. 7,500", c: "text-green-400" },
                          { k: "Next Due", v: "15 May 2025" },
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between mb-1.5">
                            <span className="text-[10px] text-[#2a4060]">{row.k}</span>
                            <span className={`text-[10px] font-bold ${row.c || "text-[#5a7fa8]"}`}>{row.v}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ██  MARQUEE DIVIDER
          ════════════════════════════════════════════════════ */}
      <div className="border-y border-blue-500/10 bg-[#060d1a] overflow-hidden py-5">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, j) =>
            ["LOCK INSTANTLY", "AUTO EMI ALERTS", "TRACK LOCATION", "SIM ALERTS", "APP BLOCKING", "RETAILER DASHBOARD", "NETWORK CONTROL", "REMOTE REBOOT"].map(
              (item, i) => (
                <div key={`${j}-${i}`} className="flex items-center gap-4 px-10">
                  <span className="text-blue-500 text-xl">✦</span>
                  <span
                    className={`font-black text-[26px] tracking-[2px] whitespace-nowrap ${i % 2 === 0 ? "text-blue-400" : "text-[#2a4060]"}`}
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item}
                  </span>
                </div>
              )
            )
          )}
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════
          ██  FEATURES SECTION
          ════════════════════════════════════════════════════ */}
      <section id="features" className="relative z-10 px-[5%] py-24">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-blue-300 mb-4">
            <span className="w-5 h-px bg-blue-500" /> Features
          </div>
          <h2
            className="font-black text-[clamp(40px,5vw,62px)] leading-none mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            TOTAL PROTECTION<br />FOR YOUR BUSINESS
          </h2>
          <p className="text-[15px] text-[#5a7fa8] font-light leading-relaxed max-w-[500px]">
            Every tool a mobile retailer needs — in one smart, powerful platform.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-14">
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
              whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.35)" }}
              className={`bg-[#060d1a] border border-blue-500/10 rounded-2xl p-6 transition-colors group ${f.span === "col-span-2" ? "md:col-span-2" : ""}`}
            >
              {f.span === "col-span-2" ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="w-11 h-11 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-5">
                      {f.icon}
                    </div>
                    <div className="font-black text-[20px] mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{f.title}</div>
                    <p className="text-[13px] text-[#5a7fa8] font-light leading-relaxed">{f.desc}</p>
                  </div>
                  {/* Mini dashboard preview */}
                  <div className="flex flex-col gap-2 justify-center">
                    {[
                      { name: "Usman Raza", device: "iPhone 15", status: "Overdue", action: "Lock", sc: "text-red-400", bc: "bg-red-500/10 text-red-400 border-red-500/25" },
                      { name: "Fatima Malik", device: "Samsung S24", status: "Paid", action: "Unlock", sc: "text-green-400", bc: "bg-green-500/10 text-green-400 border-green-500/25" },
                      { name: "Hamza Khan", device: "OnePlus 12", status: "Due Soon", action: "Lock", sc: "text-amber-400", bc: "bg-amber-500/10 text-amber-400 border-amber-500/25" },
                    ].map((row, j) => (
                      <div key={j} className="flex items-center justify-between bg-[#0a1525] border border-blue-500/10 rounded-lg px-3 py-2.5">
                        <div>
                          <div className="text-[12px] font-semibold text-white">{row.name}</div>
                          <div className="text-[10px] text-[#5a7fa8]">{row.device}</div>
                        </div>
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-full border ${row.bc}`}>{row.status}</span>
                        <button className={`text-[9px] font-bold px-2.5 py-1 rounded border ${row.bc}`}>{row.action}</button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="w-11 h-11 bg-blue-600/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-5">
                    {f.icon}
                  </div>
                  <div className="font-black text-[18px] mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{f.title}</div>
                  <p className="text-[13px] text-[#5a7fa8] font-light leading-relaxed">{f.desc}</p>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ██  HOW IT WORKS SECTION
          ════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-[#060d1a] border-y border-blue-500/10 px-[5%] py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-blue-300 mb-4">
              <span className="w-5 h-px bg-blue-500" /> How It Works
            </div>
            <h2
              className="font-black text-[clamp(40px,5vw,62px)] leading-none mb-16"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              4 SIMPLE<br />STEPS
            </h2>
            <div className="flex flex-col">
              {[
                { n: "01", t: "Download the App", d: "Get the Pay-Protect Retailer app from Google Play. Ready in under 2 minutes." },
                { n: "02", t: "Register Your Shop", d: "Add your shop name and contact details. Your dashboard activates instantly." },
                { n: "03", t: "Add Customer Devices", d: "Enter customer CNIC, EMI amount, and due dates. Protection activates automatically." },
                { n: "04", t: "Control From Anywhere", d: "Lock or unlock with one tap. Send reminders, track location, and view full EMI history." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.1}
                  className="flex gap-5 py-7 border-b border-blue-500/10 last:border-0 group"
                >
                  <span
                    className="font-black text-[48px] leading-none text-blue-500/10 group-hover:text-blue-500/25 transition-colors min-w-[60px]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <div className="font-black text-[20px] mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{step.t}</div>
                    <p className="text-[13px] text-[#5a7fa8] font-light leading-relaxed">{step.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Mockup */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
            className="bg-[#0a1525] border border-blue-500/20 rounded-2xl overflow-hidden"
          >
            <div className="bg-[#060d1a] px-4 py-3 flex items-center gap-2.5 border-b border-blue-500/10">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <div className="flex-1 bg-[#0a1525] rounded text-[10px] text-[#2a4060] px-3 py-1 mx-2">
                dashboard.pay-protect.pk
              </div>
            </div>
            <div className="p-4">
              <div className="font-black text-[13px] mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Overview</div>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                {[
                  { l: "Total Devices", v: "148", c: "text-white", s: "+12 this week" },
                  { l: "Currently Locked", v: "23", c: "text-red-400", s: "Overdue" },
                  { l: "Collected", v: "Rs.4.2L", c: "text-green-400", s: "This month" },
                ].map((s, i) => (
                  <div key={i} className="bg-[#060d1a] border border-blue-500/10 rounded-xl p-3">
                    <div className="text-[9px] text-[#2a4060] mb-1">{s.l}</div>
                    <div className={`font-black text-[20px] leading-none ${s.c}`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{s.v}</div>
                    <div className="text-[9px] text-green-400 mt-1">{s.s}</div>
                  </div>
                ))}
              </div>
              <div className="font-black text-[11px] mb-2 text-[#5a7fa8]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                RECENT CUSTOMERS
              </div>
              {[
                { n: "Usman Raza", d: "iPhone 15 Pro", a: "Rs.8,500", s: "Overdue", sc: "text-red-400" },
                { n: "Fatima Malik", d: "Samsung S24", a: "Rs.6,200", s: "Paid", sc: "text-green-400" },
                { n: "Hamza Khan", d: "OnePlus 12", a: "Rs.5,000", s: "Due Soon", sc: "text-amber-400" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-4 items-center bg-[#060d1a] border border-blue-500/10 rounded-lg px-3 py-2.5 mb-2 text-[11px]">
                  <div>
                    <div className="font-semibold text-white text-[11px]">{row.n}</div>
                    <div className="text-[10px] text-[#5a7fa8]">{row.d}</div>
                  </div>
                  <div className="text-white">{row.a}</div>
                  <span className={`text-[9px] font-bold ${row.sc}`}>{row.s}</span>
                  <button className={`text-[9px] font-bold px-2 py-1 rounded border ${row.sc === "text-red-400" ? "text-red-400 border-red-500/25 bg-red-500/8" : "text-green-400 border-green-500/25 bg-green-500/8"}`}>
                    {row.sc === "text-red-400" ? "Lock" : "Unlock"}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ██  TRUST / NUMBERS SECTION
          ════════════════════════════════════════════════════ */}
      <section id="why-us" className="px-[5%] py-24 relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-blue-300 mb-4">
            <span className="w-5 h-px bg-blue-500" /> Why Pay-Protect <span className="w-5 h-px bg-blue-500" />
          </div>
          <h2
            className="font-black text-[clamp(40px,5vw,62px)] leading-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            NUMBERS DON&apos;T LIE
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { n: 5000, s: "+", l: "Active Retailers", d: "From Karachi to Peshawar, mobile shop owners trust Pay-Protect to protect their entire financed inventory." },
            { n: 99, s: ".9%", l: "Lock Success Rate", d: "Our remote lock system reliably works on both Android and iOS — even after a SIM card change." },
            { n: 0, s: " Rs.", l: "Average Default Loss", d: "Retailers using Pay-Protect report near-zero EMI defaults. When a phone can be locked, customers pay on time." },
          ].map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.1}
              whileHover={{ y: -5 }}
              className="bg-[#060d1a] border border-blue-500/10 rounded-2xl p-9 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl" />
              <div className="font-black text-[64px] leading-none text-blue-400 mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                <Counter to={c.n} suffix={c.s} />
              </div>
              <div className="font-bold text-[16px] mb-3">{c.l}</div>
              <p className="text-[13px] text-[#5a7fa8] font-light leading-relaxed">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ██  FAQ SECTION
          ════════════════════════════════════════════════════ */}
      <section id="faq" className="bg-[#060d1a] border-y border-blue-500/10 px-[5%] py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-blue-300 mb-4">
              <span className="w-5 h-px bg-blue-500" /> FAQ
            </div>
            <h2
              className="font-black text-[clamp(40px,5vw,62px)] leading-none mb-4"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              QUESTIONS?<br />ANSWERED.
            </h2>
            <p className="text-[15px] text-[#5a7fa8] font-light leading-relaxed">
              Still have questions?{" "}
              <a href="#contact" className="text-blue-300 hover:text-blue-200 transition-colors">
                Contact us →
              </a>
            </p>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.08}
                className="border-b border-blue-500/10 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center py-5 text-left gap-4"
                >
                  <span className="font-bold text-[15px] text-white leading-snug">{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-7 h-7 flex-shrink-0 border border-blue-500/25 rounded-full flex items-center justify-center text-blue-300 text-lg"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="text-[13px] text-[#5a7fa8] font-light leading-relaxed pb-5">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ██  CONTACT SECTION
          ════════════════════════════════════════════════════ */}
      <section id="contact" className="px-[5%] py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[2px] uppercase text-blue-300 mb-4">
              <span className="w-5 h-px bg-blue-500" /> Contact Us
            </div>
            <h2
              className="font-black leading-[0.95] mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(50px,6vw,78px)" }}
            >
              REQUEST A<br />FREE DEMO<br /><span className="text-blue-400">TODAY.</span>
            </h2>
            <p className="text-[15px] text-[#5a7fa8] font-light leading-relaxed max-w-[380px] mb-10">
              Our team will show you the full system live — completely free, no commitment required.
            </p>
            {[
              { icon: "📞", l: "Phone / WhatsApp", v: "+92-300-0000000" },
              { icon: "✉️", l: "Email", v: "support@pay-protect.pk" },
              { icon: "📍", l: "Office", v: "Karachi, Pakistan" },
            ].map((c, i) => (
              <div key={i} className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 bg-blue-600/8 border border-blue-500/20 rounded-lg flex items-center justify-center text-lg">{c.icon}</div>
                <div>
                  <div className="text-[10px] text-[#2a4060] uppercase tracking-wider">{c.l}</div>
                  <div className="text-[14px] font-semibold text-white">{c.v}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="bg-[#060d1a] border border-blue-500/15 rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              {[
                { l: "Full Name", p: "Your name" },
                { l: "Phone / WhatsApp", p: "+92 300 ..." },
              ].map((f, i) => (
                <div key={i}>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5a7fa8] mb-2">{f.l}</label>
                  <input
                    placeholder={f.p}
                    className="w-full bg-[#0a1525] border border-blue-500/20 rounded-lg px-4 py-3 text-[14px] text-white placeholder-[#2a4060] outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="mb-3.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5a7fa8] mb-2">Shop Name</label>
              <input
                placeholder="Your mobile shop"
                className="w-full bg-[#0a1525] border border-blue-500/20 rounded-lg px-4 py-3 text-[14px] text-white placeholder-[#2a4060] outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <div className="grid grid-cols-2 gap-3.5 mb-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5a7fa8] mb-2">City</label>
                <input
                  placeholder="Your city"
                  className="w-full bg-[#0a1525] border border-blue-500/20 rounded-lg px-4 py-3 text-[14px] text-white placeholder-[#2a4060] outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5a7fa8] mb-2">No. of Devices</label>
                <select className="w-full bg-[#0a1525] border border-blue-500/20 rounded-lg px-4 py-3 text-[14px] text-white outline-none focus:border-blue-500/50 transition-colors appearance-none">
                  <option>1 – 20 devices</option>
                  <option>20 – 100 devices</option>
                  <option>100 – 500 devices</option>
                  <option>500+ devices</option>
                </select>
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5a7fa8] mb-2">Message (Optional)</label>
              <textarea
                placeholder="Any questions or requirements?"
                className="w-full bg-[#0a1525] border border-blue-500/20 rounded-lg px-4 py-3 text-[14px] text-white placeholder-[#2a4060] outline-none focus:border-blue-500/50 transition-colors resize-none h-24"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-[15px] py-4 rounded-lg transition-colors tracking-wider"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}
              onClick={() => alert("Demo request sent! Our team will contact you shortly.")}
            >
              SEND DEMO REQUEST →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ██  FOOTER
          ════════════════════════════════════════════════════ */}
      <footer className="bg-[#060d1a] border-t border-blue-500/10 px-[5%] pt-14 pb-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-blue-500/10">
          <div className="col-span-2 md:col-span-1">
            <div
              className="font-black text-[22px] tracking-[2px] mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              PAY<span className="text-blue-400">PROTECT</span>
            </div>
            <p className="text-[13px] text-[#2a4060] font-light leading-relaxed max-w-[220px]">
              Pakistan&apos;s trusted EMI protection platform for mobile retailers.
            </p>
          </div>
          {[
            { t: "Product", links: ["Features", "How It Works", "Why Us", "Pricing"] },
            { t: "Support", links: ["FAQ", "Contact Us", "Documentation", "WhatsApp Support"] },
            { t: "Legal", links: ["Privacy Policy", "Terms & Conditions", "Refund Policy"] },
          ].map((col, i) => (
            <div key={i}>
              <div className="text-[10px] font-black uppercase tracking-[2px] text-white mb-4">{col.t}</div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l, j) => (
                  <li key={j}>
                    <a href="#" className="text-[13px] text-[#2a4060] hover:text-blue-300 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="text-[12px] text-[#2a4060]">© 2025 Pay-Protect. All Rights Reserved.</span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Contact"].map((l, i) => (
              <a key={i} href="#" className="text-[12px] text-[#2a4060] hover:text-[#5a7fa8] transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </footer>

    </main>
  );
}