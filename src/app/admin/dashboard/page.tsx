"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { DashboardStats } from "@/lib/types";

interface StatCardProps {
  title: string;
  today: number | string;
  monthly: number | string;
  total?: number | string;
  color: string;
  icon: string;
}

function StatCard({ title, today, monthly, total, color, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <span className={`text-2xl`}>{icon}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Heute</p>
          <p className={`text-xl font-bold ${color}`}>{today}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Diesen Monat</p>
          <p className={`text-xl font-bold ${color}`}>{monthly}</p>
        </div>
      </div>

      {total !== undefined && (
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Gesamt</span>
          <span className={`text-sm font-semibold ${color}`}>{total}</span>
        </div>
      )}
    </div>
  );
}

function SingleStatCard({
  title,
  value,
  color,
  icon,
  subtitle,
}: {
  title: string;
  value: number | string;
  color: string;
  icon: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
      <div className={`text-3xl`}>{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{title}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function formatRevenue(amount: number): string {
  if (amount >= 1000) return `€${(amount / 1000).toFixed(1)}k`;
  return `€${amount.toFixed(2)}`;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getStats();
      setStats(res.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const now = new Date();
  const monthName = now.toLocaleString("de-DE", { month: "long" });
  const today = now.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">{today}</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-purple-50 transition-colors disabled:opacity-50"
        >
          <svg
            className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {loading ? "Laden..." : "Aktualisieren"}
        </button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      {loading && !stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 h-36 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-2/3 mb-4" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 bg-gray-100 rounded-lg" />
                <div className="h-12 bg-gray-100 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="space-y-6">
          {/* Top row — totals */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <SingleStatCard title="Nutzer gesamt" value={stats.totalUsers} color="text-primary" icon="👥" />
            <SingleStatCard title="Zahlungen gesamt" value={stats.totalPayments} color="text-green-600" icon="💳" />
            <SingleStatCard title="Gesamtumsatz" value={formatRevenue(stats.totalRevenue)} color="text-emerald-600" icon="💰" />
            <SingleStatCard title="Offene Tickets" value={stats.openTickets} color={stats.openTickets > 0 ? "text-amber-600" : "text-gray-500"} icon="🎫" subtitle="Support-Anfragen" />
          </div>

          {/* Analytics — webpage visits + app signups */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard
                title="Webseitenbesuche"
                today={stats.pageViewsToday ?? 0}
                monthly={stats.pageViewsThisMonth ?? 0}
                color="text-indigo-600"
                icon="🌐"
              />
              <StatCard
                title="App-Anmeldungen"
                today={stats.newUsersToday}
                monthly={stats.newUsersThisMonth}
                total={`${stats.totalUsers} gesamt`}
                color="text-primary"
                icon="📲"
              />
            </div>
          </div>

          {/* Daily / Monthly cards */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Heute vs. {monthName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Neue Nutzer"
                today={stats.newUsersToday}
                monthly={stats.newUsersThisMonth}
                color="text-primary"
                icon="🆕"
              />
              <StatCard
                title="Aktive Nutzer"
                today={stats.activeUsersToday}
                monthly={stats.activeUsersThisMonth}
                color="text-blue-600"
                icon="📱"
              />
              <StatCard
                title="Quiz-Versuche"
                today={stats.submissionsToday}
                monthly={stats.submissionsThisMonth}
                color="text-violet-600"
                icon="📝"
              />
              <StatCard
                title="Zahlungen"
                today={stats.paymentsToday}
                monthly={stats.paymentsThisMonth}
                total={formatRevenue(stats.revenueThisMonth) + " diesen Monat"}
                color="text-green-600"
                icon="💳"
              />
            </div>
          </div>

          {/* Revenue breakdown */}
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Umsatz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <SingleStatCard title="Heute" value={formatRevenue(stats.revenueToday)} color="text-emerald-600" icon="📈" />
              <SingleStatCard title={monthName} value={formatRevenue(stats.revenueThisMonth)} color="text-emerald-600" icon="📅" />
              <SingleStatCard title="Gesamt" value={formatRevenue(stats.totalRevenue)} color="text-emerald-700" icon="💰" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
