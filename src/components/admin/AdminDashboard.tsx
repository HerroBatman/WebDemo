import React, { useState } from "react";
import {
  Shield,
  Users,
  FileText,
  CreditCard,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  Database,
} from "lucide-react";
import AdminUsers from "./AdminUsers";
import AdminContracts from "./AdminContracts";
import AdminPayments from "./AdminPayments";
import AdminComplaints from "./AdminComplaints";
import AdminReports from "./AdminReports";
import AdminSettings from "./AdminSettings";
import AdminContent from "./ContentAdmin";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("users");

  const menuItems = [
    { id: "users", label: "Quản lý người dùng", icon: Users },
    { id: "contracts", label: "Quản lý hợp đồng", icon: FileText },
    { id: "payments", label: "Quản lý thanh toán", icon: CreditCard },
    { id: "complaints", label: "Xử lý khiếu nại", icon: AlertTriangle },
    { id: "reports", label: "Thống kê & báo cáo", icon: BarChart3 },
    { id: "content", label: "Quản lý nội dung", icon: Database },
    { id: "settings", label: "Cài đặt hệ thống", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return <AdminUsers />;
      case "contracts":
        return <AdminContracts />;
      case "payments":
        return <AdminPayments />;
      case "complaints":
        return <AdminComplaints />;
      case "reports":
        return <AdminReports />;
      case "content":
        return <AdminContent />;
      case "settings":
        return <AdminSettings />;
      default:
        return <AdminUsers />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Quản trị viên
              </h2>
              <p className="text-sm text-gray-600">Admin Panel</p>
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
                    ? "bg-red-50 text-red-600 border-r-2 border-red-600"
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
                  Quản trị và giám sát hệ thống
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-red-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-red-700">
                    Super Admin
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

export default AdminDashboard;
