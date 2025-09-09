import React, { useState } from 'react';
import { MapPin, Clock, CheckCircle, Calendar, Play, Pause } from 'lucide-react';
import { mockCheckInOuts, mockContracts, mockJobRequests } from '../../data/mockData';

interface WorkerCheckInProps {
  userId: string;
}

const WorkerCheckIn: React.FC<WorkerCheckInProps> = ({ userId }) => {
  const [currentLocation, setCurrentLocation] = useState('Đang xác định vị trí...');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  
  // In a real app, this would be determined by checking today's check-in status
  const activeContract = mockContracts.find(c => c.workerId === userId && c.status === 'active');
  const todayCheckIns = mockCheckInOuts.filter(ci => 
    ci.workerId === userId && 
    new Date(ci.checkInTime).toDateString() === new Date().toDateString()
  );

  const handleCheckIn = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          setIsCheckedIn(true);
          // In a real app, this would send data to the backend
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Không thể xác định vị trí');
        }
      );
    }
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    // In a real app, this would send check-out data to the backend
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Trạng thái hiện tại</h2>
        
        <div className="flex items-center justify-center mb-6">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center ${
            isCheckedIn ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
          }`}>
            {isCheckedIn ? (
              <CheckCircle size={64} />
            ) : (
              <Clock size={64} />
            )}
          </div>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-gray-800">
            {isCheckedIn ? 'Đang làm việc' : 'Chưa check-in'}
          </p>
          <p className="text-gray-600 mt-1">
            {isCheckedIn ? 'Đã check-in lúc 7:30 AM' : 'Hãy check-in để bắt đầu ca làm'}
          </p>
        </div>
        
        <div className="flex justify-center space-x-4">
          {!isCheckedIn ? (
            <button
              onClick={handleCheckIn}
              className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              disabled={!activeContract}
            >
              <Play size={20} />
              <span>Check-in</span>
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              <Pause size={20} />
              <span>Check-out</span>
            </button>
          )}
        </div>
        
        {!activeContract && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-700">
              Bạn cần có hợp đồng đang hoạt động để có thể check-in
            </p>
          </div>
        )}
      </div>

      {/* Today's Activity */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hoạt động hôm nay</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-500" size={20} />
                <span className="font-medium">Check-in</span>
              </div>
              <span className="text-sm text-gray-600">7:30 AM</span>
            </div>
            
            {isCheckedIn && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-400" size={20} />
                  <span className="font-medium">Check-out</span>
                </div>
                <span className="text-sm text-gray-600">Chưa check-out</span>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin size={16} />
              <span>Vị trí: {currentLocation}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>Thời gian làm việc: {isCheckedIn ? '2 giờ 30 phút' : '0 giờ'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Check-in History */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Lịch sử check-in</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {mockCheckInOuts.filter(ci => ci.workerId === userId).map((checkIn) => {
            const contract = mockContracts.find(c => c.id === checkIn.contractId);
            const jobRequest = mockJobRequests.find(j => j.id === contract?.jobRequestId);
            
            return (
              <div key={checkIn.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {jobRequest?.title || 'Công việc không xác định'}
                    </h4>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock size={16} />
                        <span>
                          {new Date(checkIn.checkInTime).toLocaleString('vi-VN')}
                          {checkIn.checkOutTime && 
                            ` - ${new Date(checkIn.checkOutTime).toLocaleString('vi-VN')}`
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={16} />
                        <span>{checkIn.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      checkIn.status === 'checked_out' 
                        ? 'text-blue-600 bg-blue-100' 
                        : 'text-green-600 bg-green-100'
                    }`}>
                      {checkIn.status === 'checked_out' ? 'Hoàn thành' : 'Đang làm việc'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkerCheckIn;