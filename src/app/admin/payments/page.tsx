"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import type { Payment } from "@/lib/types";

const statusFilters = ["All", "Paid", "Pending", "Failed"] as const;

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [userMap, setUserMap] = useState<Record<string, string>>({});
  const [subjectMap, setSubjectMap] = useState<Record<number, string>>({});
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.getPayments(), api.getStudents(), api.getSubjects()])
      .then(([paymentsRes, studentsRes, subjectsRes]) => {
        setPayments(paymentsRes.students);

        const uMap: Record<string, string> = {};
        studentsRes.students.forEach((s) => {
          uMap[s.id] = s.fullName;
        });
        setUserMap(uMap);

        const sMap: Record<number, string> = {};
        subjectsRes.data.forEach((s) => {
          sMap[s.id] = s.subjectName;
        });
        setSubjectMap(sMap);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const columns: Column<Payment>[] = [
    {
      key: "razorpay_order_id",
      label: "Order ID",
      render: (p) => (
        <span className="font-mono text-xs">{p.razorpay_order_id}</span>
      ),
    },
    {
      key: "userId",
      label: "User",
      render: (p) => {
        const name = userMap[p.userId];
        return name ? (
          <Link
            href={`/admin/users/${p.userId}`}
            className="text-primary hover:underline font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            {name}
          </Link>
        ) : (
          <span className="font-mono text-xs text-gray-500">{p.userId?.slice(0, 8)}...</span>
        );
      },
    },
    {
      key: "SubjectId",
      label: "Module",
      render: (p) => (
        <span className="text-gray-700">
          {subjectMap[p.SubjectId] || `#${p.SubjectId}`}
        </span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (p) => {
        const amt = p.currency === "INR" ? p.amount / 100 : p.amount;
        const symbol = p.currency === "INR" ? "\u20B9" : p.currency === "EUR" ? "\u20AC" : "$";
        return `${symbol}${amt.toFixed(2)}`;
      },
    },
    { key: "currency", label: "Currency" },
    {
      key: "paymentstatus",
      label: "Status",
      render: (p) => (
        <StatusBadge
          label={p.paymentstatus}
          variant={
            p.paymentstatus === "Paid"
              ? "success"
              : p.paymentstatus === "Pending"
              ? "warning"
              : "danger"
          }
        />
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (p) =>
        p.createdAt
          ? new Date(p.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",
    },
  ];

  const filtered = payments.filter((p) => {
    if (filter !== "All" && p.paymentstatus !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      const userName = (userMap[p.userId] || "").toLowerCase();
      const moduleName = (subjectMap[p.SubjectId] || "").toLowerCase();
      return (
        userName.includes(q) ||
        moduleName.includes(q) ||
        p.razorpay_order_id?.toLowerCase().includes(q) ||
        p.userId?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  if (loading) return <div className="text-gray-500 text-sm">Loading payments...</div>;
  if (error) return <div className="text-red-600 text-sm">Error: {error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500 mt-1">{payments.length} total transactions</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search user, module, order..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {statusFilters.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <DataTable
          columns={columns}
          data={filtered}
          keyField="razorpay_order_id"
        />
      </div>
    </div>
  );
}
