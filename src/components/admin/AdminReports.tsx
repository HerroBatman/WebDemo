import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Download,
  Filter,
} from "lucide-react";
import {
  mockWorkers,
  mockEmployers,
  mockContracts,
  mockPayments,
  mockJobRequests,
} from "../../data/mockData";

const AdminReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedReport, setSelectedReport] = useState("overview");

  // Calculate statistics
  const totalUsers = mockWorkers.length + mockEmployers.length;
  const activeWorkers = mockWorkers.filter((w) => w.isActive).length;
  const verifiedEmployers = mockEmployers.filter((e) => e.isVerified).length;
  const activeContracts = mockContracts.filter(
    (c) => c.status === "active"
  ).length;
  const completedContracts = mockContracts.filter(
    (c) => c.status === "completed"
  ).length;
  const totalRevenue = mockPayments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  const activeJobs = mockJobRequests.filter(
    (j) => j.status === "active"
  ).length;

  // Mock chart data
  const userGrowthData = [
    { month: "T1", workers: 15, employers: 8 },
    { month: "T2", workers: 25, employers: 12 },
    { month: "T3", workers: 35, employers: 18 },
    { month: "T4", workers: 42, employers: 22 },
    { month: "T5", workers: 48, employers: 28 },
    { month: "T6", workers: 52, employers: 32 },
  ];

  const revenueData = [
    { month: "T1", revenue: 15000000 },
    { month: "T2", revenue: 22000000 },
    { month: "T3", revenue: 28000000 },
    { month: "T4", revenue: 35000000 },
    { month: "T5", revenue: 42000000 },
    { month: "T6", revenue: 48000000 },
  ];

  const topSkills = [
    { skill: "Xây dựng", count: 25, percentage: 48 },
    { skill: "Điện lạnh", count: 18, percentage: 35 },
    { skill: "Làm vệ sinh", count: 15, percentage: 29 },
    { skill: "Nấu ăn", count: 12, percentage: 23 },
    { skill: "Chăm sóc", count: 8, percentage: 15 },
  ];

  const handleExportReport = () => {
    alert("Đang xuất báo cáo...");
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex space-x-4">
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="overview">Tổng quan</option>
              <option value="users">Người dùng</option>
              <option value="revenue">Doanh thu</option>
              <option value="jobs">Việc làm</option>
            </select>

            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm này</option>
            </select>
          </div>

          <button
            onClick={handleExportReport}
            className="flex items-center space-x-2 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            <Download size={20} />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng người dùng</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              <p className="text-sm text-green-600 mt-1">
                +12% so với tháng trước
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
              <p className="text-sm text-gray-600">Hợp đồng hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeContracts}
              </p>
              <p className="text-sm text-green-600 mt-1">
                +8% so với tháng trước
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalRevenue.toLocaleString()} VND
              </p>
              <p className="text-sm text-green-600 mt-1">
                +15% so với tháng trước
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-orange-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockContracts.length > 0
                  ? Math.round(
                      (completedContracts / mockContracts.length) * 100
                    )
                  : 0}
                %
              </p>
              <p className="text-sm text-green-600 mt-1">
                +5% so với tháng trước
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tăng trưởng người dùng
          </h3>
          <div className="space-y-4">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600 w-8">
                  {data.month}
                </span>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(data.workers / 60) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12">
                      {data.workers}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(data.employers / 40) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12">
                      {data.employers}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>Người lao động</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>Nhà tuyển dụng</span>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Doanh thu theo tháng
          </h3>
          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600 w-8">
                  {data.month}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full"
                        style={{ width: `${(data.revenue / 50000000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">
                    {data.revenue.toLocaleString()} VND
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Skills */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Kỹ năng phổ biến
          </h3>
          <div className="space-y-4">
            {topSkills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900 w-20">
                  {skill.skill}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${skill.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{skill.count} người</span>
                    <span>{skill.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tình trạng hệ thống
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="font-medium text-gray-900">
                  Người dùng hoạt động
                </span>
              </div>
              <span className="text-green-600 font-semibold">
                {activeWorkers + verifiedEmployers}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="font-medium text-gray-900">
                  Việc làm đang tuyển
                </span>
              </div>
              <span className="text-blue-600 font-semibold">{activeJobs}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="font-medium text-gray-900">
                  Hợp đồng hoạt động
                </span>
              </div>
              <span className="text-orange-600 font-semibold">
                {activeContracts}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="font-medium text-gray-900">
                  Tỷ lệ thành công
                </span>
              </div>
              <span className="text-purple-600 font-semibold">
                {mockContracts.length > 0
                  ? Math.round(
                      (completedContracts / mockContracts.length) * 100
                    )
                  : 0}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
