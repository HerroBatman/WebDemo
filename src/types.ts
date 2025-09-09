export type UserType = "worker" | "employer" | "admin";

export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: string;
  skills: string[];
  experience: number;
  qualifications: string[];
  availableTime: string;
  workArea: string[];
  rating: number;
  reputationScore: number;
  isActive: boolean;
  salary?: number;
  contractId?: string;
}

export interface Employer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  rating: number;
  isVerified: boolean;
}

export interface JobRequest {
  id: string;
  employerId: string;
  title: string;
  description: string;
  requiredSkills: string[];
  salary: number;
  workLocation: string;
  duration: string;
  urgency: "low" | "medium" | "high";
  status: "active" | "filled" | "cancelled";
  createdAt: string;
  applicants?: string[];
  selectedWorkerId?: string;
}

export interface Contract {
  id: string;
  jobRequestId: string;
  workerId: string;
  employerId: string;
  startDate: string;
  endDate?: string;
  salary: number;
  status: "active" | "completed" | "terminated";
  terms: string;
}

export interface CheckInOut {
  id: string;
  workerId: string;
  contractId: string;
  checkInTime: string;
  checkOutTime?: string;
  location: string;
  status: "checked_in" | "checked_out";
}

export interface Notification {
  id: string;
  userId: string;
  type: "job_match" | "application_update" | "payment" | "reminder" | "system";
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface Payment {
  id: string;
  contractId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
  method: "bank_transfer" | "e_wallet" | "cash";
}

export interface Rating {
  id: string;
  fromId: string;
  toId: string;
  contractId: string;
  score: number;
  comment: string;
  date: string;
}

export interface Complaint {
  id: string;
  reporterId: string;
  reporterType: UserType;
  targetId: string;
  targetType: UserType;
  subject: string;
  description: string;
  status: "open" | "investigating" | "resolved" | "closed";
  createdAt: string;
}
