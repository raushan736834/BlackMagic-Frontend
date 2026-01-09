const StaffPage = () => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Staff Management</h1>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600">
        <Plus className="w-4 h-4" /> Add Staff
      </button>
    </div>

    {/* Staff Table */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Role
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Assigned
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {MOCK_STAFF.map((staff) => (
            <tr key={staff.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{staff.name}</td>
              <td className="px-6 py-4">{staff.role}</td>
              <td className="px-6 py-4">{staff.assigned}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  {staff.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4 text-blue-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default StaffPage;
