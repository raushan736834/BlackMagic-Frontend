import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import { ArrowLeft, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { sessionData, endSession } = useSession();

  const handleEndSession = () => {
    // Confirm before ending session
    if (window.confirm('Are you sure you want to end your session?')) {
      endSession();
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 hover:scale-110 transition-transform"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Session Info */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-bold mb-4">Session Info</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Session Code</span>
              <span className="font-mono text-sm">{sessionData?.sessionCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Table Number</span>
              <span className="font-bold">{sessionData?.tableNumber}</span>
            </div>
          </div>
        </div>

        {/* End Session Button */}
        <button
          onClick={handleEndSession}
          className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          End Session
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

