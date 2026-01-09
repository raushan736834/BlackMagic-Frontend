import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../hooks/useSession';
import { Utensils, WifiOff, Wifi } from 'lucide-react';

const LandingPage = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const navigate = useNavigate();
  const { startSession } = useSession();

  const handleStartSession = async () => {
    if (!tableNumber) return;
    
    setIsLoading(true);
    
    // Simulate API call to validate table
    setTimeout(() => {
      // Start the session
      startSession(tableNumber);
      
      // Navigate to menu page
      navigate('/menu');
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Utensils className="w-16 h-16 mx-auto mb-4 text-orange-500" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BlackMagic</h1>
          <p className="text-gray-600">Welcome to culinary excellence</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Table Number
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter table number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartSession()}
            />
          </div>

          <button
            onClick={handleStartSession}
            disabled={!tableNumber || !isOnline || isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Starting...' : 'Start Ordering'}
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4 text-green-500" />
                <span>Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-500" />
                <span>Offline</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

