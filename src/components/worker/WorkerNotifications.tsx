import React from "react";
import {
  Bell,
  BellRing,
  Clock,
  Briefcase,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import { mockNotifications } from "../../data/mockData";

interface WorkerNotificationsProps {
  userId: string;
}

const WorkerNotifications: React.FC<WorkerNotificationsProps> = ({
  userId,
}) => {
  const userNotifications = mockNotifications.filter(
    (n) => n.userId === userId
  );

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "job_match":
        return Briefcase;
      case "application_update":
        return Bell;
      case "payment":
        return DollarSign;
      case "reminder":
        return Clock;
      case "system":
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getNotificationColor = (type: string, isRead: boolean) => {
    const opacity = isRead ? "50" : "100";
    switch (type) {
      case "job_match":
        return `bg-blue-${opacity}`;
      case "application_update":
        return `bg-green-${opacity}`;
      case "payment":
        return `bg-yellow-${opacity}`;
      case "reminder":
        return `bg-orange-${opacity}`;
      case "system":
        return `bg-red-${opacity}`;
      default:
        return `bg-gray-${opacity}`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tổng thông báo</p>
              <p className="text-2xl font-bold text-gray-900">
                {userNotifications.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Chưa đọc</p>
              <p className="text-2xl font-bold text-gray-900">
                {userNotifications.filter((n) => !n.isRead).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <BellRing className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hôm nay</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  userNotifications.filter((n) => {
                    const today = new Date().toDateString();
                    const notificationDate = new Date(
                      n.createdAt
                    ).toDateString();
                    return today === notificationDate;
                  }).length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Thông báo</h2>
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              Đánh dấu tất cả đã đọc
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {userNotifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="mx-auto mb-4 text-gray-300" size={48} />
              <p>Không có thông báo nào</p>
            </div>
          ) : (
            userNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);

              return (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${
                    !notification.isRead ? "bg-blue-50/50" : ""
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        notification.isRead ? "bg-gray-100" : "bg-blue-100"
                      }`}
                    >
                      <Icon
                        className={
                          notification.isRead
                            ? "text-gray-600"
                            : "text-blue-600"
                        }
                        size={20}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3
                            className={`text-sm font-semibold ${
                              notification.isRead
                                ? "text-gray-700"
                                : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <p
                            className={`text-sm mt-1 ${
                              notification.isRead
                                ? "text-gray-500"
                                : "text-gray-700"
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>

                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-4 mt-2"></div>
                        )}
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

export default WorkerNotifications;
