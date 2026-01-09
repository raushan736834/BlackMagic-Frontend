const MenuPage = () => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Menu Management</h1>
      <button
        onClick={() => {
          setModalType("addItem");
          setShowModal(true);
        }}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600"
      >
        <Plus className="w-4 h-4" /> Add Item
      </button>
    </div>

    {/* Menu Items Table */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Item Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Category
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Price
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {MOCK_MENU_ITEMS.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium">{item.name}</td>
              <td className="px-6 py-4">{item.category}</td>
              <td className="px-6 py-4">₹{item.price}</td>
              <td className="px-6 py-4">
                {item.stock ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <X className="w-5 h-5 text-red-500" />
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Edit className="w-4 h-4 text-blue-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    {item.stock ? "⏸️" : "▶️"}
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


export default MenuPage;