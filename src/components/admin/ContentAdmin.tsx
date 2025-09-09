import React, { useState } from "react";
import {
  Database,
  Plus,
  Edit,
  Trash2,
  Tag,
  Briefcase,
  Settings,
} from "lucide-react";

const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "categories" | "skills" | "locations"
  >("categories");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });

  // Mock data for content management
  const jobCategories = [
    {
      id: "1",
      name: "Xây dựng",
      description: "Các công việc liên quan đến xây dựng",
      jobCount: 15,
    },
    {
      id: "2",
      name: "Dịch vụ",
      description: "Các công việc dịch vụ",
      jobCount: 12,
    },
    {
      id: "3",
      name: "Sản xuất",
      description: "Các công việc trong lĩnh vực sản xuất",
      jobCount: 8,
    },
    {
      id: "4",
      name: "Chăm sóc",
      description: "Các công việc chăm sóc và hỗ trợ",
      jobCount: 6,
    },
  ];

  const skillsList = [
    { id: "1", name: "Xây dựng", category: "Xây dựng", workerCount: 25 },
    { id: "2", name: "Điện lạnh", category: "Kỹ thuật", workerCount: 18 },
    { id: "3", name: "Làm vệ sinh", category: "Dịch vụ", workerCount: 15 },
    { id: "4", name: "Nấu ăn", category: "Dịch vụ", workerCount: 12 },
    {
      id: "5",
      name: "Chăm sóc người già",
      category: "Chăm sóc",
      workerCount: 8,
    },
  ];

  const locationsList = [
    { id: "1", name: "TP.HCM", district: "Toàn thành phố", userCount: 45 },
    { id: "2", name: "Quận 1", district: "TP.HCM", userCount: 12 },
    { id: "3", name: "Quận 3", district: "TP.HCM", userCount: 8 },
    { id: "4", name: "Bình Dương", district: "Toàn tỉnh", userCount: 15 },
    { id: "5", name: "Đồng Nai", district: "Toàn tỉnh", userCount: 10 },
  ];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Adding ${activeTab}:`, formData);
    alert(
      `Đã thêm ${
        activeTab === "categories"
          ? "danh mục"
          : activeTab === "skills"
          ? "kỹ năng"
          : "địa điểm"
      } thành công!`
    );
    setShowAddForm(false);
    setFormData({ name: "", description: "" });
  };

  const handleEdit = (id: string) => {
    console.log(`Editing ${activeTab} ${id}`);
    alert("Chức năng chỉnh sửa sẽ được triển khai!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa mục này?")) {
      console.log(`Deleting ${activeTab} ${id}`);
      alert("Đã xóa thành công!");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "categories":
        return (
          <div className="space-y-4">
            {jobCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {category.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    {category.jobCount} công việc
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(category.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case "skills":
        return (
          <div className="space-y-4">
            {skillsList.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                  <p className="text-sm text-gray-600">
                    Danh mục: {skill.category}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {skill.workerCount} người lao động
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(skill.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case "locations":
        return (
          <div className="space-y-4">
            {locationsList.map((location) => (
              <div
                key={location.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {location.name}
                  </h4>
                  <p className="text-sm text-gray-600">{location.district}</p>
                  <p className="text-sm text-purple-600 mt-1">
                    {location.userCount} người dùng
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(location.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(location.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Danh mục công việc</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobCategories.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Kỹ năng</p>
              <p className="text-2xl font-bold text-gray-900">
                {skillsList.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Tag className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Địa điểm</p>
              <p className="text-2xl font-bold text-gray-900">
                {locationsList.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Database className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Management */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Quản lý nội dung & danh mục
            </h3>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Plus size={20} />
              <span>Thêm mới</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              {
                id: "categories",
                label: "Danh mục công việc",
                icon: Briefcase,
              },
              { id: "skills", label: "Kỹ năng", icon: Tag },
              { id: "locations", label: "Địa điểm", icon: Database },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-red-500 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">{renderContent()}</div>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Thêm{" "}
                {activeTab === "categories"
                  ? "danh mục"
                  : activeTab === "skills"
                  ? "kỹ năng"
                  : "địa điểm"}{" "}
                mới
              </h3>
            </div>

            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên{" "}
                  {activeTab === "categories"
                    ? "danh mục"
                    : activeTab === "skills"
                    ? "kỹ năng"
                    : "địa điểm"}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nhập tên..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Nhập mô tả..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Thêm
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContent;
