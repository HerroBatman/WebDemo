import React, { useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Database,
  Save,
  Key,
  Mail,
} from "lucide-react";

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    system: {
      siteName: "Nền tảng quản lý lao động",
      siteDescription: "Kết nối người lao động và nhà tuyển dụng",
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
    },
    security: {
      passwordMinLength: 8,
      requireStrongPassword: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enableTwoFactor: false,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      adminAlerts: true,
    },
    payment: {
      commissionRate: 5,
      minimumPayout: 100000,
      paymentMethods: ["bank_transfer", "e_wallet"],
      autoApprovePayments: false,
    },
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    alert("Cài đặt hệ thống đã được lưu thành công!");
  };

  const handleBackup = () => {
    alert("Đang tạo bản sao lưu dữ liệu...");
  };

  const handleRestore = () => {
    if (
      confirm(
        "Bạn có chắc chắn muốn khôi phục dữ liệu? Thao tác này không thể hoàn tác."
      )
    ) {
      alert("Đang khôi phục dữ liệu...");
    }
  };

  return (
    <div className="space-y-6">
      {/* System Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Settings className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Cài đặt hệ thống
            </h3>
            <p className="text-gray-600 text-sm">
              Cấu hình cơ bản của hệ thống
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên trang web
            </label>
            <input
              type="text"
              value={settings.system.siteName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  system: { ...settings.system, siteName: e.target.value },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mô tả trang web
            </label>
            <input
              type="text"
              value={settings.system.siteDescription}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  system: {
                    ...settings.system,
                    siteDescription: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Chế độ bảo trì</p>
              <p className="text-sm text-gray-600">
                Tạm thời đóng trang web để bảo trì
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.system.maintenanceMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    system: {
                      ...settings.system,
                      maintenanceMode: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Cho phép đăng ký</p>
              <p className="text-sm text-gray-600">
                Người dùng mới có thể tạo tài khoản
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.system.allowRegistration}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    system: {
                      ...settings.system,
                      allowRegistration: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <Shield className="text-red-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Cài đặt bảo mật
            </h3>
            <p className="text-gray-600 text-sm">
              Cấu hình bảo mật và xác thực
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Độ dài mật khẩu tối thiểu
            </label>
            <input
              type="number"
              value={settings.security.passwordMinLength}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    passwordMinLength: parseInt(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              min="6"
              max="20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian hết hạn phiên (phút)
            </label>
            <input
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    sessionTimeout: parseInt(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              min="5"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lần đăng nhập sai tối đa
            </label>
            <input
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  security: {
                    ...settings.security,
                    maxLoginAttempts: parseInt(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              min="3"
              max="10"
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Yêu cầu mật khẩu mạnh</p>
              <p className="text-sm text-gray-600">
                Bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.security.requireStrongPassword}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      requireStrongPassword: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Xác thực hai yếu tố</p>
              <p className="text-sm text-gray-600">
                Bắt buộc xác thực qua SMS hoặc app
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.security.enableTwoFactor}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      enableTwoFactor: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Key className="text-green-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Cài đặt thanh toán
            </h3>
            <p className="text-gray-600 text-sm">
              Cấu hình hoa hồng và thanh toán
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tỷ lệ hoa hồng (%)
            </label>
            <input
              type="number"
              value={settings.payment.commissionRate}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  payment: {
                    ...settings.payment,
                    commissionRate: parseFloat(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="0"
              max="20"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số tiền rút tối thiểu (VND)
            </label>
            <input
              type="number"
              value={settings.payment.minimumPayout}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  payment: {
                    ...settings.payment,
                    minimumPayout: parseInt(e.target.value),
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              min="50000"
              step="10000"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Tự động phê duyệt thanh toán
              </p>
              <p className="text-sm text-gray-600">
                Thanh toán được phê duyệt tự động dưới ngưỡng nhất định
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.payment.autoApprovePayments}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    payment: {
                      ...settings.payment,
                      autoApprovePayments: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Database className="text-purple-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Quản lý dữ liệu
            </h3>
            <p className="text-gray-600 text-sm">
              Sao lưu và khôi phục dữ liệu hệ thống
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">
              Sao lưu dữ liệu
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Tạo bản sao lưu toàn bộ dữ liệu hệ thống
            </p>
            <button
              onClick={handleBackup}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Tạo bản sao lưu
            </button>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">
              Khôi phục dữ liệu
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Khôi phục dữ liệu từ bản sao lưu
            </p>
            <button
              onClick={handleRestore}
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Khôi phục dữ liệu
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <button
          onClick={handleSave}
          className="flex items-center justify-center space-x-2 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
        >
          <Save size={20} />
          <span>Lưu tất cả cài đặt</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
