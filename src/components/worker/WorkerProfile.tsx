import React, { useState } from "react";
import { User, MapPin, Clock, Award, Star, Edit, Save, X } from "lucide-react";
import { mockWorkers } from "../../data/mockData";

interface WorkerProfileProps {
  userId: string;
}

const WorkerProfile: React.FC<WorkerProfileProps> = ({ userId }) => {
  const worker = mockWorkers.find((w) => w.id === userId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(worker || {});

  if (!worker) {
    return <div>Không tìm thấy thông tin người lao động</div>;
  }

  const handleSave = () => {
    // In a real app, this would update the database
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={48} />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:border-blue-500 outline-none"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-800">
                  {worker.name}
                </h2>
              )}
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400" size={20} />
                  <span className="font-semibold">{worker.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Award className="text-blue-500" size={20} />
                  <span className="font-semibold">
                    {worker.reputationScore} điểm uy tín
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  <Save size={20} />
                  <span>Lưu</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  <X size={20} />
                  <span>Hủy</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <Edit size={20} />
                <span>Chỉnh sửa</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">{worker.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900">{worker.phone}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa chỉ
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            ) : (
              <p className="text-gray-900 flex items-center">
                <MapPin className="mr-2 text-gray-400" size={16} />
                {worker.address}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Skills & Experience */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Kỹ năng</h3>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Kinh nghiệm
          </h3>
          <div className="flex items-center space-x-2">
            <Clock className="text-gray-400" size={20} />
            <span className="text-lg font-semibold text-gray-900">
              {worker.experience} năm
            </span>
          </div>
        </div>
      </div>

      {/* Qualifications */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Bằng cấp & Chứng chỉ
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {worker.qualifications.map((qualification, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <Award className="text-yellow-500" size={20} />
              <span className="text-gray-900">{qualification}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Thời gian có thể làm việc
          </h3>
          <div className="flex items-center space-x-2">
            <Clock className="text-gray-400" size={20} />
            <span className="text-gray-900">{worker.availableTime}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Khu vực làm việc
          </h3>
          <div className="space-y-2">
            {worker.workArea.map((area, index) => (
              <div key={index} className="flex items-center space-x-2">
                <MapPin className="text-gray-400" size={16} />
                <span className="text-gray-900">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
