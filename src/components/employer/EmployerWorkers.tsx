import React, { useState } from "react";
import {
  Users,
  Star,
  MapPin,
  Clock,
  Award,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { mockWorkers, mockJobRequests } from "../../data/mockData";

interface EmployerWorkersProps {
  userId: string;
}

const EmployerWorkers: React.FC<EmployerWorkersProps> = ({ userId }) => {
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [minRating, setMinRating] = useState(0);

  const employerJobs = mockJobRequests.filter((j) => j.employerId === userId);
  const allApplicants = employerJobs.reduce((acc: string[], job) => {
    return acc.concat(job.applicants || []);
  }, []);

  const applicantWorkers = mockWorkers.filter((w) =>
    allApplicants.includes(w.id)
  );
  const availableWorkers = mockWorkers.filter(
    (w) => !allApplicants.includes(w.id) && w.isActive
  );

  const allSkills = Array.from(new Set(mockWorkers.flatMap((w) => w.skills)));
  const allLocations = Array.from(
    new Set(mockWorkers.flatMap((w) => w.workArea))
  );

  const filteredWorkers = availableWorkers.filter((worker) => {
    const skillMatch = !selectedSkill || worker.skills.includes(selectedSkill);
    const locationMatch =
      !selectedLocation || worker.workArea.includes(selectedLocation);
    const ratingMatch = worker.rating >= minRating;

    return skillMatch && locationMatch && ratingMatch;
  });

  const handleSelectWorker = (workerId: string, jobId: string) => {
    // In a real app, this would update the backend
    console.log("Selecting worker:", workerId, "for job:", jobId);
    alert("Đã chọn ứng viên thành công!");
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng ứng viên</p>
              <p className="text-2xl font-bold text-gray-900">
                {applicantWorkers.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ứng viên phù hợp</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredWorkers.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Đánh giá trung bình</p>
              <p className="text-2xl font-bold text-gray-900">
                {applicantWorkers.length > 0
                  ? (
                      applicantWorkers.reduce((sum, w) => sum + w.rating, 0) /
                      applicantWorkers.length
                    ).toFixed(1)
                  : "0.0"}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Tìm kiếm ứng viên
        </h3>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kỹ năng
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Tất cả kỹ năng</option>
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khu vực
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Tất cả khu vực</option>
              {allLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đánh giá tối thiểu
            </label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value={0}>Tất cả</option>
              <option value={3}>3+ sao</option>
              <option value={4}>4+ sao</option>
              <option value={4.5}>4.5+ sao</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSelectedSkill("");
                setSelectedLocation("");
                setMinRating(0);
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {/* Applicants Section */}
      {applicantWorkers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Ứng viên đã nộp đơn
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            {applicantWorkers.map((worker) => {
              const appliedJobs = employerJobs.filter((job) =>
                job.applicants?.includes(worker.id)
              );

              return (
                <div
                  key={worker.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <Users className="text-white" size={24} />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {worker.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <Star className="text-yellow-400" size={16} />
                        <span>{worker.rating}</span>
                        <span>•</span>
                        <Award className="text-blue-500" size={16} />
                        <span>{worker.reputationScore} điểm</span>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} />
                          <span>{worker.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={14} />
                          <span>{worker.experience} năm kinh nghiệm</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {worker.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700">
                          Đã ứng tuyển:
                        </p>
                        {appliedJobs.map((job) => (
                          <p key={job.id} className="text-sm text-gray-600">
                            • {job.title}
                          </p>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleSelectWorker(worker.id, appliedJobs[0]?.id)
                          }
                          className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                        >
                          <UserCheck size={16} className="inline mr-1" />
                          Chọn ứng viên
                        </button>
                        <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          <MessageCircle size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Workers */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Ứng viên phù hợp ({filteredWorkers.length})
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {filteredWorkers.length === 0 ? (
            <div className="col-span-2 p-8 text-center text-gray-500">
              <Users className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Không tìm thấy ứng viên phù hợp</p>
            </div>
          ) : (
            filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <Users className="text-white" size={24} />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {worker.name}
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Star className="text-yellow-400" size={16} />
                      <span>{worker.rating}</span>
                      <span>•</span>
                      <Award className="text-blue-500" size={16} />
                      <span>{worker.reputationScore} điểm</span>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <MapPin size={14} />
                        <span>{worker.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={14} />
                        <span>{worker.experience} năm kinh nghiệm</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {worker.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                        Mời ứng tuyển
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                        <MessageCircle size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerWorkers;
