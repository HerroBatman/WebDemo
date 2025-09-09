import React from "react";
import { FileText, Calendar, DollarSign, User, Building } from "lucide-react";
import {
  mockContracts,
  mockJobRequests,
  mockEmployers,
} from "../../data/mockData";

interface WorkerContractsProps {
  userId: string;
}

const WorkerContracts: React.FC<WorkerContractsProps> = ({ userId }) => {
  const workerContracts = mockContracts.filter((c) => c.workerId === userId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "completed":
        return "text-blue-600 bg-blue-100";
      case "terminated":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Đang thực hiện";
      case "completed":
        return "Hoàn thành";
      case "terminated":
        return "Đã hủy";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng hợp đồng</p>
              <p className="text-2xl font-bold text-gray-900">
                {workerContracts.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đang thực hiện</p>
              <p className="text-2xl font-bold text-gray-900">
                {workerContracts.filter((c) => c.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">
                {workerContracts.filter((c) => c.status === "completed").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Danh sách hợp đồng
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {workerContracts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FileText className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Chưa có hợp đồng nào</p>
            </div>
          ) : (
            workerContracts.map((contract) => {
              const jobRequest = mockJobRequests.find(
                (j) => j.id === contract.jobRequestId
              );
              const employer = mockEmployers.find(
                (e) => e.id === contract.employerId
              );

              return (
                <div
                  key={contract.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {jobRequest?.title || "Công việc không xác định"}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            contract.status
                          )}`}
                        >
                          {getStatusText(contract.status)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Building size={16} />
                            <span>Công ty: {employer?.companyName}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User size={16} />
                            <span>Người liên hệ: {employer?.contactName}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar size={16} />
                            <span>
                              Bắt đầu:{" "}
                              {new Date(contract.startDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <DollarSign size={16} />
                            <span>
                              Lương: {contract.salary.toLocaleString()} VND/ngày
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Điều khoản:</strong> {contract.terms}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                        Xem chi tiết
                      </button>

                      {contract.status === "active" && (
                        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          Báo cáo vấn đề
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerContracts;
