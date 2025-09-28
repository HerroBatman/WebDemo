import React, { useState } from "react";
import {
  Search,
  Filter,
  Edit3,
  Pause,
  Trash2,
  Eye,
  MapPin,
  Calendar,
  Users,
  Clock,
} from "lucide-react";

const ManageJobs: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const jobs = [
    {
      id: 1,
      title: "Phụ bếp nhà hàng - Ca tối",
      location: "123 Đường Nguyễn Thị Minh Khai, Q.1, TP.HCM",
      date: "25/12/2024",
      time: "17:00 - 23:00",
      needed: 3,
      confirmed: 3,
      salary: "150,000 VNĐ/ca",
      status: "full",
      statusText: "Đủ người",
    },
    {
      id: 2,
      title: "Bốc vác kho hàng",
      location: "456 Đường Lê Văn Sỹ, Q.3, TP.HCM",
      date: "26/12/2024",
      time: "08:00 - 17:00",
      needed: 5,
      confirmed: 2,
      salary: "200,000 VNĐ/ngày",
      status: "recruiting",
      statusText: "Đang tuyển",
    },
    {
      id: 3,
      title: "Phục vụ sự kiện cuối năm",
      location: "789 Đường Cộng Hòa, Q.Tân Bình, TP.HCM",
      date: "31/12/2024",
      time: "18:00 - 02:00",
      needed: 8,
      confirmed: 6,
      salary: "300,000 VNĐ/ca",
      status: "recruiting",
      statusText: "Đang tuyển",
    },
    {
      id: 4,
      title: "Dọn dẹp văn phòng",
      location: "321 Đường Võ Văn Tần, Q.3, TP.HCM",
      date: "20/12/2024",
      time: "09:00 - 12:00",
      needed: 2,
      confirmed: 2,
      salary: "120,000 VNĐ/ca",
      status: "completed",
      statusText: "Hoàn thành",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recruiting":
        return "bg-blue-100 text-blue-800";
      case "full":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Quản lý các yêu cầu tuyển dụng
        </h1>
        <p className="text-gray-600 mt-2">
          Quản lý tất cả các yêu cầu tuyển dụng đã đăng
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm công việc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tất cả</option>
                <option value="recruiting">Đang tuyển</option>
                <option value="full">Đủ người</option>
                <option value="completed">Hoàn thành</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Công việc
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Thời gian & Địa điểm
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Số lượng
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Lương
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        ID: #{job.id.toString().padStart(4, "0")}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{job.date}</span>
                        <Clock className="w-3 h-3 ml-2 mr-1" />
                        <span>{job.time}</span>
                      </div>
                      <div className="flex items-start text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{job.location}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">
                        {job.confirmed}
                      </span>
                      <span className="text-gray-500">/{job.needed}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-blue-600 h-1 rounded-full"
                        style={{
                          width: `${(job.confirmed / job.needed) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-green-600">
                      {job.salary}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        job.status
                      )}`}
                    >
                      {job.statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded transition-colors">
                        <Pause className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">
            {jobs.filter((j) => j.status === "recruiting").length}
          </div>
          <div className="text-sm text-blue-600">Đang tuyển</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">
            {jobs.filter((j) => j.status === "full").length}
          </div>
          <div className="text-sm text-green-600">Đủ người</div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">
            {jobs.filter((j) => j.status === "completed").length}
          </div>
          <div className="text-sm text-gray-600">Hoàn thành</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">
            {jobs.reduce((sum, job) => sum + job.needed, 0)}
          </div>
          <div className="text-sm text-orange-600">Tổng LĐ cần</div>
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
