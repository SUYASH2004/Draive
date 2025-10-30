"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Car, Battery, Users, Zap, Filter } from "lucide-react";
import { useState } from "react";

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState("Vehicles");
  const [statusFilter, setStatusFilter] = useState("");

  // Static data for demo – replace later with API or JSON
  const vehicleStats = {
    total: 3194,
    seen24h: 57,
    swapped3d: 68,
    planEnded: 36,
    defective: 0,
  };

  const statusOptions = [
    "Seen in last 24 hours",
    "Swapped in last 3 days",
    "Plan ended >3d ago",
    "Defective vehicles",
    "Dispatched in last 30 days",
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Assets Overview <span className="text-emerald-600">⚙️</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Manage and monitor all connected EV assets.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-4 mt-6">
            {[
              { name: "Vehicles", icon: Car },
              { name: "Stations", icon: Zap },
              { name: "Batteries", icon: Battery },
              { name: "Customers", icon: Users },
            ].map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setActiveTab(name)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all duration-200 font-medium ${
                  activeTab === name
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                    : "bg-white text-gray-600 hover:bg-emerald-50 border-emerald-100"
                }`}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}
          </div>

          {/* --- VEHICLES SECTION --- */}
          {activeTab === "Vehicles" && (
            <section className="mt-10">
              {/* Filter Section */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <Filter className="text-emerald-600" size={18} />
                  <h3 className="text-lg font-semibold text-gray-700">
                    Filter by Status
                  </h3>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border border-emerald-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  <option value="">Select status filter</option>
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-8">
                <StatCard
                  title="Vehicles Count"
                  value={vehicleStats.total}
                  desc="Total registered"
                />
                <StatCard
                  title="Seen in last 24h"
                  value={`${vehicleStats.seen24h}%`}
                  desc="Active recently"
                />
                <StatCard
                  title="Swapped in last 3d"
                  value={`${vehicleStats.swapped3d}%`}
                  desc="Battery swap activity"
                />
                <StatCard
                  title="Plan ended >3d ago"
                  value={`${vehicleStats.planEnded}%`}
                  desc="Expired plans"
                />
                <StatCard
                  title="Defective vehicles"
                  value={`${vehicleStats.defective}%`}
                  desc="Under maintenance"
                />
              </div>
            </section>
          )}

          {/* --- PLACEHOLDERS for other tabs --- */}
          {activeTab !== "Vehicles" && (
            <div className="mt-10 text-gray-400 italic">
              {`The ${activeTab} dashboard will be added soon.`}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* --- Subcomponent for KPI Cards --- */
function StatCard({ title, value, desc }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-emerald-100">
      <h4 className="text-gray-600 text-sm font-medium">{title}</h4>
      <p className="text-3xl font-bold text-emerald-600 mt-2">{value}</p>
      <p className="text-gray-400 text-xs mt-1">{desc}</p>
    </div>
  );
}
