import { useState, useEffect } from 'react';
import StatsCard from '../../components/admin/StatsCard';
import DataTable from '../../components/admin/DataTable';
import ChartComponent from '../../components/admin/ChartComponent';
import { ShoppingBag, DollarSign, Users, Clock } from 'lucide-react';
import adminService from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const analyticsData = await adminService.getDailyAnalytics(today);
      const ordersData = await adminService.getOrders({ limit: 10 });
      
      setStats(analyticsData);
      setOrders(ordersData.orders);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'Order Code', accessor: 'orderCode' },
    { header: 'Table', accessor: 'tableNumber' },
    { 
      header: 'Status', 
      accessor: 'status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'SERVED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {value}
        </span>
      )
    },
    { 
      header: 'Total', 
      accessor: 'total',
      render: (value) => `₹${value}`
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatsCard 
          title="Today's Orders" 
          value={stats?.totalOrders || 0} 
          icon={ShoppingBag} 
          trend="up" 
          trendValue="+12%" 
          color="blue" 
          loading={loading}
        />
        <StatsCard
          title="Revenue"
          value={`₹${stats?.totalRevenue || 0}`}
          icon={DollarSign}
          trend="up"
          trendValue="+8%"
          color="green"
          loading={loading}
        />
        <StatsCard
          title="Active Tables"
          value={stats?.activeTables || 0}
          icon={Users}
          color="purple"
          loading={loading}
        />
        <StatsCard
          title="Pending"
          value={stats?.pendingOrders || 0}
          icon={Clock}
          color="orange"
          loading={loading}
        />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <ChartComponent
          title="Revenue (Last 7 Days)"
          data={[
            { label: 'Mon', value: 12000 },
            { label: 'Tue', value: 15000 },
            { label: 'Wed', value: 11000 },
            { label: 'Thu', value: 18000 },
            { label: 'Fri', value: 14000 },
            { label: 'Sat', value: 22000 },
            { label: 'Sun', value: 19000 }
          ]}
          type="bar"
        />
      </div>

      {/* Recent Orders Table */}
      <DataTable
        columns={columns}
        data={orders}
        searchable
        searchPlaceholder="Search orders..."
      />
    </div>
  );
};

export default AdminDashboard;