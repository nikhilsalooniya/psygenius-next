"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { FormField } from "@/components/FormField";
import type { Subject } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.psygenius.mentoragenius.de";

export default function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getSubjects()
      .then((res) => {
        const found = res.data.find((s) => s.id === Number(id));
        if (found) setSubject(found);
        else setError("Module not found");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      await api.updateSubject(Number(id), formData);
      router.push("/admin/modules");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update module");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="text-gray-500 text-sm">Loading module...</div>;
  if (error && !subject) return <div className="text-red-600 text-sm">Error: {error}</div>;
  if (!subject) return <div className="text-gray-500 text-sm">Module not found</div>;

  return (
    <div>
      <Link
        href="/admin/modules"
        className="text-sm text-primary hover:underline mb-4 inline-block"
      >
        &larr; Back to Modules
      </Link>

      <h1 className="text-xl font-bold text-gray-900 mb-6">Edit: {subject.subjectName}</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        {subject.coverImage && (
          <img
            src={`${API_BASE}${subject.coverImage}`}
            alt={subject.subjectName}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Subject Name"
            name="subjectName"
            required
            defaultValue={subject.subjectName}
          />

          <FormField
            label="Description"
            as="textarea"
            name="description"
            required
            defaultValue={subject.description}
          />

          <FormField
            label="Author"
            name="author"
            defaultValue={subject.author || ""}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={subject.price ?? ""}
            />

            <FormField
              label="Discount (%)"
              name="discount"
              type="number"
              min="0"
              max="100"
              defaultValue={subject.discount}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              name="currency"
              defaultValue={subject.currency}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image (leave empty to keep current)
            </label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-light file:text-primary hover:file:opacity-80"
            />
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="active"
              value="true"
              defaultChecked={subject.active}
              className="accent-primary"
            />
            Active
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
