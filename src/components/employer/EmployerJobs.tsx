import React, { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Clock,
  Users,
  DollarSign,
} from "lucide-react";
import { mockJobRequests, mockEmployers } from "../../data/mockData";

interface EmployerJobsProps {
  userId: string;
}

const EmployerJobs: React.FC<EmployerJobsProps> = ({ userId }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    requiredSkills: "",
    salary: "",
    workLocation: "",
    duration: "",
    urgency: "medium" as "low" | "medium" | "high",
  });

  const employerJobs = mockJobRequests.filter((j) => j.employerId === userId);
  const employer = mockEmployers.find((e) => e.id === userId);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "filled":
        return "text-blue-600 bg-blue-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to backend
    console.log("Creating job:", jobForm);
    alert("Yêu cầu tuyển dụng đã được tạo thành công!");
    setShowCreateForm(false);
    setJobForm({
      title: "",
      description: "",
      requiredSkills: "",
      salary: "",
      workLocation: "",
      duration: "",
      urgency: "medium",
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng yêu cầu</p>
              <p className="text-2xl font-bold text-gray-900">
                {employerJobs.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang tuyển</p>
              <p className="text-2xl font-bold text-gray-900">
                {employerJobs.filter((j) => j.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã tuyển xong</p>
              <p className="text-2xl font-bold text-gray-900">
                {employerJobs.filter((j) => j.status === "filled").length}
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
              <p className="text-sm text-gray-600">Tổng ứng viên</p>
              <p className="text-2xl font-bold text-gray-900">
                {employerJobs.reduce(
                  (sum, job) => sum + (job.applicants?.length || 0),
                  0
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Create Job Button */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Tạo yêu cầu tuyển dụng
            </h3>
            <p className="text-gray-600">
              Tạo yêu cầu mới để tìm kiếm nhân sự phù hợp
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Plus size={20} />
            <span>Tạo yêu cầu</span>
          </button>
        </div>
      </div>

      {/* Create Job Form */}
      {showCreateForm && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Tạo yêu cầu tuyển dụng mới
          </h3>

          <form onSubmit={handleCreateJob} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề công việc *
                </label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="VD: Tuyển thợ xây dựng"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức lương (VND/ngày) *
                </label>
                <input
                  type="number"
                  value={jobForm.salary}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, salary: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="500000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa điểm làm việc *
                </label>
                <input
                  type="text"
                  value={jobForm.workLocation}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, workLocation: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Quận 1, TP.HCM"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thời gian làm việc
                </label>
                <input
                  type="text"
                  value={jobForm.duration}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, duration: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="3 tháng"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kỹ năng yêu cầu *
                </label>
                <input
                  type="text"
                  value={jobForm.requiredSkills}
                  onChange={(e) =>
                    setJobForm({ ...jobForm, requiredSkills: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Xây dựng, Điện lạnh (cách nhau bởi dấu phẩy)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức độ ưu tiên
                </label>
                <select
                  value={jobForm.urgency}
                  onChange={(e) =>
                    setJobForm({
                      ...jobForm,
                      urgency: e.target.value as "low" | "medium" | "high",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả công việc *
              </label>
              <textarea
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({ ...jobForm, description: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Mô tả chi tiết về công việc, yêu cầu..."
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Tạo yêu cầu
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Jobs List */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Danh sách yêu cầu tuyển dụng
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {employerJobs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Plus className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Chưa có yêu cầu tuyển dụng nào</p>
            </div>
          ) : (
            employerJobs.map((job) => (
              <div
                key={job.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          job.status
                        )}`}
                      >
                        {job.status === "active"
                          ? "Đang tuyển"
                          : job.status === "filled"
                          ? "Đã tuyển xong"
                          : "Đã hủy"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                          job.urgency
                        )}`}
                      >
                        {job.urgency === "high"
                          ? "Khẩn cấp"
                          : job.urgency === "medium"
                          ? "Bình thường"
                          : "Không gấp"}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{job.description}</p>

                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span>{job.salary.toLocaleString()} VND/ngày</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={16} />
                        <span>{job.applicants?.length || 0} ứng viên</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-6">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye size={20} />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <Edit size={20} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={20} />
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

export default EmployerJobs;
