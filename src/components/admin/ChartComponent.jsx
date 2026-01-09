import React from 'react';
import { TrendingUp } from 'lucide-react';

const ChartComponent = ({ 
  title, 
  data, 
  type = 'bar', 
  height = 256,
  showLegend = true 
}) => {
  // Simple bar chart implementation
  if (type === 'bar') {
    const maxValue = Math.max(...data.map(d => d.value));
    
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        
        <div className="flex items-end justify-around gap-2" style={{ height }}>
          {data.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div 
                className="w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg transition-all hover:shadow-lg cursor-pointer group relative"
                style={{ height: `${(item.value / maxValue) * 100}%`, minHeight: '20px' }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.value}
                </div>
              </div>
              <span className="text-xs text-gray-600 font-medium mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Simple line chart
  if (type === 'line') {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-6">{title}</h3>
        <div className="flex items-center justify-center text-gray-500" style={{ height }}>
          <p>Line chart visualization</p>
        </div>
      </div>
    );
  }

  return null;
};

export default ChartComponent;