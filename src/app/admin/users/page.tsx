"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import type { Student } from "@/lib/types";

const columns: Column<Student>[] = [
  {
    key: "id",
    label: "ID",
    render: (s) => <span className="font-mono text-xs text-gray-500">{s.id?.slice(0, 8)}</span>,
  },
  { key: "fullName", label: "Name" },
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  {
    key: "school",
    label: "School",
    render: (s) => s.school || "—",
  },
  {
    key: "disable",
    label: "Status",
    render: (s) => (
      <StatusBadge
        label={s.disable ? "Disabled" : "Active"}
        variant={s.disable ? "danger" : "success"}
      />
    ),
  },
  {
    key: "emailVerify",
    label: "Verified",
    render: (s) => (
      <StatusBadge
        label={s.emailVerify ? "Verified" : "Unverified"}
        variant={s.emailVerify ? "success" : "warning"}
      />
    ),
  },
  {
    key: "createdOn",
    label: "Joined",
    render: (s) =>
      s.createdOn
        ? new Date(s.createdOn).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "—",
  },
];

export default function UsersPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getStudents()
      .then((res) => setStudents(res.students))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.fullName?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.username?.toLowerCase().includes(q) ||
      s.id?.toLowerCase().includes(q)
    );
  });

  if (loading) return <div className="text-gray-500 text-sm">Loading students...</div>;
  if (error) return <div className="text-red-600 text-sm">Error: {error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Students</h1>
          <p className="text-sm text-gray-500 mt-1">{students.length} total</p>
        </div>
        <input
          type="text"
          placeholder="Search by name, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <DataTable
          columns={columns}
          data={filtered}
          keyField="id"
          onRowClick={(s) => router.push(`/admin/users/${s.id}`)}
        />
      </div>
    </div>
  );
}
