import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Eye,
} from "lucide-react";
import { mockJobRequests, mockEmployers } from "../../data/mockData";

interface WorkerJobsProps {
  userId: string;
}

const WorkerJobs: React.FC<WorkerJobsProps> = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

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

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "Khẩn cấp";
      case "medium":
        return "Bình thường";
      case "low":
        return "Không gấp";
      default:
        return urgency;
    }
  };

  const filteredJobs = mockJobRequests.filter(
    (job) =>
      job.status === "active" &&
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (jobId: string) => {
    // In a real app, this would send application to backend
    console.log("Applied to job:", jobId);
    alert("Đã nộp đơn ứng tuyển thành công!");
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm công việc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Việc làm khả dụng</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredJobs.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã ứng tuyển</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang chờ phản hồi</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Việc làm phù hợp
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredJobs.map((job) => {
            const employer = mockEmployers.find((e) => e.id === job.employerId);
            const isApplied = job.applicants?.includes(userId);

            return (
              <div
                key={job.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(
                          job.urgency
                        )}`}
                      >
                        {getUrgencyText(job.urgency)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{job.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{job.workLocation}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign size={16} />
                        <span>{job.salary.toLocaleString()} VND/ngày</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>{job.duration}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-600">
                      <strong>Công ty:</strong> {employer?.companyName}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    {isApplied ? (
                      <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                        <CheckCircle size={20} />
                        <span className="font-medium">Đã ứng tuyển</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleApply(job.id)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
                      >
                        Ứng tuyển
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setSelectedJob(selectedJob === job.id ? null : job.id)
                      }
                      className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                    >
                      {selectedJob === job.id ? "Ẩn chi tiết" : "Xem chi tiết"}
                    </button>
                  </div>
                </div>

                {selectedJob === job.id && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Chi tiết công việc:</h4>
                    <p className="text-gray-700 mb-3">{job.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Yêu cầu kỹ năng:</strong>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                          {job.requiredSkills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong>Thông tin liên hệ:</strong>
                        <p className="text-gray-600 mt-1">
                          {employer?.contactName}
                          <br />
                          {employer?.phone}
                          <br />
                          {employer?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkerJobs;
