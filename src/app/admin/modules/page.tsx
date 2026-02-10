"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StatusBadge } from "@/components/StatusBadge";
import { Modal } from "@/components/Modal";
import type { Subject } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.psygenius.mentoragenius.de";

export default function ModulesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toggleTarget, setToggleTarget] = useState<Subject | null>(null);
  const [toggling, setToggling] = useState(false);

  function fetchSubjects() {
    setLoading(true);
    api
      .getSubjects()
      .then((res) => setSubjects(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchSubjects();
  }, []);

  async function handleToggle() {
    if (!toggleTarget) return;
    setToggling(true);
    try {
      await api.deactivateSubject(toggleTarget.id);
      setToggleTarget(null);
      fetchSubjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to toggle");
    } finally {
      setToggling(false);
    }
  }

  if (loading) return <div className="text-gray-500 text-sm">Loading modules...</div>;
  if (error) return <div className="text-red-600 text-sm">Error: {error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Modules</h1>
          <p className="text-sm text-gray-500 mt-1">{subjects.length} modules</p>
        </div>
        <Link
          href="/admin/modules/new"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Add Module
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {subject.coverImage && (
              <img
                src={`${API_BASE}${subject.coverImage}`}
                alt={subject.subjectName}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-sm">{subject.subjectName}</h3>
                <StatusBadge
                  label={subject.active ? "Active" : "Inactive"}
                  variant={subject.active ? "success" : "danger"}
                />
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{subject.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>
                  {subject.currency}{" "}
                  {subject.price != null ? subject.price : "Free"}
                  {subject.discount > 0 && (
                    <span className="text-green-600 ml-1">-{subject.discount}%</span>
                  )}
                </span>
                <span>{subject.purchaseCount} purchases</span>
              </div>

              {subject.author && (
                <p className="text-xs text-gray-400 mb-3">By {subject.author}</p>
              )}

              <div className="flex gap-2">
                <Link
                  href={`/admin/modules/${subject.id}/edit`}
                  className="flex-1 text-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setToggleTarget(subject)}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    subject.active
                      ? "border border-red-200 text-red-600 hover:bg-red-50"
                      : "border border-green-200 text-green-600 hover:bg-green-50"
                  }`}
                >
                  {subject.active ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={!!toggleTarget}
        onClose={() => setToggleTarget(null)}
        onConfirm={handleToggle}
        title={toggleTarget?.active ? "Deactivate Module" : "Activate Module"}
        confirmLabel={toggleTarget?.active ? "Deactivate" : "Activate"}
        loading={toggling}
      >
        Are you sure you want to {toggleTarget?.active ? "deactivate" : "activate"}{" "}
        <strong>{toggleTarget?.subjectName}</strong>?
      </Modal>
    </div>
  );
}
