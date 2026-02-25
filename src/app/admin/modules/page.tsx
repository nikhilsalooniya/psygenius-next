"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StatusBadge } from "@/components/StatusBadge";
import { Modal } from "@/components/Modal";
import type { Subject } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.psygenius.mentoragenius.de";

const DEFAULT_POINTS_PLACEHOLDER = [
  "Einmal kaufen, dauerhaft nutzen",
  "Prüfungsnahe Multiple-Choice-Fragen (5 Antwortmöglichkeiten)",
  "Tageschallenge mit 10 adaptiven Fragen",
  "Quizmodus, Tageschallenge & Probeklausuren",
  "KI erkennt deine Lernlücken",
  "Prüfungsnahe Fragen & realistisches Zeitlimit",
  "KI-Erklärungen zu allen Fragen & Begriffen",
].join("\n");

export default function ModulesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toggleTarget, setToggleTarget] = useState<Subject | null>(null);
  const [toggling, setToggling] = useState(false);

  // Display settings modal state
  const [displayTarget, setDisplayTarget] = useState<Subject | null>(null);
  const [displayPrice, setDisplayPrice] = useState("");
  const [displayOriginalPrice, setDisplayOriginalPrice] = useState("");
  const [displayPoints, setDisplayPoints] = useState("");
  const [savingDisplay, setSavingDisplay] = useState(false);
  const [displayError, setDisplayError] = useState("");

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

  function openDisplayModal(subject: Subject) {
    setDisplayTarget(subject);
    setDisplayPrice(subject.displayPrice || "");
    setDisplayOriginalPrice(subject.displayOriginalPrice || "");
    setDisplayPoints(
      subject.displayPoints
        ? (() => { try { return JSON.parse(subject.displayPoints).join("\n"); } catch { return subject.displayPoints ?? ""; } })()
        : ""
    );
    setDisplayError("");
  }

  async function handleSaveDisplay() {
    if (!displayTarget) return;
    setSavingDisplay(true);
    setDisplayError("");
    try {
      const points = displayPoints.trim()
        ? displayPoints.split("\n").map((l) => l.trim()).filter(Boolean)
        : [];
      await api.updateSubjectDisplay(displayTarget.id, {
        displayPrice: displayPrice.trim() || null,
        displayOriginalPrice: displayOriginalPrice.trim() || null,
        displayPoints: points.length ? points : null,
      });
      setDisplayTarget(null);
      fetchSubjects();
    } catch (err) {
      setDisplayError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSavingDisplay(false);
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

              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>
                  {subject.currency}{" "}
                  {subject.price != null ? subject.price : "Free"}
                  {subject.discount > 0 && (
                    <span className="text-green-600 ml-1">-{subject.discount}%</span>
                  )}
                </span>
                <span>{subject.purchaseCount} purchases</span>
              </div>

              {/* Display pricing preview */}
              {(subject.displayPrice || subject.displayOriginalPrice) && (
                <p className="text-xs text-purple-600 mb-2">
                  Landing page:{" "}
                  {subject.displayOriginalPrice && (
                    <span className="line-through text-gray-400 mr-1">{subject.displayOriginalPrice}</span>
                  )}
                  <span className="font-medium">{subject.displayPrice}</span>
                </p>
              )}

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
                  onClick={() => openDisplayModal(subject)}
                  className="flex-1 px-3 py-1.5 border border-purple-200 text-purple-600 rounded-lg text-xs font-medium hover:bg-purple-50 transition-colors"
                >
                  Display
                </button>
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

      {/* Toggle active modal */}
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

      {/* Display settings modal */}
      {displayTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-base font-bold text-gray-900 mb-1">Landing Page Display</h2>
            <p className="text-xs text-gray-500 mb-5">
              {displayTarget.subjectName} — controls how this module appears in the pricing section.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Display Price <span className="text-gray-400">(e.g. €9.99)</span>
                </label>
                <input
                  type="text"
                  value={displayPrice}
                  onChange={(e) => setDisplayPrice(e.target.value)}
                  placeholder="€9.99"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Original Price (crossed out) <span className="text-gray-400">(e.g. €14.99)</span>
                </label>
                <input
                  type="text"
                  value={displayOriginalPrice}
                  onChange={(e) => setDisplayOriginalPrice(e.target.value)}
                  placeholder="€14.99"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Feature Bullet Points{" "}
                  <span className="text-gray-400">(one per line — leave empty to use defaults)</span>
                </label>
                <textarea
                  value={displayPoints}
                  onChange={(e) => setDisplayPoints(e.target.value)}
                  placeholder={DEFAULT_POINTS_PLACEHOLDER}
                  rows={7}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-mono"
                />
              </div>
            </div>

            {displayError && (
              <p className="mt-3 text-xs text-red-600">{displayError}</p>
            )}

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setDisplayTarget(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDisplay}
                disabled={savingDisplay}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {savingDisplay ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
