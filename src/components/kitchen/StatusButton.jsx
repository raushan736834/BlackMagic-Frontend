import React from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

const StatusButton = ({ status, onClick, disabled = false, loading = false }) => {
  const statusConfig = {
    accept: {
      text: 'Accept Order',
      icon: CheckCircle,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-white'
    },
    preparing: {
      text: 'Start Preparing',
      icon: Clock,
      color: 'bg-orange-500 hover:bg-orange-600',
      textColor: 'text-white'
    },
    ready: {
      text: 'Mark as Ready',
      icon: CheckCircle,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-white'
    },
    cancel: {
      text: 'Cancel Order',
      icon: XCircle,
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    }
  };

  const config = statusConfig[status] || statusConfig.accept;
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        px-4 py-2 rounded-lg font-semibold transition-all
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${config.color} ${config.textColor}
      `}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <Icon className="w-4 h-4" />
          <span>{config.text}</span>
        </>
      )}
    </button>
  );
};

export default StatusButton;