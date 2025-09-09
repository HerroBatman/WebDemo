import React from "react";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
} from "lucide-react";
import {
  mockContracts,
  mockWorkers,
  mockJobRequests,
  mockCheckInOuts,
} from "../../data/mockData";

interface EmployerProgressProps {
  userId: string;
}

const EmployerProgress: React.FC<EmployerProgressProps> = ({ userId }) => {
  const employerContracts = mockContracts.filter(
    (c) => c.employerId === userId
  );
  const activeContracts = employerContracts.filter(
    (c) => c.status === "active"
  );

  // Mock progress data for demonstration
  const contractProgress = activeContracts.map((contract) => {
    const worker = mockWorkers.find((w) => w.id === contract.workerId);
    const jobRequest = mockJobRequests.find(
      (j) => j.id === contract.jobRequestId
    );
    const checkIns = mockCheckInOuts.filter(
      (ci) => ci.contractId === contract.id
    );

    // Calculate mock progress
    const startDate = new Date(contract.startDate);
    const today = new Date();
    const daysPassed = Math.floor(
      (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const expectedDays = 30; // Assume 30-day project
    const progress = Math.min((daysPassed / expectedDays) * 100, 100);

    return {
      ...contract,
      worker,
      jobRequest,
      progress: Math.round(progress),
      daysWorked: checkIns.length,
      lastCheckIn:
        checkIns.length > 0 ? checkIns[checkIns.length - 1].checkInTime : null,
      status:
        progress >= 100
          ? "completed"
          : progress >= 80
          ? "on_track"
          : progress >= 50
          ? "behind"
          : "critical",
    };
  });

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "on_track":
        return "text-blue-600 bg-blue-100";
      case "behind":
        return "text-yellow-600 bg-yellow-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getProgressText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "on_track":
        return "Đúng tiến độ";
      case "behind":
        return "Chậm tiến độ";
      case "critical":
        return "Cần chú ý";
      default:
        return "Không xác định";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle;
      case "on_track":
        return TrendingUp;
      case "behind":
        return Clock;
      case "critical":
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const overallProgress =
    contractProgress.length > 0
      ? Math.round(
          contractProgress.reduce((sum, c) => sum + c.progress, 0) /
            contractProgress.length
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tiến độ tổng thể</p>
              <p className="text-2xl font-bold text-gray-900">
                {overallProgress}%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dự án đang thực hiện</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeContracts.length}
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
              <p className="text-sm text-gray-600">Đúng tiến độ</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  contractProgress.filter(
                    (c) => c.status === "on_track" || c.status === "completed"
                  ).length
                }
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
              <p className="text-sm text-gray-600">Cần chú ý</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  contractProgress.filter(
                    (c) => c.status === "behind" || c.status === "critical"
                  ).length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Tiến độ tổng quan
        </h3>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Tiến độ chung
            </span>
            <span className="text-sm font-medium text-gray-900">
              {overallProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              Trạng thái dự án
            </h4>
            <div className="space-y-2">
              {[
                {
                  status: "completed",
                  label: "Hoàn thành",
                  color: "bg-green-500",
                },
                {
                  status: "on_track",
                  label: "Đúng tiến độ",
                  color: "bg-blue-500",
                },
                {
                  status: "behind",
                  label: "Chậm tiến độ",
                  color: "bg-yellow-500",
                },
                { status: "critical", label: "Cần chú ý", color: "bg-red-500" },
              ].map(({ status, label, color }) => {
                const count = contractProgress.filter(
                  (c) => c.status === status
                ).length;
                const percentage =
                  contractProgress.length > 0
                    ? (count / contractProgress.length) * 100
                    : 0;

                return (
                  <div key={status} className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${color}`} />
                    <span className="text-sm text-gray-700 flex-1">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              Thông tin làm việc
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Tổng ngày làm việc:</span>
                <span className="font-medium text-gray-900">
                  {contractProgress.reduce((sum, c) => sum + c.daysWorked, 0)}{" "}
                  ngày
                </span>
              </div>
              <div className="flex justify-between">
                <span>Trung bình/dự án:</span>
                <span className="font-medium text-gray-900">
                  {contractProgress.length > 0
                    ? Math.round(
                        contractProgress.reduce(
                          (sum, c) => sum + c.daysWorked,
                          0
                        ) / contractProgress.length
                      )
                    : 0}{" "}
                  ngày
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Individual Project Progress */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Theo dõi từng dự án
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {contractProgress.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <TrendingUp className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Không có dự án đang thực hiện</p>
            </div>
          ) : (
            contractProgress.map((contract) => {
              const StatusIcon = getStatusIcon(contract.status);

              return (
                <div key={contract.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {contract.jobRequest?.title ||
                            "Công việc không xác định"}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getProgressColor(
                            contract.status
                          )}`}
                        >
                          {getProgressText(contract.status)}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User size={16} />
                            <span>
                              Người thực hiện: {contract.worker?.name}
                            </span>
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
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock size={16} />
                            <span>Đã làm: {contract.daysWorked} ngày</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <TrendingUp size={16} />
                            <span>Tiến độ: {contract.progress}%</span>
                          </div>
                          {contract.lastCheckIn && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <CheckCircle size={16} />
                              <span>
                                Lần cuối check-in:{" "}
                                {new Date(
                                  contract.lastCheckIn
                                ).toLocaleDateString("vi-VN")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            Tiến độ hoàn thành
                          </span>
                          <span className="text-sm font-medium text-gray-900">
                            {contract.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              contract.status === "completed"
                                ? "bg-green-500"
                                : contract.status === "on_track"
                                ? "bg-blue-500"
                                : contract.status === "behind"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${contract.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center ml-6">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          contract.status === "completed"
                            ? "bg-green-100"
                            : contract.status === "on_track"
                            ? "bg-blue-100"
                            : contract.status === "behind"
                            ? "bg-yellow-100"
                            : "bg-red-100"
                        }`}
                      >
                        <StatusIcon
                          className={`${
                            contract.status === "completed"
                              ? "text-green-600"
                              : contract.status === "on_track"
                              ? "text-blue-600"
                              : contract.status === "behind"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                          size={24}
                        />
                      </div>

                      <button className="mt-3 text-blue-500 hover:text-blue-600 font-medium text-sm">
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

export default EmployerProgress;
