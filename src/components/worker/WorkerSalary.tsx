import React from "react";
import { DollarSign, Calendar, TrendingUp, Download } from "lucide-react";
import {
  mockPayments,
  mockContracts,
  mockJobRequests,
} from "../../data/mockData";

interface WorkerSalaryProps {
  userId: string;
}

const WorkerSalary: React.FC<WorkerSalaryProps> = ({ userId }) => {
  const workerContracts = mockContracts.filter((c) => c.workerId === userId);
  const workerPayments = mockPayments.filter((p) =>
    workerContracts.some((c) => c.id === p.contractId)
  );

  const totalEarnings = workerPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  const thisMonthEarnings = workerPayments
    .filter((p) => {
      const paymentDate = new Date(p.date);
      const now = new Date();
      return (
        paymentDate.getMonth() === now.getMonth() &&
        paymentDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, payment) => sum + payment.amount, 0);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "failed":
        return "Thất bại";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "bank_transfer":
        return "Chuyển khoản";
      case "e_wallet":
        return "Ví điện tử";
      case "cash":
        return "Tiền mặt";
      default:
        return method;
    }
  };

  return (
    <div className="space-y-6">
      {/* Salary Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng thu nhập</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalEarnings.toLocaleString()} VND
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Thu nhập tháng này</p>
              <p className="text-2xl font-bold text-gray-900">
                {thisMonthEarnings.toLocaleString()} VND
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Trung bình/tháng</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(totalEarnings / 3).toLocaleString()} VND
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Current Salary Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Thông tin lương hiện tại
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {workerContracts
            .filter((c) => c.status === "active")
            .map((contract) => {
              const jobRequest = mockJobRequests.find(
                (j) => j.id === contract.jobRequestId
              );

              return (
                <div
                  key={contract.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {jobRequest?.title || "Công việc không xác định"}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lương cơ bản:</span>
                      <span className="font-medium">
                        {contract.salary.toLocaleString()} VND/ngày
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày bắt đầu:</span>
                      <span className="font-medium">
                        {new Date(contract.startDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trạng thái:</span>
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                        Đang hoạt động
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            Lịch sử thanh toán
          </h3>
          <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
            <Download size={20} />
            <span>Xuất báo cáo</span>
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {workerPayments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <DollarSign className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Chưa có lịch sử thanh toán</p>
            </div>
          ) : (
            workerPayments.map((payment) => {
              const contract = mockContracts.find(
                (c) => c.id === payment.contractId
              );
              const jobRequest = mockJobRequests.find(
                (j) => j.id === contract?.jobRequestId
              );

              return (
                <div key={payment.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">
                        {jobRequest?.title || "Công việc không xác định"}
                      </h4>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span>
                          Ngày:{" "}
                          {new Date(payment.date).toLocaleDateString("vi-VN")}
                        </span>
                        <span>
                          Phương thức: {getPaymentMethodText(payment.method)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {payment.amount.toLocaleString()} VND
                      </p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                          payment.status
                        )}`}
                      >
                        {getPaymentStatusText(payment.status)}
                      </span>
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

export default WorkerSalary;
