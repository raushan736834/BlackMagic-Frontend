const AnalyticsPage = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics & Reports</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <input type="date" className="px-4 py-2 border rounded-lg" />
          <span className="flex items-center">to</span>
          <input type="date" className="px-4 py-2 border rounded-lg" />
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
            Generate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Top 10 Items</h2>
          <div className="space-y-3">
            {['Paneer Tikka', 'Biryani', 'Butter Chicken', 'Dal Makhani', 'Naan'].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span>{idx + 1}. {item}</span>
                <span className="font-semibold">{350 - idx * 30} orders</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Peak Hours</h2>
          <div className="space-y-3">
            {['18:00-19:00', '19:00-20:00', '20:00-21:00', '13:00-14:00'].map((time, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <span>{time}</span>
                <span className="font-semibold">{95 - idx * 10} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  export default AnalyticsPage;