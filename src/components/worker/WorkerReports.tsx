import React, { useState } from "react";
import { AlertTriangle, Send, Clock, CheckCircle, X } from "lucide-react";
import {
  mockComplaints,
  mockContracts,
  mockJobRequests,
} from "../../data/mockData";

interface WorkerReportsProps {
  userId: string;
}

const WorkerReports: React.FC<WorkerReportsProps> = ({ userId }) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportForm, setReportForm] = useState({
    subject: "",
    description: "",
    contractId: "",
    urgency: "medium" as "low" | "medium" | "high",
  });

  const userReports = mockComplaints.filter((c) => c.reporterId === userId);
  const workerContracts = mockContracts.filter(
    (c) => c.workerId === userId && c.status === "active"
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-red-600 bg-red-100";
      case "investigating":
        return "text-yellow-600 bg-yellow-100";
      case "resolved":
        return "text-green-600 bg-green-100";
      case "closed":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Mới tạo";
      case "investigating":
        return "Đang xử lý";
      case "resolved":
        return "Đã giải quyết";
      case "closed":
        return "Đã đóng";
      default:
        return status;
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the report to the backend
    console.log("Submitting report:", reportForm);
    alert("Báo cáo đã được gửi thành công!");
    setShowReportForm(false);
    setReportForm({
      subject: "",
      description: "",
      contractId: "",
      urgency: "medium",
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng báo cáo</p>
              <p className="text-2xl font-bold text-gray-900">
                {userReports.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang xử lý</p>
              <p className="text-2xl font-bold text-gray-900">
                {userReports.filter((r) => r.status === "investigating").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã giải quyết</p>
              <p className="text-2xl font-bold text-gray-900">
                {userReports.filter((r) => r.status === "resolved").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Create Report Button */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Báo cáo sự cố
            </h3>
            <p className="text-gray-600">
              Báo cáo các vấn đề xảy ra trong quá trình làm việc
            </p>
          </div>
          <button
            onClick={() => setShowReportForm(true)}
            className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            <AlertTriangle size={20} />
            <span>Tạo báo cáo</span>
          </button>
        </div>
      </div>

      {/* Report Form Modal */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  Tạo báo cáo mới
                </h3>
                <button
                  onClick={() => setShowReportForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitReport} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hợp đồng liên quan
                </label>
                <select
                  value={reportForm.contractId}
                  onChange={(e) =>
                    setReportForm({ ...reportForm, contractId: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Chọn hợp đồng...</option>
                  {workerContracts.map((contract) => {
                    const jobRequest = mockJobRequests.find(
                      (j) => j.id === contract.jobRequestId
                    );
                    return (
                      <option key={contract.id} value={contract.id}>
                        {jobRequest?.title || "Công việc không xác định"}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={reportForm.subject}
                  onChange={(e) =>
                    setReportForm({ ...reportForm, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Mô tả ngắn gọn vấn đề..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả chi tiết
                </label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) =>
                    setReportForm({
                      ...reportForm,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Mô tả chi tiết về vấn đề bạn gặp phải..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mức độ ưu tiên
                </label>
                <select
                  value={reportForm.urgency}
                  onChange={(e) =>
                    setReportForm({
                      ...reportForm,
                      urgency: e.target.value as "low" | "medium" | "high",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Send size={20} />
                  <span>Gửi báo cáo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reports History */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Lịch sử báo cáo
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {userReports.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <AlertTriangle className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Chưa có báo cáo nào</p>
            </div>
          ) : (
            userReports.map((report) => (
              <div key={report.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {report.subject}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {getStatusText(report.status)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">{report.description}</p>

                    <div className="text-sm text-gray-500">
                      <p>
                        Tạo ngày:{" "}
                        {new Date(report.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>

                  <div className="ml-6">
                    <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                      Xem chi tiết
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

export default WorkerReports;
