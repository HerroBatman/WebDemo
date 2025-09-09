import React, { useState } from "react";
import {
  Users,
  Search,
  Filter,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  AlertTriangle,
  Star,
} from "lucide-react";
import { mockWorkers, mockEmployers } from "../../data/mockData";

const AdminUsers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"workers" | "employers">(
    "workers"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredWorkers = mockWorkers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && worker.isActive) ||
      (statusFilter === "inactive" && !worker.isActive);
    return matchesSearch && matchesStatus;
  });

  const filteredEmployers = mockEmployers.filter((employer) => {
    const matchesSearch =
      employer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified" && employer.isVerified) ||
      (statusFilter === "unverified" && !employer.isVerified);
    return matchesSearch && matchesStatus;
  });

  const handleUserAction = (
    action: string,
    userId: string,
    userType: "worker" | "employer"
  ) => {
    console.log(`${action} ${userType} ${userId}`);
    alert(
      `Đã ${
        action === "activate"
          ? "kích hoạt"
          : action === "deactivate"
          ? "vô hiệu hóa"
          : "thực hiện"
      } tài khoản thành công!`
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng người dùng</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockWorkers.length + mockEmployers.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Người lao động</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockWorkers.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Nhà tuyển dụng</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockEmployers.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Users className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockWorkers.filter((w) => w.isActive).length +
                  mockEmployers.filter((e) => e.isVerified).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="flex space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">Tất cả trạng thái</option>
              {activeTab === "workers" ? (
                <>
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Không hoạt động</option>
                </>
              ) : (
                <>
                  <option value="verified">Đã xác minh</option>
                  <option value="unverified">Chưa xác minh</option>
                </>
              )}
            </select>

            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("workers")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === "workers"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Người lao động
              </button>
              <button
                onClick={() => setActiveTab("employers")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === "employers"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Nhà tuyển dụng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Danh sách{" "}
            {activeTab === "workers" ? "người lao động" : "nhà tuyển dụng"}
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {activeTab === "workers" ? (
            filteredWorkers.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Users className="mx-auto mb-4 text-gray-300" size={48} />
                <p>Không tìm thấy người lao động nào</p>
              </div>
            ) : (
              filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {worker.name}
                        </h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            worker.isActive
                              ? "text-green-600 bg-green-100"
                              : "text-red-600 bg-red-100"
                          }`}
                        >
                          {worker.isActive ? "Hoạt động" : "Không hoạt động"}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="text-yellow-400" size={16} />
                          <span className="text-sm font-medium">
                            {worker.rating}
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <span className="font-medium">Email:</span>{" "}
                          {worker.email}
                        </div>
                        <div>
                          <span className="font-medium">SĐT:</span>{" "}
                          {worker.phone}
                        </div>
                        <div>
                          <span className="font-medium">Địa chỉ:</span>{" "}
                          {worker.address}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {worker.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Kinh nghiệm: {worker.experience} năm</span>
                        <span>Điểm uy tín: {worker.reputationScore}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-6">
                      <button
                        onClick={() =>
                          handleUserAction("view", worker.id, "worker")
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() =>
                          handleUserAction("edit", worker.id, "worker")
                        }
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() =>
                          handleUserAction(
                            worker.isActive ? "deactivate" : "activate",
                            worker.id,
                            "worker"
                          )
                        }
                        className={`p-2 rounded-lg transition-colors ${
                          worker.isActive
                            ? "text-red-600 hover:bg-red-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                      >
                        {worker.isActive ? (
                          <Ban size={20} />
                        ) : (
                          <CheckCircle size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : filteredEmployers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Users className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Không tìm thấy nhà tuyển dụng nào</p>
            </div>
          ) : (
            filteredEmployers.map((employer) => (
              <div
                key={employer.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {employer.companyName}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          employer.isVerified
                            ? "text-green-600 bg-green-100"
                            : "text-yellow-600 bg-yellow-100"
                        }`}
                      >
                        {employer.isVerified ? "Đã xác minh" : "Chưa xác minh"}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400" size={16} />
                        <span className="text-sm font-medium">
                          {employer.rating}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">Người liên hệ:</span>{" "}
                        {employer.contactName}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {employer.email}
                      </div>
                      <div>
                        <span className="font-medium">SĐT:</span>{" "}
                        {employer.phone}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Địa chỉ:</span>{" "}
                      {employer.address}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-6">
                    <button
                      onClick={() =>
                        handleUserAction("view", employer.id, "employer")
                      }
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() =>
                        handleUserAction("edit", employer.id, "employer")
                      }
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() =>
                        handleUserAction(
                          employer.isVerified ? "unverify" : "verify",
                          employer.id,
                          "employer"
                        )
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        employer.isVerified
                          ? "text-yellow-600 hover:bg-yellow-50"
                          : "text-green-600 hover:bg-green-50"
                      }`}
                    >
                      {employer.isVerified ? (
                        <AlertTriangle size={20} />
                      ) : (
                        <CheckCircle size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
