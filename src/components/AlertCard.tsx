import React from 'react';

interface AlertCardProps {
  alert: any;
  onMarkRead: (id: number) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onMarkRead }) => (
  <div className={`border rounded p-4 mb-3 ${alert.is_read ? 'bg-gray-100' : 'bg-red-50'}`}>
    <div className="font-semibold">[{alert.brand}] {alert.message}</div>
    <div className="text-sm text-gray-600">Source: {alert.source} | Risk: {alert.risk_score}</div>
    {!alert.is_read && (
      <button
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => onMarkRead(alert.id)}
      >
        Mark as Read
      </button>
    )}
  </div>
);

export default AlertCard;
