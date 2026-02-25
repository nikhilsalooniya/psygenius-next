// Admin auth
export interface AdminUser {
  email: string;
  firstname: string;
  lastname: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  data: AdminUser;
  message: string;
}

// Students
export interface Student {
  id: string;
  fullName: string;
  username: string;
  email: string;
  school: string | null;
  courseName: string | null;
  disable: boolean;
  emailVerify: boolean;
  createdOn: string;
  updatedOn: string;
}

export interface StudentBook {
  id: number;
  subjectName: string;
  description: string;
  coverImage: string | null;
  currency: string;
  price: number;
  discount: number;
  updatedAt: string;
  lastUsed: { id: number; bookId: number; userId: string; createdAt: string; updatedAt: string } | null;
}

export interface ScoreDetails {
  progress: number;
  status: "improving" | "declining" | "steady";
  correct: number;
  incorrect: number;
  streak: number;
  nextExamDate: string | null;
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  email: string;
  rank: number;
  percentage: number;
  correct: number;
  incorrect: number;
}

export interface LeaderboardSelf {
  rank: number;
  totalUsers: number;
  percentage: number;
  correct: number;
  incorrect: number;
  streak: number;
}

export interface Ticket {
  id: number;
  userId: string;
  message: string;
  status: "open" | "in_progress" | "closed";
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackEntry {
  id: number;
  userId: string;
  feedback: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentDetail {
  student: Student;
  books: StudentBook[];
  totalBooks: number;
  scoreDetails: ScoreDetails;
  leaderboard: {
    allUsers: LeaderboardEntry[];
    self: LeaderboardSelf;
  };
  weakTopics: string[];
}

export interface StudentDetailResponse {
  success: boolean;
  message: string;
  data: StudentDetail;
  FeedBack: FeedbackEntry[];
  tickets: Ticket[];
}

// Payments
export interface Payment {
  razorpay_order_id: string;
  amount: number;
  amount_due: number;
  amount_paid: number;
  currency: string;
  status: string;
  userId: string;
  paymentstatus: "Pending" | "Paid" | "Failed";
  SubjectId: number;
  createdAt: string;
  PayerID: string | null;
  PaypalId: string | null;
}

// Subjects/Modules
export interface PurchasedUser {
  userId: string;
  name: string;
  email: string;
  purchasedOn: string;
}

export interface Subject {
  id: number;
  subjectName: string;
  description: string;
  author: string | null;
  price: number | null;
  discount: number;
  currency: string;
  coverImage: string | null;
  active: boolean;
  createdAt: string;
  purchaseCount: number;
  purchasedUsers: PurchasedUser[];
  displayPrice: string | null;
  displayOriginalPrice: string | null;
  displayPoints: string | null; // JSON stringified string[]
}

// V2 Module / Topic types
export interface SubjectTopic {
  id: number;
  subjectId: number;
  name: string;
  pdfId: number | null;
  categoryId: number | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Computed fields from admin endpoint
  pdfUploaded: boolean;
  questionsGenerated: number;
  embeddingsGenerated: number;
}

export interface CreateTopicRequest {
  name: string;
  order: number;
}

export interface GenerateJobResponse {
  success: boolean;
  message: string;
  count?: number;
}

export interface V2SubjectCreateRequest {
  subjectName: string;
  description: string;
  author?: string;
  price?: number;
  discount?: number;
  currency?: string;
}

// Dashboard stats
export interface DashboardStats {
  totalUsers: number;
  newUsersToday: number;
  newUsersThisMonth: number;
  activeUsersToday: number;
  activeUsersThisMonth: number;
  submissionsToday: number;
  submissionsThisMonth: number;
  paymentsToday: number;
  paymentsThisMonth: number;
  totalPayments: number;
  revenueToday: number;
  revenueThisMonth: number;
  totalRevenue: number;
  openTickets: number;
  pageViewsToday: number;
  pageViewsThisMonth: number;
}

// Announcements
export interface AnnouncementRequest {
  title: string;
  message: string;
  targetAudience: "all" | string[];
}

export interface AnnouncementResponse {
  success: boolean;
  message: string;
  sentTo: number;
}
