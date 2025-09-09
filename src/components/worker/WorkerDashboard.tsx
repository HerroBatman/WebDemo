import React, { useState } from "react";
import {
  User,
  Briefcase,
  Bell,
  CheckSquare,
  DollarSign,
  History,
  AlertTriangle,
  Star,
  Settings,
  LogOut,
  Calendar,
  MapPin,
} from "lucide-react";
import WorkerProfile from "./WorkerProfile";
import WorkerJobs from "./JobWorker";
import WorkerNotifications from "./WorkerNotifications";
import WorkerContracts from "./WorkerContracts";
import WorkerCheckIn from "./WorkerCheckIn";
import WorkerSalary from "./WorkerSalary";
import WorkerHistory from "./HistoryWorker";
import WorkerReports from "./WorkerReports";
import WorkerSettings from "./WorkerSettings";

interface WorkerDashboardProps {
  userId: string;
  onLogout: () => void;
}

const WorkerDashboard: React.FC<WorkerDashboardProps> = ({
  userId,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Hồ sơ cá nhân", icon: User },
    { id: "jobs", label: "Việc làm", icon: Briefcase },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "contracts", label: "Hợp đồng", icon: CheckSquare },
    { id: "checkin", label: "Check-in/out", icon: Calendar },
    { id: "salary", label: "Lương", icon: DollarSign },
    { id: "history", label: "Lịch sử", icon: History },
    { id: "reports", label: "Báo cáo", icon: AlertTriangle },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <WorkerProfile userId={userId} />;
      case "jobs":
        return <WorkerJobs userId={userId} />;
      case "notifications":
        return <WorkerNotifications userId={userId} />;
      case "contracts":
        return <WorkerContracts userId={userId} />;
      case "checkin":
        return <WorkerCheckIn userId={userId} />;
      case "salary":
        return <WorkerSalary userId={userId} />;
      case "history":
        return <WorkerHistory userId={userId} />;
      case "reports":
        return <WorkerReports userId={userId} />;
      case "settings":
        return <WorkerSettings userId={userId} />;
      default:
        return <WorkerProfile userId={userId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Người lao động
              </h2>
              <p className="text-sm text-gray-600">Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {menuItems.find((item) => item.id === activeTab)?.label}
                </h1>
                <p className="text-gray-600 mt-1">
                  Quản lý thông tin và hoạt động của bạn
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">
                    Đang hoạt động
                  </span>
                </div>
              </div>
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
