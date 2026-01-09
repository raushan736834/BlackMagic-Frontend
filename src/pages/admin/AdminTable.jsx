const TablesPage = () => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Table Management</h1>
      <button
        onClick={() => {
          setModalType("addTable");
          setShowModal(true);
        }}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600"
      >
        <Plus className="w-4 h-4" /> Add Table
      </button>
    </div>

    {/* Tables Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_TABLES.map((table) => (
        <div
          key={table.number}
          className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold">Table {table.number}</h3>
              <p className="text-gray-500">Capacity: {table.capacity} people</p>
              <p className="text-gray-500">Location: {table.location}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                table.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {table.status}
            </span>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600">
              <QrCode className="w-4 h-4" /> QR Code
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Edit className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 border rounded-lg hover:bg-gray-50">
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default TablesPage;
