"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ════════════════════════════════════════════════════════════════
// ██  HARDCODED CREDENTIALS
//     Email format:  <role>@pay-protect.pk
//     Password:      PayProtect@2025
// ════════════════════════════════════════════════════════════════

const CREDENTIALS: Record<string, { email: string; password: string; redirect: string }> = {
  shopkeeper: {
    email: "shop@pay-protect.pk",
    password: "PayProtect@2025",
    redirect: "/dashboard/shopkeeper",
  },
  customer: {
    email: "customer@pay-protect.pk",
    password: "PayProtect@2025",
    redirect: "/dashboard/customer",
  },
  admin: {
    email: "admin@pay-protect.pk",
    password: "PayProtect@2025",
    redirect: "/dashboard/admin",
  },
  developer: {
    email: "dev@pay-protect.pk",
    password: "PayProtect@2025",
    redirect: "/dashboard/developer",
  },
};

// ════════════════════════════════════════════════════════════════
// ██  ROLE CONFIG
// ════════════════════════════════════════════════════════════════

const ROLES = [
  {
    id: "shopkeeper",
    label: "Shopkeeper",
    subtitle: "Manage devices & EMIs",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: "customer",
    label: "Customer",
    subtitle: "View EMI status & payments",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    id: "admin",
    label: "Admin",
    subtitle: "Full platform control",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: "developer",
    label: "API Retailer",
    subtitle: "API keys & integrations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

// ════════════════════════════════════════════════════════════════
// ██  EYE ICON (show/hide password)
// ════════════════════════════════════════════════════════════════

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════
// ██  MAIN LOGIN PAGE COMPONENT
// ════════════════════════════════════════════════════════════════

export default function LoginPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"role" | "credentials">("role");

  // ── Handle role select → move to credentials step
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setError("");
    setEmail("");
    setPassword("");
    setStep("credentials");
  };

  // ── Handle back to role selection
  const handleBack = () => {
    setStep("role");
    setSelectedRole(null);
    setError("");
  };

  // ── Handle login submit
  const handleLogin = async () => {
    if (!selectedRole) return;
    setError("");

    const creds = CREDENTIALS[selectedRole];

    if (email.trim() === "" || password.trim() === "") {
      setError("Please fill in all fields.");
      return;
    }

    if (email.toLowerCase() !== creds.email || password !== creds.password) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    setLoading(true);
    // Simulate network delay for realism
    await new Promise((r) => setTimeout(r, 1200));
    router.push(creds.redirect);
  };

  const activeRole = ROLES.find((r) => r.id === selectedRole);

  return (
    <main className="min-h-screen bg-[#03070f] text-[#e8f2ff] flex flex-col">

      {/* ════════════════════════════════════════════════════════
          ██  DOT GRID BACKGROUND
          ════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(29,110,245,0.10) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Glow blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute left-1/4 top-1/3 w-[500px] h-[500px] bg-blue-700/8 rounded-full blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 w-[300px] h-[300px] bg-blue-500/6 rounded-full blur-[80px]" />
      </div>

      {/* ════════════════════════════════════════════════════════
          ██  NAVBAR (minimal)
          ════════════════════════════════════════════════════ */}
      <nav className="relative z-10 h-16 flex items-center justify-between px-[5%] border-b border-blue-500/10 bg-[#03070f]/80 backdrop-blur-xl">
        <Link
          href="/"
          className="font-black text-xl tracking-widest"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "3px" }}
        >
          PAY<span className="text-blue-400">PROTECT</span>
        </Link>
        <span className="text-[12px] text-[#5a7fa8]">
          Secure Login Portal
        </span>
      </nav>

      {/* ════════════════════════════════════════════════════════
          ██  MAIN CONTENT
          ════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px]">

          {/* ── Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-8"
          >
            {/* Lock icon */}
            <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth={1.8} className="w-7 h-7">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>

            <h1
              className="font-black text-[38px] leading-none mb-2"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}
            >
              {step === "role" ? "WHO ARE YOU?" : `WELCOME BACK`}
            </h1>
            <p className="text-[13px] text-[#5a7fa8]">
              {step === "role"
                ? "Select your role to continue"
                : `Signing in as ${activeRole?.label}`}
            </p>
          </motion.div>

          {/* ════════════════════════════════
              ██  STEP 1 — ROLE SELECTION
              ════════════════════════════ */}
          <AnimatePresence mode="wait">
            {step === "role" && (
              <motion.div
                key="role-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="grid grid-cols-2 gap-3">
                  {ROLES.map((role, i) => (
                    <motion.button
                      key={role.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => handleRoleSelect(role.id)}
                      className="group relative bg-[#060d1a] border border-blue-500/15 hover:border-blue-500/50 rounded-2xl p-5 text-left transition-all duration-200 hover:bg-[#0a1525] hover:-translate-y-0.5"
                    >
                      {/* Top accent line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/0 group-hover:via-blue-400/60 to-transparent rounded-t-2xl transition-all duration-300" />

                      <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/20 group-hover:border-blue-500/40 rounded-xl flex items-center justify-center text-blue-400 mb-4 transition-colors">
                        {role.icon}
                      </div>
                      <div
                        className="font-black text-[16px] text-white mb-0.5"
                        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.5px" }}
                      >
                        {role.label}
                      </div>
                      <div className="text-[11px] text-[#5a7fa8] leading-tight">{role.subtitle}</div>

                      {/* Arrow */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400 text-sm">→</div>
                    </motion.button>
                  ))}
                </div>

                <p className="text-center text-[12px] text-[#2a4060] mt-6">
                  Don&apos;t have an account?{" "}
                  <Link href="/#contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Request a Demo
                  </Link>
                </p>
              </motion.div>
            )}

            {/* ════════════════════════════
                ██  STEP 2 — CREDENTIALS
                ════════════════════════ */}
            {step === "credentials" && (
              <motion.div
                key="creds-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#060d1a] border border-blue-500/15 rounded-2xl p-7"
              >
                {/* Selected role badge */}
                <div className="flex items-center gap-3 mb-6 pb-5 border-b border-blue-500/10">
                  <div className="w-9 h-9 bg-blue-600/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                    {activeRole?.icon}
                  </div>
                  <div>
                    <div className="text-[12px] text-[#5a7fa8]">Logging in as</div>
                    <div
                      className="font-black text-[15px] text-white"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.5px" }}
                    >
                      {activeRole?.label}
                    </div>
                  </div>
                  <button
                    onClick={handleBack}
                    className="ml-auto text-[11px] text-[#5a7fa8] hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    ← Change
                  </button>
                </div>

                {/* Email field */}
                <div className="mb-4">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5a7fa8] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    placeholder={CREDENTIALS[selectedRole!]?.email}
                    className="w-full bg-[#0a1525] border border-blue-500/20 focus:border-blue-500/60 rounded-xl px-4 py-3.5 text-[14px] text-white placeholder-[#2a4060] outline-none transition-colors"
                  />
                </div>

                {/* Password field */}
                <div className="mb-5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#5a7fa8] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      placeholder="Enter your password"
                      className="w-full bg-[#0a1525] border border-blue-500/20 focus:border-blue-500/60 rounded-xl px-4 py-3.5 pr-11 text-[14px] text-white placeholder-[#2a4060] outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5a7fa8] hover:text-blue-300 transition-colors"
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 bg-red-500/8 border border-red-500/20 rounded-lg px-4 py-3 mb-4"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth={2} className="w-4 h-4 flex-shrink-0">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span className="text-[12px] text-red-400">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Login button */}
                <motion.button
                  onClick={handleLogin}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-black text-[15px] py-4 rounded-xl transition-colors flex items-center justify-center gap-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      SIGNING IN...
                    </>
                  ) : (
                    <>
                      SIGN IN
                      <span className="w-6 h-6 border border-white/30 rounded-full flex items-center justify-center text-sm">→</span>
                    </>
                  )}
                </motion.button>

                {/* Hint */}
                <p className="text-center text-[11px] text-[#2a4060] mt-4">
                  Forgot your credentials?{" "}
                  <Link href="/#contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Contact support
                  </Link>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          ██  FOOTER BAR
          ════════════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-blue-500/10 px-[5%] py-4 flex items-center justify-between">
        <span className="text-[11px] text-[#2a4060]">© 2025 Pay-Protect. All rights reserved.</span>
        <div className="flex items-center gap-1.5 text-[11px] text-[#2a4060]">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          All systems operational
        </div>
      </div>

    </main>
  );
}