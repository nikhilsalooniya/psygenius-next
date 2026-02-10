"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { FormField } from "@/components/FormField";

export default function NewModulePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      await api.createSubject(formData);
      router.push("/admin/modules");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create module");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Link
        href="/admin/modules"
        className="text-sm text-primary hover:underline mb-4 inline-block"
      >
        &larr; Back to Modules
      </Link>

      <h1 className="text-xl font-bold text-gray-900 mb-6">Create Module</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Subject Name"
            name="subjectName"
            required
            placeholder="e.g., Statistik"
          />

          <FormField
            label="Description"
            as="textarea"
            name="description"
            required
            placeholder="Module description..."
          />

          <FormField
            label="Author"
            name="author"
            placeholder="Author name (optional)"
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="14.99"
            />

            <FormField
              label="Discount (%)"
              name="discount"
              type="number"
              min="0"
              max="100"
              defaultValue="0"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              name="currency"
              defaultValue="EUR"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
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
              defaultChecked
              className="accent-primary"
            />
            Active
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Module"}
          </button>
        </form>
      </div>
    </div>
  );
}
