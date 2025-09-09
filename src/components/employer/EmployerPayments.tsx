import React, { useState } from "react";
import {
  CreditCard,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  X,
  Plus,
} from "lucide-react";
import {
  mockPayments,
  mockContracts,
  mockJobRequests,
  mockWorkers,
} from "../../data/mockData";

interface EmployerPaymentsProps {
  userId: string;
}

const EmployerPayments: React.FC<EmployerPaymentsProps> = ({ userId }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    contractId: "",
    amount: "",
    method: "bank_transfer" as "bank_transfer" | "e_wallet" | "cash",
  });

  const employerContracts = mockContracts.filter(
    (c) => c.employerId === userId
  );
  const contractIds = employerContracts.map((c) => c.id);
  const employerPayments = mockPayments.filter((p) =>
    contractIds.includes(p.contractId)
  );

  const totalPaid = employerPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = employerPayments.filter(
    (p) => p.status === "pending"
  );
  const monthlyBudget = employerContracts
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + c.salary * 22, 0);

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

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the payment
    console.log("Processing payment:", paymentForm);
    alert("Thanh toán đã được xử lý thành công!");
    setShowPaymentForm(false);
    setPaymentForm({
      contractId: "",
      amount: "",
      method: "bank_transfer",
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng đã thanh toán</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalPaid.toLocaleString()} VND
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
                {pendingPayments.length}
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
              <p className="text-sm text-gray-600">Ngân sách tháng</p>
              <p className="text-2xl font-bold text-gray-900">
                {monthlyBudget.toLocaleString()} VND
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Giao dịch/tháng</p>
              <p className="text-2xl font-bold text-gray-900">
                {employerPayments.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <CreditCard className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Action */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Thanh toán online
            </h3>
            <p className="text-gray-600">
              Thanh toán lương cho người lao động một cách nhanh chóng
            </p>
          </div>
          <button
            onClick={() => setShowPaymentForm(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus size={20} />
            <span>Tạo thanh toán</span>
          </button>
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  Tạo thanh toán mới
                </h3>
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handlePayment} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hợp đồng
                </label>
                <select
                  value={paymentForm.contractId}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      contractId: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Chọn hợp đồng...</option>
                  {employerContracts
                    .filter((c) => c.status === "active")
                    .map((contract) => {
                      const jobRequest = mockJobRequests.find(
                        (j) => j.id === contract.jobRequestId
                      );
                      const worker = mockWorkers.find(
                        (w) => w.id === contract.workerId
                      );
                      return (
                        <option key={contract.id} value={contract.id}>
                          {jobRequest?.title} - {worker?.name}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số tiền (VND)
                </label>
                <input
                  type="number"
                  value={paymentForm.amount}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, amount: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập số tiền..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phương thức thanh toán
                </label>
                <select
                  value={paymentForm.method}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      method: e.target.value as
                        | "bank_transfer"
                        | "e_wallet"
                        | "cash",
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="bank_transfer">Chuyển khoản</option>
                  <option value="e_wallet">Ví điện tử</option>
                  <option value="cash">Tiền mặt</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <CreditCard size={20} />
                  <span>Thanh toán</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payments History */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Lịch sử thanh toán
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {employerPayments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <CreditCard className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Chưa có lịch sử thanh toán</p>
            </div>
          ) : (
            employerPayments.map((payment) => {
              const contract = mockContracts.find(
                (c) => c.id === payment.contractId
              );
              const jobRequest = mockJobRequests.find(
                (j) => j.id === contract?.jobRequestId
              );
              const worker = mockWorkers.find(
                (w) => w.id === contract?.workerId
              );

              return (
                <div
                  key={payment.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {jobRequest?.title || "Công việc không xác định"}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Thanh toán cho: {worker?.name}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>
                            {new Date(payment.date).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        <span>
                          Phương thức: {getMethodText(payment.method)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {payment.amount.toLocaleString()} VND
                      </p>
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {getStatusText(payment.status)}
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

export default EmployerPayments;
