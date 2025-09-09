import React, { useState } from "react";
import {
  AlertTriangle,
  Search,
  Clock,
  CheckCircle,
  X,
  Eye,
  MessageSquare,
} from "lucide-react";
import {
  mockComplaints,
  mockWorkers,
  mockEmployers,
} from "../../data/mockData";

const AdminComplaints: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(
    null
  );

  const filteredComplaints = mockComplaints.filter((complaint) => {
    const reporter =
      complaint.reporterType === "worker"
        ? mockWorkers.find((w) => w.id === complaint.reporterId)
        : mockEmployers.find((e) => e.id === complaint.reporterId);

    const target =
      complaint.targetType === "worker"
        ? mockWorkers.find((w) => w.id === complaint.targetId)
        : mockEmployers.find((e) => e.id === complaint.targetId);

    const matchesSearch =
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reporter &&
        ("name" in reporter ? reporter.name : reporter.companyName)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  const getPriorityColor = (createdAt: string) => {
    const daysSinceCreated = Math.floor(
      (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceCreated > 7) return "text-red-600";
    if (daysSinceCreated > 3) return "text-yellow-600";
    return "text-green-600";
  };

  const handleComplaintAction = (action: string, complaintId: string) => {
    console.log(`${action} complaint ${complaintId}`);
    alert(
      `Đã ${
        action === "investigate"
          ? "bắt đầu xử lý"
          : action === "resolve"
          ? "giải quyết"
          : "đóng"
      } khiếu nại thành công!`
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng khiếu nại</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockComplaints.length}
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
              <p className="text-sm text-gray-600">Chờ xử lý</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockComplaints.filter((c) => c.status === "open").length}
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
              <p className="text-sm text-gray-600">Đang xử lý</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  mockComplaints.filter((c) => c.status === "investigating")
                    .length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã giải quyết</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockComplaints.filter((c) => c.status === "resolved").length}
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
              placeholder="Tìm kiếm theo tiêu đề, mô tả hoặc người báo cáo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="open">Mới tạo</option>
            <option value="investigating">Đang xử lý</option>
            <option value="resolved">Đã giải quyết</option>
            <option value="closed">Đã đóng</option>
          </select>
        </div>
      </div>

      {/* Complaints List */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Danh sách khiếu nại
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredComplaints.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <AlertTriangle className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Không tìm thấy khiếu nại nào</p>
            </div>
          ) : (
            filteredComplaints.map((complaint) => {
              const reporter =
                complaint.reporterType === "worker"
                  ? mockWorkers.find((w) => w.id === complaint.reporterId)
                  : mockEmployers.find((e) => e.id === complaint.reporterId);

              const target =
                complaint.targetType === "worker"
                  ? mockWorkers.find((w) => w.id === complaint.targetId)
                  : mockEmployers.find((e) => e.id === complaint.targetId);

              const daysSinceCreated = Math.floor(
                (Date.now() - new Date(complaint.createdAt).getTime()) /
                  (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  key={complaint.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {complaint.subject}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            complaint.status
                          )}`}
                        >
                          {getStatusText(complaint.status)}
                        </span>
                        <span
                          className={`text-sm font-medium ${getPriorityColor(
                            complaint.createdAt
                          )}`}
                        >
                          {daysSinceCreated === 0
                            ? "Hôm nay"
                            : `${daysSinceCreated} ngày trước`}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Người báo cáo:</span>
                            {reporter &&
                              ("name" in reporter
                                ? reporter.name
                                : reporter.companyName)}
                            (
                            {complaint.reporterType === "worker"
                              ? "Người lao động"
                              : "Nhà tuyển dụng"}
                            )
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">
                              Đối tượng khiếu nại:
                            </span>
                            {target &&
                              ("name" in target
                                ? target.name
                                : target.companyName)}
                            (
                            {complaint.targetType === "worker"
                              ? "Người lao động"
                              : "Nhà tuyển dụng"}
                            )
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Ngày tạo:</span>{" "}
                            {new Date(complaint.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">ID:</span>{" "}
                            {complaint.id}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-gray-700">
                          <strong>Mô tả:</strong> {complaint.description}
                        </p>
                      </div>

                      {complaint.status === "open" && daysSinceCreated > 3 && (
                        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                          <p className="text-sm text-yellow-700">
                            <strong>Cần chú ý:</strong> Khiếu nại này đã được
                            tạo {daysSinceCreated} ngày trước và chưa được xử lý
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <button
                        onClick={() =>
                          setSelectedComplaint(
                            selectedComplaint === complaint.id
                              ? null
                              : complaint.id
                          )
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={20} />
                      </button>

                      {complaint.status === "open" && (
                        <button
                          onClick={() =>
                            handleComplaintAction("investigate", complaint.id)
                          }
                          className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                        >
                          Xử lý
                        </button>
                      )}

                      {complaint.status === "investigating" && (
                        <button
                          onClick={() =>
                            handleComplaintAction("resolve", complaint.id)
                          }
                          className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          Giải quyết
                        </button>
                      )}

                      {complaint.status === "resolved" && (
                        <button
                          onClick={() =>
                            handleComplaintAction("close", complaint.id)
                          }
                          className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                        >
                          Đóng
                        </button>
                      )}
                    </div>
                  </div>

                  {selectedComplaint === complaint.id && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h5 className="font-semibold text-gray-800 mb-2">
                        Chi tiết khiếu nại
                      </h5>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>
                          <strong>Thời gian:</strong>{" "}
                          {new Date(complaint.createdAt).toLocaleString(
                            "vi-VN"
                          )}
                        </p>
                        <p>
                          <strong>Loại khiếu nại:</strong> {complaint.subject}
                        </p>
                        <p>
                          <strong>Mô tả chi tiết:</strong>{" "}
                          {complaint.description}
                        </p>
                        <p>
                          <strong>Trạng thái hiện tại:</strong>{" "}
                          {getStatusText(complaint.status)}
                        </p>
                      </div>

                      <div className="mt-4 flex space-x-2">
                        <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          Gửi tin nhắn
                        </button>
                        <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Xem lịch sử
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminComplaints;
