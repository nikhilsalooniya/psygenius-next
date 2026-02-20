"use client";

import { useState, useRef } from "react";
import { api } from "@/lib/api";
import type { SubjectTopic } from "@/lib/types";
import { Modal } from "@/components/Modal";

type Step = 1 | 2 | 3 | 4;

// ─── Step indicator ────────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: "Module Info" },
    { n: 2, label: "Topics" },
    { n: 3, label: "Mock PDFs" },
    { n: 4, label: "Generate" },
  ];
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              current === s.n
                ? "bg-primary text-white"
                : current > s.n
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {current > s.n ? "✓" : s.n}
          </div>
          <span className={`text-sm font-medium ${current >= s.n ? "text-gray-900" : "text-gray-400"}`}>
            {s.label}
          </span>
          {i < steps.length - 1 && <div className="w-8 h-0.5 bg-gray-200 mx-1" />}
        </div>
      ))}
    </div>
  );
}

// ─── Step 1 ────────────────────────────────────────────────────────────────────
function Step1({
  onCreated,
}: {
  onCreated: (subjectId: number) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    setLoading(true);
    try {
      const res = await api.createV2Subject(fd);
      onCreated(res.data.id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create module");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h2 className="text-xl font-bold text-gray-900">Step 1 — Module Info</h2>
      {error && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Module Name *</label>
        <input name="subjectName" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
        <textarea name="description" required rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
        <input name="author" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input name="price" type="number" step="0.01" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
          <input name="discount" type="number" step="0.01" min="0" max="100" defaultValue="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
        <select name="currency" defaultValue="EUR" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
        <input ref={fileRef} name="coverImage" type="file" accept="image/*" className="w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-light file:text-primary" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Creating…" : "Create Module & Continue →"}
      </button>
    </form>
  );
}

// ─── Step 2 ────────────────────────────────────────────────────────────────────
function Step2({
  subjectId,
  topics,
  setTopics,
  onNext,
}: {
  subjectId: number;
  topics: SubjectTopic[];
  setTopics: (t: SubjectTopic[]) => void;
  onNext: () => void;
}) {
  const [newTopicName, setNewTopicName] = useState("");
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SubjectTopic | null>(null);
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({});

  async function handleAddTopic() {
    if (!newTopicName.trim()) return;
    setAdding(true);
    setError(null);
    try {
      const res = await api.addTopic(subjectId, { name: newTopicName.trim(), order: topics.length });
      setTopics([...topics, res.data]);
      setNewTopicName("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add topic");
    } finally {
      setAdding(false);
    }
  }

  async function handleUploadPDF(topic: SubjectTopic, file: File) {
    setUploadingId(topic.id);
    try {
      const fd = new FormData();
      fd.append("pdfFile", file);
      fd.append("subjectId", subjectId.toString());
      const res = await api.uploadTopicPDF(subjectId, topic.id, fd);
      setTopics(topics.map((t) => (t.id === topic.id ? { ...t, ...res.data, pdfUploaded: true } : t)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingId(null);
    }
  }

  async function handleDelete(topic: SubjectTopic) {
    try {
      await api.deleteTopic(subjectId, topic.id);
      setTopics(topics.filter((t) => t.id !== topic.id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeleteTarget(null);
    }
  }

  async function moveOrder(topic: SubjectTopic, dir: -1 | 1) {
    const newOrder = topic.order + dir;
    try {
      await api.updateTopic(subjectId, topic.id, { order: newOrder });
      const updated = topics.map((t) => (t.id === topic.id ? { ...t, order: newOrder } : t));
      setTopics([...updated].sort((a, b) => a.order - b.order));
    } catch {
      // ignore
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Step 2 — Topics</h2>
      <p className="text-sm text-gray-500 mb-6">Add each topic and upload its dedicated PDF. Each topic uses only its own PDF for AI answers and quiz generation.</p>

      {error && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>}

      {/* Add topic input */}
      <div className="flex gap-2 mb-6">
        <input
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
          placeholder="Topic name, e.g. Kognition und Wahrnehmung"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleAddTopic}
          disabled={adding || !newTopicName.trim()}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          {adding ? "Adding…" : "+ Add Topic"}
        </button>
      </div>

      {/* Topics list */}
      <div className="space-y-3">
        {topics.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">No topics yet. Add your first topic above.</div>
        )}
        {topics.map((topic, idx) => (
          <div key={topic.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
            {/* Order buttons */}
            <div className="flex flex-col gap-0.5">
              <button onClick={() => moveOrder(topic, -1)} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs leading-none">▲</button>
              <button onClick={() => moveOrder(topic, 1)} disabled={idx === topics.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30 text-xs leading-none">▼</button>
            </div>

            {/* Topic name */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{topic.name}</p>
              <div className="flex gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${topic.pdfUploaded ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {topic.pdfUploaded ? "PDF Uploaded" : "No PDF"}
                </span>
              </div>
            </div>

            {/* Upload PDF button */}
            <div>
              <input
                type="file"
                accept=".pdf"
                ref={(el) => { fileRefs.current[topic.id] = el; }}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadPDF(topic, file);
                }}
              />
              <button
                onClick={() => fileRefs.current[topic.id]?.click()}
                disabled={uploadingId === topic.id}
                className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium disabled:opacity-50"
              >
                {uploadingId === topic.id ? "Uploading…" : topic.pdfUploaded ? "Replace PDF" : "Upload PDF"}
              </button>
            </div>

            {/* Delete */}
            <button
              onClick={() => setDeleteTarget(topic)}
              className="text-red-400 hover:text-red-600 text-sm ml-1"
              title="Remove topic"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-8">
        <button
          onClick={onNext}
          disabled={topics.length === 0}
          className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          Continue to Mock PDFs →
        </button>
        <p className="text-xs text-gray-400 self-center">You can upload PDFs later too. Topics without PDFs will skip question generation.</p>
      </div>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        title="Remove Topic"
        confirmLabel="Remove"
      >
        <p className="text-sm text-gray-600">
          Remove topic <strong>{deleteTarget?.name}</strong>? This will deactivate it (questions already generated are not deleted).
        </p>
      </Modal>
    </div>
  );
}

// ─── Step 3 ────────────────────────────────────────────────────────────────────
function Step3({
  subjectId,
  onNext,
}: {
  subjectId: number;
  onNext: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload() {
    if (!files.length) { onNext(); return; }
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("subjectId", subjectId.toString());
      files.forEach((f) => fd.append("pdfFile", f));
      await api.uploadMockPDFs(subjectId, fd);
      setUploaded(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="max-w-lg">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Step 3 — Mock Test PDFs</h2>
      <p className="text-sm text-gray-500 mb-6">
        Upload PDFs specifically for mock test questions. These are separate from topic PDFs — questions from these files will only appear in mock tests, not daily or selective quizzes.
      </p>

      {error && <p className="text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg mb-4">{error}</p>}
      {uploaded && <p className="text-green-700 text-sm bg-green-50 px-3 py-2 rounded-lg mb-4">Mock test PDFs uploaded successfully!</p>}

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center mb-4">
        <input
          type="file"
          multiple
          accept=".pdf"
          id="mock-pdf-input"
          className="hidden"
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />
        <label htmlFor="mock-pdf-input" className="cursor-pointer">
          <div className="text-3xl mb-2">📄</div>
          <p className="text-sm font-medium text-gray-700">Click to select mock test PDFs</p>
          <p className="text-xs text-gray-400 mt-1">Multiple files supported</p>
        </label>
      </div>

      {files.length > 0 && (
        <ul className="text-sm text-gray-600 space-y-1 mb-4">
          {files.map((f) => (
            <li key={f.name} className="flex items-center gap-2">
              <span className="text-green-500">✓</span> {f.name}
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : files.length ? "Upload & Continue →" : "Skip (no mock PDFs) →"}
        </button>
      </div>
    </div>
  );
}

// ─── Step 4 ────────────────────────────────────────────────────────────────────
function Step4({
  subjectId,
  initialTopics,
}: {
  subjectId: number;
  initialTopics: SubjectTopic[];
}) {
  const [topics, setTopics] = useState<SubjectTopic[]>(initialTopics);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [mockLoading, setMockLoading] = useState(false);
  const [messages, setMessages] = useState<Record<string, string>>({});

  async function refreshTopics() {
    try {
      const res = await api.getTopics(subjectId);
      setTopics(res.data);
    } catch {
      // ignore
    }
  }

  async function runJob(key: string, fn: () => Promise<{ message: string }>) {
    setLoadingMap((p) => ({ ...p, [key]: true }));
    try {
      const res = await fn();
      setMessages((p) => ({ ...p, [key]: res.message }));
      await refreshTopics();
    } catch (err: unknown) {
      setMessages((p) => ({ ...p, [key]: `Error: ${err instanceof Error ? err.message : "Unknown"}` }));
    } finally {
      setLoadingMap((p) => ({ ...p, [key]: false }));
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Step 4 — Generate Questions & Embeddings</h2>
      <p className="text-sm text-gray-500 mb-6">
        For each topic, generate questions from its PDF and create vector embeddings for AI chat. This may take a few minutes per topic.
      </p>

      <div className="space-y-3 mb-8">
        {topics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-900">{topic.name}</p>
              <div className="flex gap-2 text-xs">
                <span className={`px-2 py-0.5 rounded-full font-medium ${topic.pdfUploaded ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                  {topic.pdfUploaded ? "PDF ✓" : "No PDF"}
                </span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${topic.questionsGenerated > 0 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-400"}`}>
                  {topic.questionsGenerated} Qs
                </span>
                <span className={`px-2 py-0.5 rounded-full font-medium ${topic.embeddingsGenerated > 0 ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-400"}`}>
                  {topic.embeddingsGenerated} Vecs
                </span>
              </div>
            </div>

            {!topic.pdfUploaded ? (
              <p className="text-xs text-amber-600">⚠ Upload a PDF in Step 2 before generating.</p>
            ) : (
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => runJob(`q-${topic.id}`, () => api.generateTopicQuestions(topic.id))}
                  disabled={loadingMap[`q-${topic.id}`]}
                  className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-medium disabled:opacity-50"
                >
                  {loadingMap[`q-${topic.id}`] ? "Generating…" : "Generate Questions"}
                </button>
                <button
                  onClick={() => runJob(`v-${topic.id}`, () => api.generateTopicVectors(topic.id))}
                  disabled={loadingMap[`v-${topic.id}`]}
                  className="text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-lg font-medium disabled:opacity-50"
                >
                  {loadingMap[`v-${topic.id}`] ? "Generating…" : "Generate Embeddings"}
                </button>
              </div>
            )}

            {(messages[`q-${topic.id}`] || messages[`v-${topic.id}`]) && (
              <div className="mt-2 space-y-0.5">
                {messages[`q-${topic.id}`] && <p className="text-xs text-gray-500">{messages[`q-${topic.id}`]}</p>}
                {messages[`v-${topic.id}`] && <p className="text-xs text-gray-500">{messages[`v-${topic.id}`]}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mock questions */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Mock Test Questions</p>
            <p className="text-xs text-gray-500 mt-0.5">Generate questions from mock test PDFs (uploaded in Step 3)</p>
          </div>
          <button
            onClick={async () => {
              setMockLoading(true);
              try {
                const res = await api.generateMockQuestions(subjectId);
                setMessages((p) => ({ ...p, mock: res.message }));
              } catch (err: unknown) {
                setMessages((p) => ({ ...p, mock: `Error: ${err instanceof Error ? err.message : "Unknown"}` }));
              } finally {
                setMockLoading(false);
              }
            }}
            disabled={mockLoading}
            className="text-xs bg-amber-50 text-amber-700 hover:bg-amber-100 px-3 py-1.5 rounded-lg font-medium disabled:opacity-50"
          >
            {mockLoading ? "Generating…" : "Generate Mock Questions"}
          </button>
        </div>
        {messages.mock && <p className="text-xs text-gray-500 mt-2">{messages.mock}</p>}
      </div>

      <div className="mt-8 p-4 bg-green-50 rounded-xl">
        <p className="text-sm font-semibold text-green-800">Module setup complete!</p>
        <p className="text-xs text-green-700 mt-1">
          Students can now access topic-aware AI chat, practice quizzes, and mock tests. Topics and questions are visible in the app immediately.
        </p>
      </div>
    </div>
  );
}

// ─── Main wizard ───────────────────────────────────────────────────────────────
export default function MasterModulePage() {
  const [step, setStep] = useState<Step>(1);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [topics, setTopics] = useState<SubjectTopic[]>([]);

  function handleModuleCreated(id: number) {
    setSubjectId(id);
    setStep(2);
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create v2 Module</h1>
        <p className="text-sm text-gray-500 mt-1">
          Build a structured module with fixed topics, per-topic PDFs, and separate mock test content.
        </p>
      </div>

      <StepIndicator current={step} />

      {step === 1 && <Step1 onCreated={handleModuleCreated} />}

      {step === 2 && subjectId !== null && (
        <Step2
          subjectId={subjectId}
          topics={topics}
          setTopics={setTopics}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && subjectId !== null && (
        <Step3 subjectId={subjectId} onNext={() => setStep(4)} />
      )}

      {step === 4 && subjectId !== null && (
        <Step4 subjectId={subjectId} initialTopics={topics} />
      )}
    </div>
  );
}
