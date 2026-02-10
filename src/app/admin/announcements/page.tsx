"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { FormField } from "@/components/FormField";

export default function AnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<"all" | "specific">("all");
  const [userIds, setUserIds] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    try {
      const targetAudience =
        target === "all"
          ? ("all" as const)
          : userIds
              .split(",")
              .map((id) => id.trim())
              .filter(Boolean);

      const res = await api.sendAnnouncement({ title, message, targetAudience });
      setResult({ type: "success", text: `Announcement sent to ${res.sentTo} users` });
      setTitle("");
      setMessage("");
      setUserIds("");
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
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Audience
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="target"
                  checked={target === "all"}
                  onChange={() => setTarget("all")}
                  className="accent-primary"
                />
                All Users
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="target"
                  checked={target === "specific"}
                  onChange={() => setTarget("specific")}
                  className="accent-primary"
                />
                Specific Users
              </label>
            </div>
          </div>

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
            {loading ? "Sending..." : "Send Announcement"}
          </button>
        </form>
      </div>
    </div>
  );
}
