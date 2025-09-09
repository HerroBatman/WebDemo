import React from "react";
import {
  FileText,
  Calendar,
  DollarSign,
  User,
  MapPin,
  Clock,
} from "lucide-react";
import {
  mockContracts,
  mockWorkers,
  mockJobRequests,
} from "../../data/mockData";

interface EmployerContractsProps {
  userId: string;
}

const EmployerContracts: React.FC<EmployerContractsProps> = ({ userId }) => {
  const employerContracts = mockContracts.filter(
    (c) => c.employerId === userId
  );

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
                {employerContracts.length}
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
                {employerContracts.filter((c) => c.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chi phí hàng tháng</p>
              <p className="text-2xl font-bold text-gray-900">
                {employerContracts
                  .filter((c) => c.status === "active")
                  .reduce((sum, c) => sum + c.salary * 22, 0)
                  .toLocaleString()}{" "}
                VND
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Danh sách hợp đồng dịch vụ
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {employerContracts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FileText className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Chưa có hợp đồng nào</p>
            </div>
          ) : (
            employerContracts.map((contract) => {
              const worker = mockWorkers.find(
                (w) => w.id === contract.workerId
              );
              const jobRequest = mockJobRequests.find(
                (j) => j.id === contract.jobRequestId
              );

              return (
                <div
                  key={contract.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {jobRequest?.title || "Công việc không xác định"}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            contract.status
                          )}`}
                        >
                          {getStatusText(contract.status)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User size={16} />
                            <span>Người lao động: {worker?.name}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <MapPin size={16} />
                            <span>Địa chỉ: {worker?.address}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar size={16} />
                            <span>
                              Bắt đầu:{" "}
                              {new Date(contract.startDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <DollarSign size={16} />
                            <span>
                              Lương: {contract.salary.toLocaleString()} VND/ngày
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock size={16} />
                            <span>
                              Kết thúc:{" "}
                              {contract.endDate
                                ? new Date(contract.endDate).toLocaleDateString(
                                    "vi-VN"
                                  )
                                : "Chưa xác định"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Điều khoản:</strong> {contract.terms}
                        </p>
                      </div>

                      {contract.status === "active" && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-blue-700 font-medium">
                              Tiến độ thực hiện:
                            </span>
                            <span className="text-blue-600">
                              75% hoàn thành
                            </span>
                          </div>
                          <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                        Xem chi tiết
                      </button>

                      {contract.status === "active" && (
                        <>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                            Theo dõi
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            Chỉnh sửa
                          </button>
                        </>
                      )}

                      {contract.status === "completed" && (
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm">
                          Đánh giá
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

export default EmployerContracts;
