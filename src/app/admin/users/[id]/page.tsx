"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { StatusBadge } from "@/components/StatusBadge";
import type { StudentDetailResponse, Payment, Subject } from "@/lib/types";

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<StudentDetailResponse | null>(null);
  const [userPayments, setUserPayments] = useState<Payment[]>([]);
  const [subjectMap, setSubjectMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    Promise.all([
      api.getStudent(id),
      api.getPayments(),
      api.getSubjects(),
    ])
      .then(([studentRes, paymentsRes, subjectsRes]) => {
        setData(studentRes);
        setUserPayments(
          paymentsRes.students.filter((p) => p.userId === id)
        );
        const map: Record<number, string> = {};
        subjectsRes.data.forEach((s: Subject) => {
          map[s.id] = s.subjectName;
        });
        setSubjectMap(map);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-gray-500 text-sm">Loading student...</div>;
  if (error) return <div className="text-red-600 text-sm">Error: {error}</div>;
  if (!data) return <div className="text-gray-500 text-sm">Student not found</div>;

  const { student, scoreDetails, books, totalBooks, leaderboard, weakTopics } = data.data;

  return (
    <div>
      <Link
        href="/admin/users"
        className="text-sm text-primary hover:underline mb-4 inline-block"
      >
        &larr; Back to Students
      </Link>

      {/* Student Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h1 className="text-xl font-bold text-gray-900 mb-4">{student.fullName}</h1>

        {/* User ID with copy button */}
        <div className="flex items-center gap-2 mb-4 p-2.5 bg-gray-50 rounded-lg border border-gray-200 w-fit">
          <span className="text-xs text-gray-500 font-medium">User ID:</span>
          <span className="font-mono text-xs text-gray-800">{id}</span>
          <button
            onClick={copyId}
            className="ml-1 px-2 py-0.5 text-xs rounded border border-gray-300 bg-white hover:bg-gray-100 text-gray-600 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Email:</span>{" "}
            <span className="text-gray-900">{student.email}</span>
          </div>
          <div>
            <span className="text-gray-500">Username:</span>{" "}
            <span className="text-gray-900">{student.username}</span>
          </div>
          <div>
            <span className="text-gray-500">School:</span>{" "}
            <span className="text-gray-900">{student.school || "—"}</span>
          </div>
          <div>
            <span className="text-gray-500">Course:</span>{" "}
            <span className="text-gray-900">{student.courseName || "—"}</span>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>{" "}
            <StatusBadge
              label={student.disable ? "Disabled" : "Active"}
              variant={student.disable ? "danger" : "success"}
            />
          </div>
          <div>
            <span className="text-gray-500">Verified:</span>{" "}
            <StatusBadge
              label={student.emailVerify ? "Yes" : "No"}
              variant={student.emailVerify ? "success" : "warning"}
            />
          </div>
          <div>
            <span className="text-gray-500">Joined:</span>{" "}
            <span className="text-gray-900">
              {student.createdOn
                ? new Date(student.createdOn).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "—"}
            </span>
          </div>
        </div>
      </div>

      {/* Score Overview + Leaderboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Score Overview</h2>
          {scoreDetails ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Progress</span>
                <span className="font-medium">{scoreDetails.progress?.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Correct</span>
                <span className="font-medium text-green-600">{scoreDetails.correct}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Incorrect</span>
                <span className="font-medium text-red-600">{scoreDetails.incorrect}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Streak</span>
                <span className="font-medium">{scoreDetails.streak} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <StatusBadge
                  label={scoreDetails.status}
                  variant={
                    scoreDetails.status === "improving"
                      ? "success"
                      : scoreDetails.status === "declining"
                      ? "danger"
                      : "neutral"
                  }
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No score data</p>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Leaderboard</h2>
          {leaderboard?.self ? (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Rank</span>
                <span className="font-medium">
                  #{leaderboard.self.rank} of {leaderboard.self.totalUsers}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Percentage</span>
                <span className="font-medium">{leaderboard.self.percentage?.toFixed(1)}%</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No leaderboard data</p>
          )}
        </div>
      </div>

      {/* Purchased Books */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Purchased Books ({totalBooks})
        </h2>
        {books && books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {books.map((book) => (
              <div
                key={book.id}
                className="border border-gray-100 rounded-lg p-3 text-sm"
              >
                <p className="font-medium text-gray-900">{book.subjectName}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {book.currency} {book.price} &middot; {book.discount}% off
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No books purchased</p>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Payment History ({userPayments.length})
        </h2>
        {userPayments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3 font-medium text-gray-500 text-xs uppercase">Order ID</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-500 text-xs uppercase">Module</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-500 text-xs uppercase">Amount</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-500 text-xs uppercase">Status</th>
                  <th className="text-left py-2 px-3 font-medium text-gray-500 text-xs uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {userPayments.map((p) => {
                  const amt = p.currency === "INR" ? p.amount / 100 : p.amount;
                  const symbol = p.currency === "INR" ? "\u20B9" : p.currency === "EUR" ? "\u20AC" : "$";
                  return (
                    <tr key={p.razorpay_order_id} className="border-b border-gray-100">
                      <td className="py-2 px-3 font-mono text-xs text-gray-600">{p.razorpay_order_id}</td>
                      <td className="py-2 px-3 text-gray-700">{subjectMap[p.SubjectId] || `Subject #${p.SubjectId}`}</td>
                      <td className="py-2 px-3 text-gray-700">{symbol}{amt.toFixed(2)}</td>
                      <td className="py-2 px-3">
                        <StatusBadge
                          label={p.paymentstatus}
                          variant={p.paymentstatus === "Paid" ? "success" : p.paymentstatus === "Pending" ? "warning" : "danger"}
                        />
                      </td>
                      <td className="py-2 px-3 text-gray-500 text-xs">
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No payment history</p>
        )}
      </div>

      {/* Weak Topics */}
      {weakTopics && weakTopics.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Weak Topics</h2>
          <div className="flex flex-wrap gap-2">
            {weakTopics.map((topic, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tickets */}
      {data.tickets && data.tickets.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Support Tickets</h2>
          <div className="space-y-3">
            {data.tickets.map((ticket) => (
              <div key={ticket.id} className="border border-gray-100 rounded-lg p-3 text-sm">
                <div className="flex items-center justify-between mb-1">
                  <StatusBadge
                    label={ticket.status}
                    variant={
                      ticket.status === "open"
                        ? "warning"
                        : ticket.status === "in_progress"
                        ? "neutral"
                        : "success"
                    }
                  />
                  <span className="text-gray-400 text-xs">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{ticket.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      {data.FeedBack && data.FeedBack.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Feedback</h2>
          <div className="space-y-3">
            {data.FeedBack.map((fb) => (
              <div key={fb.id} className="border border-gray-100 rounded-lg p-3 text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-yellow-500 text-xs">
                    {"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{fb.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
