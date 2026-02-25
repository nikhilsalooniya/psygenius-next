import { getAccessToken, clearTokens } from "./auth";
import type {
  LoginResponse,
  Student,
  StudentDetailResponse,
  Payment,
  Subject,
  AnnouncementRequest,
  AnnouncementResponse,
  Ticket,
  SubjectTopic,
  CreateTopicRequest,
  GenerateJobResponse,
  DashboardStats,
} from "./types";

const API_BASE = "https://api.psygenius.mentoragenius.de";

async function fetchApi<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers as Record<string, string> | undefined),
    },
  });

  if (res.status === 401) {
    clearTokens();
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${res.status}`);
  }

  return res.json();
}

async function fetchApiMultipart<T>(path: string, formData: FormData, method = "POST"): Promise<T> {
  const token = getAccessToken();

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    body: formData,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (res.status === 401) {
    clearTokens();
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${res.status}`);
  }

  return res.json();
}

export const api = {
  login: (email: string, password: string) =>
    fetchApi<LoginResponse>("/admin/signin", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        deviceInfo: { deviceId: "web-dashboard", deviceName: "Browser" },
      }),
    }),

  getStats: () =>
    fetchApi<{ success: boolean; data: DashboardStats }>("/admin/v1/stats"),

  getStudents: () =>
    fetchApi<{ success: boolean; students: Student[] }>("/admin/v1/students"),

  getStudent: (id: string) =>
    fetchApi<StudentDetailResponse>(`/admin/v1/student/${id}`),

  getPayments: () =>
    fetchApi<{ success: boolean; students: Payment[] }>("/admin/v1/payment"),

  getSubjects: () =>
    fetchApi<{ success: boolean; data: Subject[] }>("/admin/v1/subjects"),

  createSubject: (formData: FormData) =>
    fetchApiMultipart<{ success: boolean; data: Subject }>("/admin/subject", formData),

  updateSubject: (id: number, formData: FormData) =>
    fetchApiMultipart<{ success: boolean; data: Subject }>(`/admin/subject/${id}`, formData, "PUT"),

  deactivateSubject: (id: number) =>
    fetchApi<{ success: boolean; data: { id: number; subjectName: string; active: boolean } }>(
      `/admin/v1/subject/${id}`,
      { method: "DELETE" }
    ),

  updateSubjectDisplay: (id: number, data: { displayPrice?: string | null; displayOriginalPrice?: string | null; displayPoints?: string[] | null }) =>
    fetchApi<{ success: boolean; message: string; data: Subject }>(
      `/admin/v1/subject/${id}/display`,
      { method: "PATCH", body: JSON.stringify(data) }
    ),

  sendAnnouncement: (data: AnnouncementRequest) =>
    fetchApi<AnnouncementResponse>("/admin/announcements/send", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getTickets: () =>
    fetchApi<{ success: boolean; data: Ticket[] }>("/admin/tickets"),

  updateTicketStatus: (id: number, status: Ticket["status"]) =>
    fetchApi<{ success: boolean; data: Ticket }>(`/admin/tickets/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),

  getProfile: () =>
    fetchApi<{ success: boolean; data: { id: string; name: string; email: string; role: string } }>("/admin/profile"),

  updateProfile: (data: { name?: string; email?: string; currentPassword: string; newPassword?: string }) =>
    fetchApi<{ success: boolean; message: string; data: { id: string; name: string; email: string; role: string } }>(
      "/admin/profile",
      { method: "PUT", body: JSON.stringify(data) }
    ),

  // ============================================================
  // V2 Module Management
  // ============================================================

  createV2Subject: (formData: FormData) =>
    fetchApiMultipart<{ success: boolean; message: string; data: Subject }>("/admin/v2/subject", formData),

  getTopics: (subjectId: number) =>
    fetchApi<{ success: boolean; message: string; data: SubjectTopic[] }>(`/admin/v2/subject/${subjectId}/topics`),

  addTopic: (subjectId: number, data: CreateTopicRequest) =>
    fetchApi<{ success: boolean; message: string; data: SubjectTopic }>(`/admin/v2/subject/${subjectId}/topic`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateTopic: (subjectId: number, topicId: number, data: Partial<CreateTopicRequest & { isActive: boolean }>) =>
    fetchApi<{ success: boolean; message: string; data: SubjectTopic }>(
      `/admin/v2/subject/${subjectId}/topic/${topicId}`,
      { method: "PUT", body: JSON.stringify(data) }
    ),

  deleteTopic: (subjectId: number, topicId: number) =>
    fetchApi<{ success: boolean; message: string }>(`/admin/v2/subject/${subjectId}/topic/${topicId}`, {
      method: "DELETE",
    }),

  uploadTopicPDF: (subjectId: number, topicId: number, formData: FormData) =>
    fetchApiMultipart<{ success: boolean; message: string; data: SubjectTopic }>(
      `/admin/v2/subject/${subjectId}/topic/${topicId}/pdf`,
      formData
    ),

  uploadMockPDFs: (subjectId: number, formData: FormData) =>
    fetchApiMultipart<{ success: boolean; message: string }>(`/admin/v2/subject/${subjectId}/mock-pdf`, formData),

  generateTopicQuestions: (topicId: number, count = 100) =>
    fetchApi<GenerateJobResponse>(`/admin/v2/generate/topic/${topicId}`, {
      method: "POST",
      body: JSON.stringify({ count }),
    }),

  generateMockQuestions: (subjectId: number) =>
    fetchApi<GenerateJobResponse>(`/admin/v2/generate/mock/${subjectId}`, { method: "POST" }),

  generateTopicVectors: (topicId: number) =>
    fetchApi<GenerateJobResponse>(`/admin/v2/vector/topic/${topicId}`, { method: "POST" }),
};
