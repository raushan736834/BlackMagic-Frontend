const Modal = () => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {modalType === "addItem" && "Add Menu Item"}
            {modalType === "addTable" && "Add New Table"}
          </h2>
          <button onClick={() => setShowModal(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {modalType === "addItem" && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Item Name"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Description"
              className="w-full px-4 py-2 border rounded-lg"
              rows={3}
            />
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <select className="w-full px-4 py-2 border rounded-lg">
              <option>Select Category</option>
              <option>Starters</option>
              <option>Main Course</option>
              <option>Desserts</option>
            </select>
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label>Vegetarian</label>
            </div>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
              Add Item
            </button>
          </div>
        )}

        {modalType === "addTable" && (
          <div className="space-y-4">
            <input
              type="number"
              placeholder="Table Number"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Capacity"
              className="w-full px-4 py-2 border rounded-lg"
            />
            <select className="w-full px-4 py-2 border rounded-lg">
              <option>Select Location</option>
              <option>Indoor</option>
              <option>Outdoor</option>
              <option>Window</option>
            </select>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600">
              Add Table
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
