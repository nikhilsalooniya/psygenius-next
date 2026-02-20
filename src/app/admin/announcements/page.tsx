"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { FormField } from "@/components/FormField";
import type { Subject } from "@/lib/types";

type TargetMode = "all" | "module" | "specific";

export default function AnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<TargetMode>("all");
  const [userIds, setUserIds] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState<number | "">("");
  const [modules, setModules] = useState<Subject[]>([]);
  const [modulesLoading, setModulesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setModulesLoading(true);
    api
      .getSubjects()
      .then((res) => setModules(res.data))
      .catch(() => {})
      .finally(() => setModulesLoading(false));
  }, []);

  const selectedModule = modules.find((m) => m.id === selectedModuleId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    try {
      let targetAudience: "all" | string[];

      if (target === "all") {
        targetAudience = "all";
      } else if (target === "module") {
        if (!selectedModule) throw new Error("Please select a module.");
        const ids = selectedModule.purchasedUsers.map((u) => u.userId);
        if (ids.length === 0) throw new Error("No users have purchased this module yet.");
        targetAudience = ids;
      } else {
        targetAudience = userIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean);
        if (targetAudience.length === 0) throw new Error("Please enter at least one user ID.");
      }

      const res = await api.sendAnnouncement({ title, message, targetAudience });
      setResult({ type: "success", text: `Announcement sent to ${res.sentTo} users.` });
      setTitle("");
      setMessage("");
      setUserIds("");
      setSelectedModuleId("");
    } catch (err) {
      setResult({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to send",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Send Announcement</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Announcement title"
          />

          <FormField
            label="Message"
            as="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Write your announcement..."
          />

          {/* Target audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <div className="flex flex-wrap gap-4">
              {(["all", "module", "specific"] as TargetMode[]).map((mode) => (
                <label key={mode} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="target"
                    checked={target === mode}
                    onChange={() => {
                      setTarget(mode);
                      setResult(null);
                    }}
                    className="accent-primary"
                  />
                  {mode === "all" && "All Users"}
                  {mode === "module" && "By Module"}
                  {mode === "specific" && "Specific User IDs"}
                </label>
              ))}
            </div>
          </div>

          {/* Module picker */}
          {target === "module" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select Module
              </label>
              {modulesLoading ? (
                <p className="text-sm text-gray-400">Loading modules…</p>
              ) : (
                <select
                  value={selectedModuleId}
                  onChange={(e) => setSelectedModuleId(Number(e.target.value) || "")}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">— Choose a module —</option>
                  {modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.subjectName} ({m.purchaseCount} purchaser{m.purchaseCount !== 1 ? "s" : ""})
                    </option>
                  ))}
                </select>
              )}

              {selectedModule && (
                <p className="mt-2 text-xs text-gray-500">
                  {selectedModule.purchasedUsers.length === 0
                    ? "No users have purchased this module yet."
                    : `Will notify ${selectedModule.purchasedUsers.length} user${selectedModule.purchasedUsers.length !== 1 ? "s" : ""} who purchased "${selectedModule.subjectName}".`}
                </p>
              )}
            </div>
          )}

          {/* Manual user IDs */}
          {target === "specific" && (
            <FormField
              label="User IDs (comma-separated UUIDs)"
              value={userIds}
              onChange={(e) => setUserIds(e.target.value)}
              required
              placeholder="uuid-1, uuid-2, uuid-3"
            />
          )}

          {result && (
            <div
              className={`px-4 py-3 rounded-lg text-sm ${
                result.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {result.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
}
