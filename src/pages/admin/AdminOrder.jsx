import { Download, Eye, Search } from "lucide-react";

const OrdersPage = () => {
  const MOCK_ORDERS = [
    {
      orderCode: "ORD-001",
      tableNumber: "Table 1",
      status: "Placed",
      payment: "Paid",
      total: 150,
      time: "2023-06-15 10:30 AM",
    },
    {
      orderCode: "ORD-002",
      tableNumber: "Table 2",
      status: "Preparing",
      payment: "Pending",
      total: 200,
      time: "2023-06-15 11:45 AM",
    },
    {
      orderCode: "ORD-003",
      tableNumber: "Table 3",
      status: "Ready",
      payment: "Paid",
      total: 120,
      time: "2023-06-15 12:15 PM",
    },
    {
      orderCode: "ORD-004",
      tableNumber: "Table 4",
      status: "Served",
      payment: "Paid",
      total: 180,
      time: "2023-06-15 02:30 PM",
    },
    {
      orderCode: "ORD-005",
      tableNumber: "Table 5",
      status: "Placed",
      payment: "Pending",
      total: 250,
      time: "2023-06-15 03:45 PM",
    },
  ];  
  return(
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex gap-4">
        <input
          type="date"
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
        />
        <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
          <option>All Status</option>
          <option>Placed</option>
          <option>Preparing</option>
          <option>Ready</option>
          <option>Served</option>
        </select>
        <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
          <option>All Payments</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order Code</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Table</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Payment</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS?.map(order => (
              <tr key={order.orderCode} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{order.orderCode}</td>
                <td className="px-6 py-4">{order.tableNumber}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'SERVED' ? 'bg-green-100 text-green-700' :
                    order.status === 'READY' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.payment === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {order.payment}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">₹{order.total}</td>
                <td className="px-6 py-4 text-gray-500">{order.time}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-blue-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Download className="w-4 h-4 text-green-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )};
  export default OrdersPage;