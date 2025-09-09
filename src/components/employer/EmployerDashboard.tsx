import React, { useState } from "react";
import {
  Building2,
  Plus,
  Users,
  FileText,
  CreditCard,
  Star,
  TrendingUp,
  Settings,
  LogOut,
  MessageCircle,
} from "lucide-react";
import EmployerJobs from "./EmployerJobs";
import EmployerWorkers from "./EmployerWorkers";
import EmployerContracts from "./EmployerContracts";
import EmployerPayments from "./EmployerPayments";
import EmployerRatings from "./EmployerRatings";
import EmployerProgress from "./EmployerProgress";
import EmployerSettings from "./EmployerSettings";

interface EmployerDashboardProps {
  userId: string;
  onLogout: () => void;
}

const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  userId,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState("jobs");

  const menuItems = [
    { id: "jobs", label: "Tuyển dụng", icon: Plus },
    { id: "workers", label: "Ứng viên", icon: Users },
    { id: "contracts", label: "Hợp đồng", icon: FileText },
    { id: "payments", label: "Thanh toán", icon: CreditCard },
    { id: "ratings", label: "Đánh giá", icon: Star },
    { id: "progress", label: "Tiến độ", icon: TrendingUp },
    { id: "settings", label: "Cài đặt", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "jobs":
        return <EmployerJobs userId={userId} />;
      case "workers":
        return <EmployerWorkers userId={userId} />;
      case "contracts":
        return <EmployerContracts userId={userId} />;
      case "payments":
        return <EmployerPayments userId={userId} />;
      case "ratings":
        return <EmployerRatings userId={userId} />;
      case "progress":
        return <EmployerProgress userId={userId} />;
      case "settings":
        return <EmployerSettings userId={userId} />;
      default:
        return <EmployerJobs userId={userId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Nhà tuyển dụng
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
                    ? "bg-green-50 text-green-600 border-r-2 border-green-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <MessageCircle size={20} />
            <span className="font-medium">Liên hệ Admin</span>
          </button>
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
                  Quản lý tuyển dụng và nhân sự
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">
                    Đã xác minh
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

export default EmployerDashboard;
