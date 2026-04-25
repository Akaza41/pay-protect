"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

// ════════════════════════════════════════════════════════════════
// ██  FAKE DATA
// ════════════════════════════════════════════════════════════════

const SHOP_NAME = "Ali Mobile Center";
const RETAILER_NAME = "Ali Hassan";

const CUSTOMERS = [
  { id: 1, name: "Usman Raza",    cnic: "42101-1234567-1", device: "iPhone 15 Pro",  amount: 8500,  paid: 2, total: 12, status: "overdue",  overdueDays: 5,  location: "Karachi",  sim: "0312-1234567" },
  { id: 2, name: "Fatima Malik",  cnic: "42201-2345678-2", device: "Samsung S24",    amount: 6200,  paid: 4, total: 10, status: "paid",     overdueDays: 0,  location: "Lahore",   sim: "0321-2345678" },
  { id: 3, name: "Hamza Khan",    cnic: "35201-3456789-3", device: "OnePlus 12",     amount: 5000,  paid: 3, total: 8,  status: "due-soon", overdueDays: 0,  location: "Multan",   sim: "0333-3456789" },
  { id: 4, name: "Sana Ahmed",    cnic: "42301-4567890-4", device: "Xiaomi 14",      amount: 4500,  paid: 6, total: 12, status: "paid",     overdueDays: 0,  location: "Karachi",  sim: "0300-4567890" },
  { id: 5, name: "Bilal Sheikh",  cnic: "35101-5678901-5", device: "Samsung A55",    amount: 3200,  paid: 1, total: 6,  status: "overdue",  overdueDays: 12, location: "Faisalabad", sim: "0345-5678901" },
  { id: 6, name: "Nadia Butt",    cnic: "42101-6789012-6", device: "iPhone 14",      amount: 7800,  paid: 5, total: 10, status: "due-soon", overdueDays: 0,  location: "Islamabad", sim: "0311-6789012" },
  { id: 7, name: "Tariq Mehmood", cnic: "35201-7890123-7", device: "Oppo Reno 11",   amount: 3800,  paid: 8, total: 8,  status: "paid",     overdueDays: 0,  location: "Lahore",   sim: "0322-7890123" },
  { id: 8, name: "Ayesha Qureshi",cnic: "42201-8901234-8", device: "Vivo V30",       amount: 2900,  paid: 2, total: 6,  status: "overdue",  overdueDays: 3,  location: "Karachi",  sim: "0301-8901234" },
];

const ACTIVITY = [
  { id: 1, action: "Device Locked",   customer: "Usman Raza",     device: "iPhone 15 Pro", time: "2 min ago",   type: "lock" },
  { id: 2, action: "EMI Received",    customer: "Fatima Malik",   device: "Samsung S24",   time: "1 hr ago",    type: "payment" },
  { id: 3, action: "Reminder Sent",   customer: "Hamza Khan",     device: "OnePlus 12",    time: "3 hrs ago",   type: "reminder" },
  { id: 4, action: "Device Unlocked", customer: "Sana Ahmed",     device: "Xiaomi 14",     time: "Yesterday",   type: "unlock" },
  { id: 5, action: "SIM Changed",     customer: "Bilal Sheikh",   device: "Samsung A55",   time: "Yesterday",   type: "alert" },
];

// ════════════════════════════════════════════════════════════════
// ██  STAT CARD COMPONENT
// ════════════════════════════════════════════════════════════════

function StatCard({ label, value, sub, color = "text-white", icon }: {
  label: string; value: string; sub: string; color?: string; icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-[#060d1a] border border-blue-500/10 rounded-2xl p-5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/4 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 bg-blue-600/10 border border-blue-500/15 rounded-xl flex items-center justify-center text-blue-400">
          {icon}
        </div>
        <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">{sub}</span>
      </div>
      <div className={`font-black text-[32px] leading-none ${color} mb-1`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        {value}
      </div>
      <div className="text-[12px] text-[#5a7fa8]">{label}</div>
    </motion.div>
  );
}

// ════════════════════════════════════════════════════════════════
// ██  STATUS BADGE COMPONENT
// ════════════════════════════════════════════════════════════════

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    overdue:  "bg-red-500/10 text-red-400 border-red-500/25",
    paid:     "bg-green-500/10 text-green-400 border-green-500/25",
    "due-soon": "bg-amber-500/10 text-amber-400 border-amber-500/25",
  };
  const label: Record<string, string> = {
    overdue: "Overdue", paid: "Paid", "due-soon": "Due Soon",
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${map[status]}`}>
      {label[status]}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════
// ██  SIDEBAR NAV ITEMS
// ════════════════════════════════════════════════════════════════

const NAV = [
  { id: "overview",   label: "Overview",   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
  { id: "customers",  label: "Customers",  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg> },
  { id: "devices",    label: "Devices",    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg> },
  { id: "activity",   label: "Activity",   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { id: "codes",      label: "Activation Codes", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4.5 h-4.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
];

// ════════════════════════════════════════════════════════════════
// ██  MAIN DASHBOARD COMPONENT
// ════════════════════════════════════════════════════════════════

export default function ShopkeeperDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof CUSTOMERS[0] | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

  // ── Show toast helper
  const showToast = (msg: string, type: "success" | "error" | "info" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Lock / Unlock toggle
  const toggleLock = (id: number) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const wasOverdue = c.status === "overdue";
        showToast(
          wasOverdue ? `${c.name}'s device has been locked.` : `${c.name}'s device has been unlocked.`,
          wasOverdue ? "error" : "success"
        );
        return { ...c, status: wasOverdue ? "overdue" : "paid" };
      })
    );
  };

  // ── Send reminder
  const sendReminder = (name: string) => {
    showToast(`EMI reminder sent to ${name}.`, "info");
  };

  // ── Filtered customers
  const filtered = customers.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.device.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchFilter;
  });

  const overdue = customers.filter((c) => c.status === "overdue").length;
  const totalCollected = customers.reduce((acc, c) => acc + c.amount * c.paid, 0);

  return (
    <div className="min-h-screen bg-[#03070f] text-[#e8f2ff] flex">

      {/* ════════════════════════════════════════════════════════
          ██  DOT GRID
          ════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: "radial-gradient(rgba(29,110,245,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />

      {/* ════════════════════════════════════════════════════════
          ██  SIDEBAR
          ════════════════════════════════════════════════════ */}
      <motion.aside
        animate={{ width: sidebarOpen ? 220 : 64 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 flex-shrink-0 bg-[#060d1a] border-r border-blue-500/10 flex flex-col h-screen sticky top-0 overflow-hidden"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-blue-500/10 flex-shrink-0">
          <span
            className="font-black text-[18px] whitespace-nowrap"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}
          >
            PAY<span className="text-blue-400">PROTECT</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all w-full ${
                activeTab === item.id
                  ? "bg-blue-600/15 text-blue-300 border border-blue-500/25"
                  : "text-[#5a7fa8] hover:text-white hover:bg-blue-500/8"
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className={`text-[13px] font-medium whitespace-nowrap transition-opacity ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        {/* Shop info */}
        {sidebarOpen && (
          <div className="p-3 border-t border-blue-500/10">
            <div className="bg-[#0a1525] rounded-xl p-3">
              <div className="text-[10px] text-[#5a7fa8] mb-0.5">Logged in as</div>
              <div className="text-[13px] font-semibold text-white truncate">{RETAILER_NAME}</div>
              <div className="text-[11px] text-[#5a7fa8] truncate">{SHOP_NAME}</div>
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen((p) => !p)}
          className="absolute top-4 -right-3 w-6 h-6 bg-[#0a1525] border border-blue-500/20 rounded-full flex items-center justify-center text-[#5a7fa8] hover:text-blue-300 transition-colors z-30"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3 h-3">
            {sidebarOpen ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
          </svg>
        </button>
      </motion.aside>

      {/* ════════════════════════════════════════════════════════
          ██  MAIN AREA
          ════════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">

        {/* ── Top Bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-blue-500/10 bg-[#03070f]/80 backdrop-blur-xl sticky top-0 z-10">
          <div>
            <h1
              className="font-black text-[20px] leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}
            >
              {NAV.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-[11px] text-[#5a7fa8]">{SHOP_NAME}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Activation codes remaining */}
            <div className="hidden md:flex items-center gap-2 bg-[#060d1a] border border-blue-500/15 rounded-lg px-3 py-1.5">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <span className="text-[12px] text-[#5a7fa8]">Codes: <strong className="text-white">47</strong> remaining</span>
            </div>
            {/* Logout */}
            <Link
              href="/login"
              className="flex items-center gap-1.5 text-[12px] text-[#5a7fa8] hover:text-white transition-colors bg-[#060d1a] border border-blue-500/10 rounded-lg px-3 py-1.5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3.5 h-3.5">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </Link>
          </div>
        </header>

        {/* ── Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">

            {/* ══════════════════════════════════════════════
                ██  TAB: OVERVIEW
                ══════════════════════════════════════════ */}
            {activeTab === "overview" && (
              <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <StatCard
                    label="Total Devices" value={String(customers.length)} sub="+2 this week" color="text-white"
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>}
                  />
                  <StatCard
                    label="Currently Locked" value={String(overdue)} sub="Overdue EMIs" color="text-red-400"
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
                  />
                  <StatCard
                    label="Collected This Month" value={`Rs.${(totalCollected / 1000).toFixed(1)}L`} sub="↑ 12% vs last month" color="text-green-400"
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>}
                  />
                  <StatCard
                    label="Active Codes" value="47" sub="Top up anytime" color="text-blue-400"
                    icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>}
                  />
                </div>

                {/* Recent Customers + Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                  {/* Recent customers table */}
                  <div className="lg:col-span-2 bg-[#060d1a] border border-blue-500/10 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-blue-500/10">
                      <span className="font-black text-[14px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Recent Customers</span>
                      <button onClick={() => setActiveTab("customers")} className="text-[11px] text-blue-400 hover:text-blue-300">View all →</button>
                    </div>
                    <div className="divide-y divide-blue-500/8">
                      {customers.slice(0, 5).map((c) => (
                        <div key={c.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#0a1525] transition-colors">
                          <div className="w-8 h-8 bg-blue-600/10 border border-blue-500/15 rounded-full flex items-center justify-center text-[12px] font-bold text-blue-300 flex-shrink-0">
                            {c.name[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-white truncate">{c.name}</div>
                            <div className="text-[11px] text-[#5a7fa8]">{c.device}</div>
                          </div>
                          <StatusBadge status={c.status} />
                          <div className="text-[12px] font-bold text-white">Rs.{c.amount.toLocaleString()}</div>
                          <button
                            onClick={() => toggleLock(c.id)}
                            className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                              c.status === "overdue"
                                ? "text-red-400 border-red-500/25 bg-red-500/8 hover:bg-red-500/15"
                                : "text-green-400 border-green-500/25 bg-green-500/8 hover:bg-green-500/15"
                            }`}
                          >
                            {c.status === "overdue" ? "🔒 Lock" : "🔓 Unlock"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity feed */}
                  <div className="bg-[#060d1a] border border-blue-500/10 rounded-2xl overflow-hidden">
                    <div className="px-5 py-4 border-b border-blue-500/10">
                      <span className="font-black text-[14px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Recent Activity</span>
                    </div>
                    <div className="divide-y divide-blue-500/8">
                      {ACTIVITY.map((a) => {
                        const colors: Record<string, string> = {
                          lock: "text-red-400", unlock: "text-green-400",
                          payment: "text-green-400", reminder: "text-blue-400", alert: "text-amber-400",
                        };
                        const icons: Record<string, string> = {
                          lock: "🔒", unlock: "🔓", payment: "💰", reminder: "📩", alert: "⚠️",
                        };
                        return (
                          <div key={a.id} className="px-5 py-3.5">
                            <div className="flex items-start gap-2.5">
                              <span className="text-sm mt-0.5">{icons[a.type]}</span>
                              <div className="flex-1 min-w-0">
                                <div className={`text-[12px] font-semibold ${colors[a.type]}`}>{a.action}</div>
                                <div className="text-[11px] text-white truncate">{a.customer}</div>
                                <div className="text-[10px] text-[#5a7fa8]">{a.device} · {a.time}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════
                ██  TAB: CUSTOMERS
                ══════════════════════════════════════════ */}
            {activeTab === "customers" && (
              <motion.div key="customers" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

                {/* Search + Filter */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <div className="relative flex-1 min-w-[200px]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a7fa8]">
                      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                    </svg>
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by name or device..."
                      className="w-full bg-[#060d1a] border border-blue-500/15 rounded-xl pl-10 pr-4 py-2.5 text-[13px] text-white placeholder-[#2a4060] outline-none focus:border-blue-500/40 transition-colors"
                    />
                  </div>
                  {["all", "overdue", "due-soon", "paid"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilterStatus(f)}
                      className={`px-4 py-2.5 rounded-xl text-[12px] font-bold border transition-all capitalize ${
                        filterStatus === f
                          ? "bg-blue-600/20 text-blue-300 border-blue-500/40"
                          : "bg-[#060d1a] text-[#5a7fa8] border-blue-500/10 hover:border-blue-500/30"
                      }`}
                    >
                      {f === "all" ? "All" : f === "due-soon" ? "Due Soon" : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                  <button
                    onClick={() => showToast("Add customer feature coming soon!", "info")}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-bold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    + Add Customer
                  </button>
                </div>

                {/* Table */}
                <div className="bg-[#060d1a] border border-blue-500/10 rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-2 px-5 py-3 border-b border-blue-500/10 text-[10px] font-bold uppercase tracking-wider text-[#5a7fa8]">
                    <div className="col-span-3">Customer</div>
                    <div className="col-span-2">Device</div>
                    <div className="col-span-1">EMI</div>
                    <div className="col-span-1">Progress</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-2">Location</div>
                    <div className="col-span-2">Actions</div>
                  </div>

                  {/* Rows */}
                  <div className="divide-y divide-blue-500/8">
                    {filtered.map((c) => (
                      <motion.div
                        key={c.id}
                        layout
                        className="grid grid-cols-12 gap-2 px-5 py-4 hover:bg-[#0a1525] transition-colors items-center cursor-pointer"
                        onClick={() => setSelectedCustomer(c)}
                      >
                        <div className="col-span-3 flex items-center gap-2.5">
                          <div className="w-8 h-8 bg-blue-600/10 border border-blue-500/15 rounded-full flex items-center justify-center text-[11px] font-bold text-blue-300 flex-shrink-0">
                            {c.name[0]}
                          </div>
                          <div>
                            <div className="text-[13px] font-semibold text-white">{c.name}</div>
                            <div className="text-[10px] text-[#5a7fa8]">{c.sim}</div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-[12px] text-white">{c.device}</div>
                        </div>
                        <div className="col-span-1">
                          <div className="text-[12px] font-bold text-white">Rs.{c.amount.toLocaleString()}</div>
                        </div>
                        <div className="col-span-1">
                          <div className="text-[10px] text-[#5a7fa8] mb-1">{c.paid}/{c.total}</div>
                          <div className="h-1 bg-[#0a1525] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${(c.paid / c.total) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="col-span-1">
                          <StatusBadge status={c.status} />
                        </div>
                        <div className="col-span-2 text-[12px] text-[#5a7fa8]">{c.location}</div>
                        <div className="col-span-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => toggleLock(c.id)}
                            className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${
                              c.status === "overdue"
                                ? "text-red-400 border-red-500/25 bg-red-500/8 hover:bg-red-500/15"
                                : "text-green-400 border-green-500/25 bg-green-500/8 hover:bg-green-500/15"
                            }`}
                          >
                            {c.status === "overdue" ? "Lock" : "Unlock"}
                          </button>
                          <button
                            onClick={() => sendReminder(c.name)}
                            className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg border text-blue-400 border-blue-500/25 bg-blue-500/8 hover:bg-blue-500/15 transition-colors"
                          >
                            Remind
                          </button>
                        </div>
                      </motion.div>
                    ))}
                    {filtered.length === 0 && (
                      <div className="px-5 py-12 text-center text-[#5a7fa8] text-[13px]">No customers found.</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════
                ██  TAB: DEVICES
                ══════════════════════════════════════════ */}
            {activeTab === "devices" && (
              <motion.div key="devices" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {customers.map((c) => (
                    <motion.div
                      key={c.id}
                      whileHover={{ y: -2 }}
                      className="bg-[#060d1a] border border-blue-500/10 hover:border-blue-500/25 rounded-2xl p-5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-blue-600/10 border border-blue-500/15 rounded-xl flex items-center justify-center text-blue-400">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-5 h-5">
                            <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
                          </svg>
                        </div>
                        <StatusBadge status={c.status} />
                      </div>
                      <div className="font-black text-[16px] mb-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{c.device}</div>
                      <div className="text-[13px] text-white mb-1">{c.name}</div>
                      <div className="text-[11px] text-[#5a7fa8] mb-4">{c.sim} · {c.location}</div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-[10px] text-[#5a7fa8] mb-1.5">
                          <span>EMI Progress</span>
                          <span>{c.paid}/{c.total} paid</span>
                        </div>
                        <div className="h-1.5 bg-[#0a1525] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(c.paid / c.total) * 100}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full bg-blue-500 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleLock(c.id)}
                          className={`flex-1 text-[11px] font-bold py-2 rounded-lg border transition-colors ${
                            c.status === "overdue"
                              ? "text-red-400 border-red-500/25 bg-red-500/8 hover:bg-red-500/15"
                              : "text-green-400 border-green-500/25 bg-green-500/8 hover:bg-green-500/15"
                          }`}
                        >
                          {c.status === "overdue" ? "🔒 Lock Device" : "🔓 Unlock Device"}
                        </button>
                        <button
                          onClick={() => sendReminder(c.name)}
                          className="px-3 py-2 text-[11px] font-bold rounded-lg border text-blue-400 border-blue-500/25 bg-blue-500/8 hover:bg-blue-500/15 transition-colors"
                        >
                          📩
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════
                ██  TAB: ACTIVITY
                ══════════════════════════════════════════ */}
            {activeTab === "activity" && (
              <motion.div key="activity" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="bg-[#060d1a] border border-blue-500/10 rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-blue-500/10">
                    <span className="font-black text-[14px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>All Activity</span>
                  </div>
                  <div className="divide-y divide-blue-500/8">
                    {ACTIVITY.map((a) => {
                      const colors: Record<string, string> = {
                        lock: "text-red-400 bg-red-500/8 border-red-500/20",
                        unlock: "text-green-400 bg-green-500/8 border-green-500/20",
                        payment: "text-green-400 bg-green-500/8 border-green-500/20",
                        reminder: "text-blue-400 bg-blue-500/8 border-blue-500/20",
                        alert: "text-amber-400 bg-amber-500/8 border-amber-500/20",
                      };
                      const icons: Record<string, string> = {
                        lock: "🔒", unlock: "🔓", payment: "💰", reminder: "📩", alert: "⚠️",
                      };
                      return (
                        <div key={a.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#0a1525] transition-colors">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border ${colors[a.type]}`}>
                            {icons[a.type]}
                          </div>
                          <div className="flex-1">
                            <div className="text-[13px] font-semibold text-white">{a.action}</div>
                            <div className="text-[11px] text-[#5a7fa8]">{a.customer} · {a.device}</div>
                          </div>
                          <div className="text-[11px] text-[#5a7fa8]">{a.time}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ══════════════════════════════════════════════
                ██  TAB: ACTIVATION CODES
                ══════════════════════════════════════════ */}
            {activeTab === "codes" && (
              <motion.div key="codes" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Available Codes", value: "47", color: "text-blue-400" },
                    { label: "Used This Month", value: "23", color: "text-white" },
                    { label: "Total Purchased", value: "150", color: "text-green-400" },
                  ].map((s, i) => (
                    <div key={i} className="bg-[#060d1a] border border-blue-500/10 rounded-2xl p-6">
                      <div className={`font-black text-[48px] leading-none ${s.color} mb-1`} style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        {s.value}
                      </div>
                      <div className="text-[13px] text-[#5a7fa8]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-[#060d1a] border border-blue-500/10 rounded-2xl p-6">
                  <div className="font-black text-[16px] mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Buy More Codes</div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    {[
                      { codes: 25, price: "Rs. 2,500", per: "Rs. 100/code" },
                      { codes: 50, price: "Rs. 4,500", per: "Rs. 90/code", popular: true },
                      { codes: 100, price: "Rs. 8,000", per: "Rs. 80/code" },
                    ].map((plan, i) => (
                      <div
                        key={i}
                        className={`relative border rounded-xl p-4 cursor-pointer transition-all hover:-translate-y-0.5 ${
                          plan.popular
                            ? "border-blue-500/40 bg-blue-600/8"
                            : "border-blue-500/10 bg-[#0a1525] hover:border-blue-500/25"
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                            POPULAR
                          </div>
                        )}
                        <div className="font-black text-[28px] text-white mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{plan.codes}</div>
                        <div className="text-[11px] text-[#5a7fa8] mb-3">activation codes</div>
                        <div className="text-[16px] font-bold text-white mb-0.5">{plan.price}</div>
                        <div className="text-[10px] text-[#5a7fa8]">{plan.per}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => showToast("Payment gateway coming soon!", "info")}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-black text-[14px] px-6 py-3 rounded-xl transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    PURCHASE CODES →
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* ════════════════════════════════════════════════════════
          ██  CUSTOMER DETAIL MODAL
          ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setSelectedCustomer(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[420px] bg-[#060d1a] border border-blue-500/20 rounded-2xl p-6 z-50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="font-black text-[18px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Customer Details
                </div>
                <button onClick={() => setSelectedCustomer(null)} className="text-[#5a7fa8] hover:text-white transition-colors text-xl leading-none">×</button>
              </div>

              <div className="flex items-center gap-3 mb-5 pb-5 border-b border-blue-500/10">
                <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center text-[16px] font-bold text-blue-300">
                  {selectedCustomer.name[0]}
                </div>
                <div>
                  <div className="text-[16px] font-bold text-white">{selectedCustomer.name}</div>
                  <div className="text-[12px] text-[#5a7fa8]">CNIC: {selectedCustomer.cnic}</div>
                </div>
                <StatusBadge status={selectedCustomer.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { l: "Device", v: selectedCustomer.device },
                  { l: "EMI Amount", v: `Rs. ${selectedCustomer.amount.toLocaleString()}` },
                  { l: "Paid", v: `${selectedCustomer.paid}/${selectedCustomer.total} installments` },
                  { l: "SIM", v: selectedCustomer.sim },
                  { l: "Location", v: selectedCustomer.location },
                  { l: "Overdue Days", v: selectedCustomer.overdueDays > 0 ? `${selectedCustomer.overdueDays} days` : "None" },
                ].map((row, i) => (
                  <div key={i} className="bg-[#0a1525] rounded-xl px-3 py-2.5">
                    <div className="text-[10px] text-[#5a7fa8] mb-0.5">{row.l}</div>
                    <div className="text-[13px] font-semibold text-white">{row.v}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { toggleLock(selectedCustomer.id); setSelectedCustomer(null); }}
                  className={`flex-1 font-bold text-[13px] py-3 rounded-xl border transition-colors ${
                    selectedCustomer.status === "overdue"
                      ? "text-red-400 border-red-500/25 bg-red-500/8 hover:bg-red-500/15"
                      : "text-green-400 border-green-500/25 bg-green-500/8 hover:bg-green-500/15"
                  }`}
                >
                  {selectedCustomer.status === "overdue" ? "🔒 Lock Device" : "🔓 Unlock Device"}
                </button>
                <button
                  onClick={() => { sendReminder(selectedCustomer.name); setSelectedCustomer(null); }}
                  className="flex-1 font-bold text-[13px] py-3 rounded-xl border text-blue-400 border-blue-500/25 bg-blue-500/8 hover:bg-blue-500/15 transition-colors"
                >
                  📩 Send Reminder
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════
          ██  TOAST NOTIFICATION
          ════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl text-[13px] font-semibold ${
              toast.type === "success" ? "bg-green-500/10 border-green-500/25 text-green-300" :
              toast.type === "error"   ? "bg-red-500/10 border-red-500/25 text-red-300" :
                                         "bg-blue-500/10 border-blue-500/25 text-blue-300"
            }`}
          >
            <span>{toast.type === "success" ? "✅" : toast.type === "error" ? "🔒" : "ℹ️"}</span>
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}