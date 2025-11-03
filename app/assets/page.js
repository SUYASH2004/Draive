"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  Car,
  Battery,
  Users,
  Zap,
  Filter,
  Eye,
  RefreshCcw,
  AlertTriangle,
  Wrench,
  Truck,
} from "lucide-react";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

/* -------------------- DUMMY CUSTOMER DATA -------------------- */
const subscriptionStats = [
  { name: "Active", value: 64 },
  { name: "Expired", value: 21 },
  { name: "Trial", value: 10 },
  { name: "Cancelled", value: 5 },
];
const COLORS = ["#059669", "#F97316", "#10B981", "#EF4444"];
const trendData = [
  { month: "May", Active: 280, Expired: 80 },
  { month: "Jun", Active: 310, Expired: 100 },
  { month: "Jul", Active: 340, Expired: 120 },
  { month: "Aug", Active: 390, Expired: 90 },
  { month: "Sep", Active: 420, Expired: 70 },
  { month: "Oct", Active: 450, Expired: 60 },
];

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState("Vehicles");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const vehicleStats = {
    total: 3194,
    seen24h: 57,
    swapped3d: 68,
    planEnded: 36,
    defective: 0,
  };

  const filters = [
    { label: "Seen in last 24 hours", icon: Eye, color: "text-emerald-600" },
    { label: "Swapped in last 3 days", icon: RefreshCcw, color: "text-blue-500" },
    { label: "Plan ended >3d ago", icon: AlertTriangle, color: "text-yellow-600" },
    { label: "Defective vehicles", icon: Wrench, color: "text-red-600" },
    { label: "Dispatched in last 30 days", icon: Truck, color: "text-purple-600" },
  ];

  const toggleFilter = (label) => {
    setSelectedFilters((prev) =>
      prev.includes(label)
        ? prev.filter((f) => f !== label)
        : [...prev, label]
    );
  };

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

          {/* Tabs */}
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

          {/* VEHICLES SECTION */}
          {activeTab === "Vehicles" && (
            <section className="mt-10">
              {/* 🔍 Modern Filter Section */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-emerald-100">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <Filter className="text-emerald-600" size={20} />
                    <h3 className="text-lg font-semibold text-gray-700">
                      Vehicle Filters
                    </h3>
                  </div>
                  {selectedFilters.length > 0 && (
                    <button
                      onClick={() => setSelectedFilters([])}
                      className="text-sm text-emerald-600 hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {filters.map(({ label, icon: Icon, color }) => {
                    const active = selectedFilters.includes(label);
                    return (
                      <button
                        key={label}
                        onClick={() => toggleFilter(label)}
                        className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 shadow-sm
                          ${
                            active
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                              : "bg-white hover:bg-emerald-50 text-gray-700 border-emerald-100"
                          }`}
                      >
                        <Icon
                          size={20}
                          className={`${active ? "text-white" : color}`}
                        />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stats Section */}
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

          {/* CUSTOMERS SECTION */}
          {activeTab === "Customers" && (
            <section className="mt-10 space-y-10">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Users className="text-emerald-600" /> Customer Subscription Overview
              </h3>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Active Customers" value="450" desc="Currently subscribed" />
                <StatCard title="Trial Users" value="70" desc="In free trial period" />
                <StatCard title="Expired Plans" value="120" desc="Awaiting renewal" />
                <StatCard title="Total Customers" value="640" desc="All user accounts" />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
                  <h4 className="text-lg font-semibold text-emerald-800 mb-4">
                    Subscription Distribution
                  </h4>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={subscriptionStats} dataKey="value" outerRadius={100}>
                          {subscriptionStats.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100">
                  <h4 className="text-lg font-semibold text-emerald-800 mb-4">
                    Active vs Expired (Last 6 Months)
                  </h4>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trendData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Active" fill="#10B981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="Expired" fill="#F87171" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* PLACEHOLDER for Other Tabs */}
          {activeTab !== "Vehicles" && activeTab !== "Customers" && (
            <div className="mt-10 text-gray-400 italic">
              {`The ${activeTab} dashboard will be added soon.`}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

/* Subcomponent for KPI Cards */
function StatCard({ title, value, desc }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-emerald-100">
      <h4 className="text-gray-600 text-sm font-medium">{title}</h4>
      <p className="text-3xl font-bold text-emerald-600 mt-2">{value}</p>
      <p className="text-gray-400 text-xs mt-1">{desc}</p>
    </div>
  );
}
