import React, { useState } from "react";
import { Star, MessageSquare, User, Calendar } from "lucide-react";
import {
  mockRatings,
  mockContracts,
  mockWorkers,
  mockJobRequests,
} from "../../data/mockData";

interface EmployerRatingsProps {
  userId: string;
}

const EmployerRatings: React.FC<EmployerRatingsProps> = ({ userId }) => {
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [selectedContract, setSelectedContract] = useState<string>("");
  const [ratingForm, setRatingForm] = useState({
    score: 5,
    comment: "",
  });

  const employerContracts = mockContracts.filter(
    (c) => c.employerId === userId
  );
  const employerRatings = mockRatings.filter((r) => r.fromId === userId);
  const completedContracts = employerContracts.filter(
    (c) =>
      c.status === "completed" &&
      !employerRatings.some((rating) => rating.contractId === c.id)
  );

  const averageRating =
    employerRatings.length > 0
      ? employerRatings.reduce((sum, rating) => sum + rating.score, 0) /
        employerRatings.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: employerRatings.filter((r) => r.score === star).length,
    percentage:
      employerRatings.length > 0
        ? (employerRatings.filter((r) => r.score === star).length /
            employerRatings.length) *
          100
        : 0,
  }));

  const handleSubmitRating = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to backend
    console.log(
      "Submitting rating for contract:",
      selectedContract,
      ratingForm
    );
    alert("Đánh giá đã được gửi thành công!");
    setShowRatingForm(false);
    setSelectedContract("");
    setRatingForm({ score: 5, comment: "" });
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng đánh giá</p>
              <p className="text-2xl font-bold text-gray-900">
                {employerRatings.length}
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
              <p className="text-sm text-gray-600">Điểm trung bình</p>
              <p className="text-2xl font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chờ đánh giá</p>
              <p className="text-2xl font-bold text-gray-900">
                {completedContracts.length}
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
              <p className="text-sm text-gray-600">5 sao</p>
              <p className="text-2xl font-bold text-gray-900">
                {ratingDistribution.find((r) => r.star === 5)?.count || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Star className="text-orange-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Rating Overview */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Tổng quan đánh giá
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 ${
                      star <= Math.round(averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{employerRatings.length} đánh giá</p>
            </div>
          </div>

          <div className="space-y-3">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 w-6">
                  {star}
                </span>
                <Star className="text-yellow-400 w-4 h-4" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rate Workers */}
      {completedContracts.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Đánh giá người lao động
              </h3>
              <p className="text-gray-600">
                Có {completedContracts.length} hợp đồng chờ đánh giá
              </p>
            </div>
            <button
              onClick={() => setShowRatingForm(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Đánh giá ngay
            </button>
          </div>

          {showRatingForm && (
            <form
              onSubmit={handleSubmitRating}
              className="border-t border-gray-200 pt-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn hợp đồng để đánh giá
                </label>
                <select
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  required
                >
                  <option value="">Chọn hợp đồng...</option>
                  {completedContracts.map((contract) => {
                    const worker = mockWorkers.find(
                      (w) => w.id === contract.workerId
                    );
                    const jobRequest = mockJobRequests.find(
                      (j) => j.id === contract.jobRequestId
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
                  Điểm đánh giá
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setRatingForm({ ...ratingForm, score: star })
                      }
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= ratingForm.score
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-medium text-gray-900">
                    {ratingForm.score}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhận xét
                </label>
                <textarea
                  value={ratingForm.comment}
                  onChange={(e) =>
                    setRatingForm({ ...ratingForm, comment: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Chia sẻ trải nghiệm làm việc với người lao động..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Gửi đánh giá
                </button>
                <button
                  type="button"
                  onClick={() => setShowRatingForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Ratings List */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Lịch sử đánh giá
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {employerRatings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Star className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Chưa có đánh giá nào</p>
            </div>
          ) : (
            employerRatings.map((rating) => {
              const contract = mockContracts.find(
                (c) => c.id === rating.contractId
              );
              const worker = mockWorkers.find(
                (w) => w.id === contract?.workerId
              );
              const jobRequest = mockJobRequests.find(
                (j) => j.id === contract?.jobRequestId
              );

              return (
                <div key={rating.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="text-white" size={20} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {worker?.name}
                        </h4>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= rating.score
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {rating.score}/5
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        Công việc: {jobRequest?.title || "Không xác định"}
                      </p>

                      <p className="text-gray-700 mb-2">{rating.comment}</p>

                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>
                          {new Date(rating.date).toLocaleDateString("vi-VN")}
                        </span>
                      </div>
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

export default EmployerRatings;
