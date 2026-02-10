import { getAccessToken, clearTokens } from "./auth";
import type {
  LoginResponse,
  Student,
  StudentDetailResponse,
  Payment,
  Subject,
  AnnouncementRequest,
  AnnouncementResponse,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.psygenius.mentoragenius.de";

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

  sendAnnouncement: (data: AnnouncementRequest) =>
    fetchApi<AnnouncementResponse>("/admin/announcements/send", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
