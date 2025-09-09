import React, { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  Building2,
  Globe,
  Save,
  Edit,
} from "lucide-react";
import { mockEmployers } from "../../data/mockData";

interface EmployerSettingsProps {
  userId: string;
}

const EmployerSettings: React.FC<EmployerSettingsProps> = ({ userId }) => {
  const employer = mockEmployers.find((e) => e.id === userId);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(employer || {});

  const [settings, setSettings] = useState({
    notifications: {
      newApplications: true,
      workerUpdates: true,
      paymentReminders: true,
      systemUpdates: false,
      contractUpdates: true,
    },
    privacy: {
      showCompanyInfo: true,
      showContactInfo: true,
      allowDirectContact: true,
      publicProfile: true,
    },
    preferences: {
      language: "vi",
      currency: "VND",
      autoApprovePayments: false,
      requireWorkerVerification: true,
    },
  });

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setIsEditingProfile(false);
    alert("Thông tin công ty đã được cập nhật!");
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to backend
    alert("Cài đặt đã được lưu thành công!");
  };

  if (!employer) {
    return <div>Không tìm thấy thông tin nhà tuyển dụng</div>;
  }

  return (
    <div className="space-y-6">
      {/* Company Profile */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="text-green-600" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Thông tin công ty
              </h3>
              <p className="text-gray-600 text-sm">
                Quản lý thông tin cơ bản của công ty
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              isEditingProfile ? handleSaveProfile() : setIsEditingProfile(true)
            }
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isEditingProfile
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {isEditingProfile ? <Save size={20} /> : <Edit size={20} />}
            <span>{isEditingProfile ? "Lưu" : "Chỉnh sửa"}</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên công ty
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.companyName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    companyName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{employer.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Người liên hệ
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.contactName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    contactName: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{employer.contactName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            {isEditingProfile ? (
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{employer.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            {isEditingProfile ? (
              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({ ...profileData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{employer.phone}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            {isEditingProfile ? (
              <input
                type="text"
                value={profileData.address}
                onChange={(e) =>
                  setProfileData({ ...profileData, address: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ) : (
              <p className="text-gray-900 py-2">{employer.address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Bell className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Cài đặt thông báo
            </h3>
            <p className="text-gray-600 text-sm">
              Quản lý các loại thông báo bạn muốn nhận
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Ứng viên mới</p>
              <p className="text-sm text-gray-600">
                Thông báo khi có ứng viên nộp đơn
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.newApplications}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      newApplications: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Cập nhật từ người lao động
              </p>
              <p className="text-sm text-gray-600">
                Thông báo về tiến độ và check-in/out
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.workerUpdates}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      workerUpdates: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Nhắc nhở thanh toán</p>
              <p className="text-sm text-gray-600">
                Nhắc nhở khi đến hạn thanh toán lương
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.paymentReminders}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: {
                      ...settings.notifications,
                      paymentReminders: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Shield className="text-orange-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Cài đặt riêng tư
            </h3>
            <p className="text-gray-600 text-sm">
              Kiểm soát thông tin được hiển thị công khai
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Hiển thị thông tin công ty
              </p>
              <p className="text-sm text-gray-600">
                Cho phép người lao động xem thông tin công ty
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.privacy.showCompanyInfo}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      showCompanyInfo: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Cho phép liên hệ trực tiếp
              </p>
              <p className="text-sm text-gray-600">
                Cho phép người lao động liên hệ trực tiếp
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.privacy.allowDirectContact}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    privacy: {
                      ...settings.privacy,
                      allowDirectContact: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* General Preferences */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Globe className="text-purple-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Tùy chọn chung
            </h3>
            <p className="text-gray-600 text-sm">Cài đặt ngôn ngữ và tiền tệ</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ngôn ngữ
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  preferences: {
                    ...settings.preferences,
                    language: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đơn vị tiền tệ
            </label>
            <select
              value={settings.preferences.currency}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  preferences: {
                    ...settings.preferences,
                    currency: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="VND">VND (Việt Nam Đồng)</option>
              <option value="USD">USD (US Dollar)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                Yêu cầu xác minh người lao động
              </p>
              <p className="text-sm text-gray-600">
                Chỉ cho phép ứng viên đã xác minh danh tính
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.preferences.requireWorkerVerification}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    preferences: {
                      ...settings.preferences,
                      requireWorkerVerification: e.target.checked,
                    },
                  })
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <button
          onClick={handleSaveSettings}
          className="flex items-center justify-center space-x-2 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          <Save size={20} />
          <span>Lưu tất cả cài đặt</span>
        </button>
      </div>
    </div>
  );
};

export default EmployerSettings;
