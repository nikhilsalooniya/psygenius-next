"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { StatusBadge } from "@/components/StatusBadge";
import type { Ticket } from "@/lib/types";

const STATUS_OPTIONS: Ticket["status"][] = ["open", "in_progress", "closed"];

const statusVariant: Record<Ticket["status"], "warning" | "neutral" | "success"> = {
  open: "warning",
  in_progress: "neutral",
  closed: "success",
};

const statusLabel: Record<Ticket["status"], string> = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
};

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Ticket["status"] | "all">("all");
  const [updating, setUpdating] = useState<number | null>(null);

  useEffect(() => {
    api
      .getTickets()
      .then((res) => setTickets(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleStatusChange(ticket: Ticket, newStatus: Ticket["status"]) {
    if (newStatus === ticket.status) return;
    setUpdating(ticket.id);
    try {
      const res = await api.updateTicketStatus(ticket.id, newStatus);
      setTickets((prev) => prev.map((t) => (t.id === ticket.id ? res.data : t)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdating(null);
    }
  }

  const filtered = tickets.filter((t) => {
    const matchesStatus = filterStatus === "all" || t.status === filterStatus;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      t.message.toLowerCase().includes(q) ||
      t.userId?.toLowerCase().includes(q) ||
      String(t.id).includes(q);
    return matchesStatus && matchesSearch;
  });

  const counts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    in_progress: tickets.filter((t) => t.status === "in_progress").length,
    closed: tickets.filter((t) => t.status === "closed").length,
  };

  if (loading) return <div className="text-gray-500 text-sm">Loading tickets...</div>;
  if (error) return <div className="text-red-600 text-sm">Error: {error}</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-sm text-gray-500 mt-1">{tickets.length} total</p>
        </div>
        <input
          type="text"
          placeholder="Search by message or user ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "open", "in_progress", "closed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filterStatus === s
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
            }`}
          >
            {s === "all" ? "All" : statusLabel[s]}{" "}
            <span className="opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                ID
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                User ID
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Message
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Status
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Created
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Change Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-gray-400">
                  No tickets found.
                </td>
              </tr>
            ) : (
              filtered.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono text-gray-500">#{ticket.id}</td>
                  <td className="px-5 py-4 text-sm text-gray-500 font-mono">
                    {ticket.userId ? ticket.userId.slice(0, 8) + "…" : "—"}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-800 max-w-sm">
                    <p className="line-clamp-2">{ticket.message}</p>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge
                      label={statusLabel[ticket.status]}
                      variant={statusVariant[ticket.status]}
                    />
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(ticket.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={ticket.status}
                      disabled={updating === ticket.id}
                      onChange={(e) =>
                        handleStatusChange(ticket, e.target.value as Ticket["status"])
                      }
                      className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {statusLabel[s]}
                        </option>
                      ))}
                    </select>
                    {updating === ticket.id && (
                      <span className="ml-2 text-xs text-gray-400">Saving…</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
