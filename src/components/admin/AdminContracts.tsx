import React, { useState } from "react";
import {
  FileText,
  Search,
  Calendar,
  DollarSign,
  User,
  Building2,
  Eye,
  Edit,
} from "lucide-react";
import {
  mockContracts,
  mockWorkers,
  mockEmployers,
  mockJobRequests,
} from "../../data/mockData";

const AdminContracts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredContracts = mockContracts.filter((contract) => {
    const worker = mockWorkers.find((w) => w.id === contract.workerId);
    const employer = mockEmployers.find((e) => e.id === contract.employerId);
    const jobRequest = mockJobRequests.find(
      (j) => j.id === contract.jobRequestId
    );

    const matchesSearch =
      worker?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer?.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobRequest?.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || contract.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  const handleContractAction = (action: string, contractId: string) => {
    console.log(`${action} contract ${contractId}`);
    alert(
      `Đã ${
        action === "approve"
          ? "phê duyệt"
          : action === "terminate"
          ? "hủy"
          : "thực hiện"
      } hợp đồng thành công!`
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng hợp đồng</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockContracts.length}
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
                {mockContracts.filter((c) => c.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockContracts.filter((c) => c.status === "completed").length}
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
              <p className="text-sm text-gray-600">Tổng giá trị</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockContracts
                  .reduce((sum, c) => sum + c.salary * 30, 0)
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
              placeholder="Tìm kiếm theo tên công việc, người lao động hoặc công ty..."
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
            <option value="active">Đang thực hiện</option>
            <option value="completed">Hoàn thành</option>
            <option value="terminated">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Danh sách hợp đồng
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredContracts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <FileText className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Không tìm thấy hợp đồng nào</p>
            </div>
          ) : (
            filteredContracts.map((contract) => {
              const worker = mockWorkers.find(
                (w) => w.id === contract.workerId
              );
              const employer = mockEmployers.find(
                (e) => e.id === contract.employerId
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

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User size={16} />
                            <span>Người lao động: {worker?.name}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Building2 size={16} />
                            <span>Công ty: {employer?.companyName}</span>
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

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <DollarSign size={16} />
                            <span>
                              Lương: {contract.salary.toLocaleString()} VND/ngày
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar size={16} />
                            <span>
                              Kết thúc:{" "}
                              {contract.endDate
                                ? new Date(contract.endDate).toLocaleDateString(
                                    "vi-VN"
                                  )
                                : "Chưa xác định"}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span>ID: {contract.id}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Điều khoản:</strong> {contract.terms}
                        </p>
                      </div>

                      {contract.status === "active" && (
                        <div className="mt-3 flex items-center space-x-4 text-sm">
                          <span className="text-green-600 font-medium">
                            Tiến độ: 75% hoàn thành
                          </span>
                          <span className="text-blue-600">
                            Ước tính hoàn thành:{" "}
                            {new Date(
                              Date.now() + 7 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 ml-6">
                      <button
                        onClick={() =>
                          handleContractAction("view", contract.id)
                        }
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={20} />
                      </button>
                      <button
                        onClick={() =>
                          handleContractAction("edit", contract.id)
                        }
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <Edit size={20} />
                      </button>
                      {contract.status === "active" && (
                        <button
                          onClick={() =>
                            handleContractAction("terminate", contract.id)
                          }
                          className="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-sm"
                        >
                          Hủy hợp đồng
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

export default AdminContracts;
