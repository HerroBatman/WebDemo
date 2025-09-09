import {
  Worker,
  Employer,
  JobRequest,
  Contract,
  CheckInOut,
  Notification,
  Payment,
  Rating,
  Complaint,
} from "../types";

export const mockWorkers: Worker[] = [
  {
    id: "w1",
    name: "Nguyễn Văn An",
    email: "an.nguyen@email.com",
    phone: "0901234567",
    address: "Quận 1, TP.HCM",
    skills: ["Xây dựng", "Điện lạnh", "Sửa chữa"],
    experience: 5,
    qualifications: ["Bằng kỹ thuật xây dựng", "Chứng chỉ an toàn lao động"],
    availableTime: "Thứ 2-6, 7h-17h",
    workArea: ["TP.HCM", "Bình Dương"],
    rating: 4.5,
    reputationScore: 85,
    isActive: true,
    salary: 500000,
  },
  {
    id: "w2",
    name: "Trần Thị Bình",
    email: "binh.tran@email.com",
    phone: "0902345678",
    address: "Quận 3, TP.HCM",
    skills: ["Làm vệ sinh", "Nấu ăn", "Chăm sóc người già"],
    experience: 3,
    qualifications: ["Chứng chỉ chăm sóc sức khỏe"],
    availableTime: "Linh hoạt",
    workArea: ["TP.HCM"],
    rating: 4.8,
    reputationScore: 92,
    isActive: true,
    salary: 400000,
  },
];

export const mockEmployers: Employer[] = [
  {
    id: "e1",
    companyName: "Công ty TNHH ABC",
    contactName: "Lê Văn Cường",
    email: "cuong.le@abc.com",
    phone: "0903456789",
    address: "Quận 1, TP.HCM",
    rating: 4.2,
    isVerified: true,
  },
  {
    id: "e2",
    companyName: "Nhà hàng XYZ",
    contactName: "Phạm Thị Dung",
    email: "dung.pham@xyz.com",
    phone: "0904567890",
    address: "Quận 2, TP.HCM",
    rating: 4.0,
    isVerified: true,
  },
];

export const mockJobRequests: JobRequest[] = [
  {
    id: "j1",
    employerId: "e1",
    title: "Tuyển thợ xây dựng",
    description: "Cần tuyển thợ xây có kinh nghiệm từ 3 năm trở lên",
    requiredSkills: ["Xây dựng", "Đọc bản vẽ"],
    salary: 600000,
    workLocation: "Quận 1, TP.HCM",
    duration: "3 tháng",
    urgency: "high",
    status: "active",
    createdAt: "2025-01-15T08:00:00Z",
    applicants: ["w1"],
  },
  {
    id: "j2",
    employerId: "e2",
    title: "Tuyển nhân viên phục vụ",
    description: "Cần nhân viên phục vụ bàn, ca tối",
    requiredSkills: ["Phục vụ", "Giao tiếp tốt"],
    salary: 350000,
    workLocation: "Quận 2, TP.HCM",
    duration: "6 tháng",
    urgency: "medium",
    status: "active",
    createdAt: "2025-01-14T10:00:00Z",
  },
];

export const mockContracts: Contract[] = [
  {
    id: "c1",
    jobRequestId: "j1",
    workerId: "w1",
    employerId: "e1",
    startDate: "2025-01-20",
    salary: 600000,
    status: "active",
    terms: "Làm việc 8 tiếng/ngày, nghỉ Chủ nhật",
  },
];

export const mockCheckInOuts: CheckInOut[] = [
  {
    id: "ci1",
    workerId: "w1",
    contractId: "c1",
    checkInTime: "2025-01-15T07:30:00Z",
    checkOutTime: "2025-01-15T17:30:00Z",
    location: "Quận 1, TP.HCM",
    status: "checked_out",
  },
];

export const mockNotifications: Notification[] = [
  {
    id: "n1",
    userId: "w1",
    type: "job_match",
    title: "Công việc phù hợp",
    message: "Có 1 công việc mới phù hợp với kỹ năng của bạn",
    createdAt: "2025-01-15T09:00:00Z",
    isRead: false,
  },
  {
    id: "n2",
    userId: "w1",
    type: "reminder",
    title: "Nhắc nhở check-in",
    message: "Đã đến giờ bắt đầu ca làm việc",
    createdAt: "2025-01-15T07:25:00Z",
    isRead: true,
  },
];

export const mockPayments: Payment[] = [
  {
    id: "p1",
    contractId: "c1",
    amount: 600000,
    status: "completed",
    date: "2025-01-15",
    method: "bank_transfer",
  },
];

export const mockRatings: Rating[] = [
  {
    id: "r1",
    fromId: "e1",
    toId: "w1",
    contractId: "c1",
    score: 5,
    comment: "Làm việc rất tốt, đúng giờ",
    date: "2025-01-15",
  },
];

export const mockComplaints: Complaint[] = [
  {
    id: "comp1",
    reporterId: "w2",
    reporterType: "worker",
    targetId: "e2",
    targetType: "employer",
    subject: "Không thanh toán đúng hạn",
    description: "Nhà tuyển dụng chậm thanh toán lương 1 tuần",
    status: "investigating",
    createdAt: "2025-01-14T15:00:00Z",
  },
];
