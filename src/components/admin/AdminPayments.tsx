import React, { useState } from "react";
import {
  CreditCard,
  Search,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  X,
  Filter,
} from "lucide-react";
import {
  mockPayments,
  mockContracts,
  mockWorkers,
  mockEmployers,
  mockJobRequests,
} from "../../data/mockData";

const AdminPayments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const filteredPayments = mockPayments.filter((payment) => {
    const contract = mockContracts.find((c) => c.id === payment.contractId);
    const worker = mockWorkers.find((w) => w.id === contract?.workerId);
    const employer = mockEmployers.find((e) => e.id === contract?.employerId);
    const jobRequest = mockJobRequests.find(
      (j) => j.id === contract?.jobRequestId
    );

    const matchesSearch =
      worker?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employer?.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobRequest?.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || payment.method === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const completedAmount = filteredPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = filteredPayments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const getStatusColor = (status: string) => {
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

  const getStatusText = (status: string) => {
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

  const getMethodText = (method: string) => {
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

  const handlePaymentAction = (action: string, paymentId: string) => {
    console.log(`${action} payment ${paymentId}`);
    alert(
      `Đã ${
        action === "approve"
          ? "phê duyệt"
          : action === "reject"
          ? "từ chối"
          : "thực hiện"
      } thanh toán thành công!`
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng giao dịch</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredPayments.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã thanh toán</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedAmount.toLocaleString()} VND
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chờ thanh toán</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingAmount.toLocaleString()} VND
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
              <p className="text-sm text-gray-600">Tổng giá trị</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalAmount.toLocaleString()} VND
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
              placeholder="Tìm kiếm theo tên người lao động, công ty hoặc công việc..."
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
              <option value="completed">Đã thanh toán</option>
              <option value="pending">Chờ thanh toán</option>
              <option value="failed">Thất bại</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="all">Tất cả phương thức</option>
              <option value="bank_transfer">Chuyển khoản</option>
              <option value="e_wallet">Ví điện tử</option>
              <option value="cash">Tiền mặt</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Danh sách thanh toán
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredPayments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <CreditCard className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Không tìm thấy giao dịch nào</p>
            </div>
          ) : (
            filteredPayments.map((payment) => {
              const contract = mockContracts.find(
                (c) => c.id === payment.contractId
              );
              const worker = mockWorkers.find(
                (w) => w.id === contract?.workerId
              );
              const employer = mockEmployers.find(
                (e) => e.id === contract?.employerId
              );
              const jobRequest = mockJobRequests.find(
                (j) => j.id === contract?.jobRequestId
              );

              return (
                <div
                  key={payment.id}
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
                            payment.status
                          )}`}
                        >
                          {getStatusText(payment.status)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Từ:</span>{" "}
                            {employer?.companyName}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Đến:</span>{" "}
                            {worker?.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Phương thức:</span>{" "}
                            {getMethodText(payment.method)}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Ngày:</span>{" "}
                            {new Date(payment.date).toLocaleDateString("vi-VN")}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">Số tiền:</span>
                            <span className="text-lg font-bold text-gray-900 ml-2">
                              {payment.amount.toLocaleString()} VND
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="font-medium">ID giao dịch:</span>{" "}
                            {payment.id}
                          </div>
                        </div>
                      </div>

                      {payment.status === "pending" && (
                        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                          <p className="text-sm text-yellow-700">
                            <strong>Chờ xử lý:</strong> Giao dịch này đang chờ
                            được phê duyệt
                          </p>
                        </div>
                      )}

                      {payment.status === "failed" && (
                        <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                          <p className="text-sm text-red-700">
                            <strong>Thất bại:</strong> Giao dịch không thể hoàn
                            thành
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 ml-6">
                      {payment.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handlePaymentAction("approve", payment.id)
                            }
                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                          >
                            Phê duyệt
                          </button>
                          <button
                            onClick={() =>
                              handlePaymentAction("reject", payment.id)
                            }
                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                          >
                            Từ chối
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => handlePaymentAction("view", payment.id)}
                        className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                      >
                        Chi tiết
                      </button>
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

export default AdminPayments;
