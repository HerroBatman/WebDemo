import React from "react";
import { History, Calendar, MapPin, DollarSign, Star } from "lucide-react";
import {
  mockContracts,
  mockJobRequests,
  mockEmployers,
  mockRatings,
} from "../../data/mockData";

interface WorkerHistoryProps {
  userId: string;
}

const WorkerHistory: React.FC<WorkerHistoryProps> = ({ userId }) => {
  const workerContracts = mockContracts.filter((c) => c.workerId === userId);
  const completedContracts = workerContracts.filter(
    (c) => c.status === "completed"
  );
  const workerRatings = mockRatings.filter((r) => r.toId === userId);

  const totalJobs = workerContracts.length;
  const completedJobs = completedContracts.length;
  const averageRating =
    workerRatings.length > 0
      ? workerRatings.reduce((sum, rating) => sum + rating.score, 0) /
        workerRatings.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng công việc</p>
              <p className="text-2xl font-bold text-gray-900">{totalJobs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <History className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đã hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedJobs}
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
              <p className="text-sm text-gray-600">Đánh giá trung bình</p>
              <p className="text-2xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalJobs > 0
                  ? Math.round((completedJobs / totalJobs) * 100)
                  : 0}
                %
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Work History */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Lịch sử công việc
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {workerContracts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <History className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Chưa có lịch sử công việc</p>
            </div>
          ) : (
            workerContracts.map((contract) => {
              const jobRequest = mockJobRequests.find(
                (j) => j.id === contract.jobRequestId
              );
              const employer = mockEmployers.find(
                (e) => e.id === contract.employerId
              );
              const rating = workerRatings.find(
                (r) => r.contractId === contract.id
              );

              return (
                <div key={contract.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {jobRequest?.title || "Công việc không xác định"}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            contract.status === "completed"
                              ? "text-green-600 bg-green-100"
                              : contract.status === "active"
                              ? "text-blue-600 bg-blue-100"
                              : "text-red-600 bg-red-100"
                          }`}
                        >
                          {contract.status === "completed"
                            ? "Hoàn thành"
                            : contract.status === "active"
                            ? "Đang thực hiện"
                            : "Đã hủy"}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3">
                        {jobRequest?.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Công ty:</span>
                            <span>{employer?.companyName}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} />
                            <span>{jobRequest?.workLocation}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>
                              Từ{" "}
                              {new Date(contract.startDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                            {contract.endDate && (
                              <span>
                                đến{" "}
                                {new Date(contract.endDate).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign size={16} />
                            <span>
                              {contract.salary.toLocaleString()} VND/ngày
                            </span>
                          </div>
                        </div>
                      </div>

                      {rating && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Star className="text-yellow-500" size={16} />
                            <span className="font-semibold">
                              {rating.score}/5
                            </span>
                            <span className="text-sm text-gray-600">
                              Đánh giá từ {employer?.companyName}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">
                            {rating.comment}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="ml-6">
                      <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                        Xem chi tiết
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

export default WorkerHistory;
