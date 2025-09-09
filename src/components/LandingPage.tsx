import React from "react";
import { Users, Building2, Shield, ArrowRight } from "lucide-react";
import { UserType } from "../types";

interface LandingPageProps {
  onLogin: (userType: UserType, userId: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const userTypes = [
    {
      type: "worker" as UserType,
      title: "Người lao động",
      description:
        "Tìm kiếm công việc phù hợp, quản lý hồ sơ và theo dõi thu nhập",
      icon: Users,
      color: "bg-blue-500 hover:bg-blue-600",
      features: [
        "Quản lý hồ sơ cá nhân",
        "Tìm kiếm việc làm",
        "Check-in/Check-out",
        "Quản lý lương",
      ],
    },
    {
      type: "employer" as UserType,
      title: "Nhà tuyển dụng",
      description: "Tạo yêu cầu tuyển dụng và quản lý nhân sự",
      icon: Building2,
      color: "bg-green-500 hover:bg-green-600",
      features: [
        "Tạo yêu cầu tuyển dụng",
        "Tìm kiếm ứng viên",
        "Quản lý hợp đồng",
        "Thanh toán online",
      ],
    },
    {
      type: "admin" as UserType,
      title: "Quản trị viên",
      description: "Quản lý toàn bộ hệ thống và giải quyết tranh chấp",
      icon: Shield,
      color: "bg-orange-500 hover:bg-orange-600",
      features: [
        "Quản lý người dùng",
        "Xử lý khiếu nại",
        "Thống kê báo cáo",
        "Quản lý thanh toán",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Nền tảng quản lý lao động
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kết nối người lao động và nhà tuyển dụng một cách hiệu quả, minh
            bạch và an toàn
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {userTypes.map((userType) => {
            const Icon = userType.icon;
            return (
              <div
                key={userType.type}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div
                  className={`${userType.color} p-6 text-white text-center transition-colors duration-300`}
                >
                  <Icon className="mx-auto mb-4" size={48} />
                  <h2 className="text-2xl font-bold mb-2">{userType.title}</h2>
                  <p className="text-white/90">{userType.description}</p>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Tính năng chính:
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {userType.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <ArrowRight className="mr-2 text-gray-400" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      onLogin(
                        userType.type,
                        userType.type === "worker"
                          ? "w1"
                          : userType.type === "employer"
                          ? "e1"
                          : "admin"
                      )
                    }
                    className={`w-full py-3 px-6 rounded-lg text-white font-semibold ${userType.color} transition-all duration-300 flex items-center justify-center group`}
                  >
                    Đăng nhập
                    <ArrowRight
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                      size={16}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Tại sao chọn chúng tôi?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">An toàn & Bảo mật</h3>
              <p className="text-gray-600">
                Hệ thống bảo mật cao cấp, đảm bảo thông tin cá nhân được bảo vệ
                tuyệt đối
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dễ sử dụng</h3>
              <p className="text-gray-600">
                Giao diện thân thiện, dễ sử dụng cho mọi đối tượng người dùng
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Hiệu quả cao</h3>
              <p className="text-gray-600">
                Kết nối nhanh chóng, quản lý hiệu quả, tiết kiệm thời gian và
                chi phí
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
