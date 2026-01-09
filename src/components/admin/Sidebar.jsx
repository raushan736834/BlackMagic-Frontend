const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
    
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "orders", icon: ShoppingBag, label: "Orders" },
    { id: "menu", icon: Utensils, label: "Menu" },
    { id: "tables", icon: Calendar, label: "Tables" },
    { id: "staff", icon: Users, label: "Staff" },
    { id: "analytics", icon: BarChart3, label: "Analytics" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div
      className={`bg-gray-900 text-white h-screen fixed left-0 top-0 transition-all ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <Utensils className="w-8 h-8 text-orange-500" />
          {sidebarOpen && <span className="font-bold text-lg">BlackMagic</span>}
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === item.id
                ? "bg-orange-500 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-4 left-0 right-0 p-4">
        <button
          onClick={() => setIsLoggedIn(false)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
