"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "../components/RoleContext";
import { hierarchyData } from "../data/hierarchyData";
import {
  ArrowLeft,
  Users,
  Zap,
  MapPin,
  BatteryCharging,
  TrendingUp,
  AlertCircle,
  Calendar,
  Wrench,
  MessageCircle,
} from "lucide-react";
import BottomNavBar from "../components/BottomNavBar"; // Make sure to import BottomNavBar

export default function PlansPage() {
  const { user } = useRole();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  if (!user) return <p className="text-center mt-10">Please log in first.</p>;

  const goBack = () => {
    if (selectedCity) return setSelectedCity(null);
    if (selectedCircle) return setSelectedCircle(null);
    if (selectedRegion) return setSelectedRegion(null);
  };

  // ---------- Reusable Components ----------
  const StatCard = ({ icon: Icon, label, value, change, subtitle }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p
              className={`text-sm mt-1 ${
                change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {change >= 0 ? "+" : ""}
              {change}% from last month
            </p>
          )}
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-full bg-emerald-50">
          <Icon className="text-emerald-600" size={24} />
        </div>
      </div>
    </div>
  );

  const Breadcrumbs = () => {
    const path = [selectedRegion, selectedCircle, selectedCity]
      .filter(Boolean)
      .map((item) => item.name);
    if (path.length === 0) return null;

    return (
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span className="text-gray-400">Hierarchy:</span>
        {path.map((item, i) => (
          <span key={i} className="font-medium text-emerald-600">
            {i > 0 && <span className="text-gray-300 mx-1">/</span>}
            {item}
          </span>
        ))}
      </div>
    );
  };

  const PerformanceMetric = ({ label, current, target, unit = "" }) => {
    const percentage = target > 0 ? (current / target) * 100 : 0;
    const color =
      percentage >= 90
        ? "bg-green-500"
        : percentage >= 70
        ? "bg-yellow-500"
        : "bg-red-500";

    return (
      <div className="bg-white rounded-lg p-4 border border-gray-100">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-bold text-emerald-700">
            {current}
            {unit} / {target}
            {unit}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${color}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Progress</span>
          <span>{percentage.toFixed(1)}%</span>
        </div>
      </div>
    );
  };

  // ---------- Role-based Components ----------

  const RegionOverview = ({ region }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Active Customers"
          value={region.stats.activeCustomers.toLocaleString()}
          change={12.5}
          subtitle="Registered users"
        />
        <StatCard
          icon={MapPin}
          label="Active Stations"
          value={region.stats.activeStations}
          change={8.2}
          subtitle="Operational stations"
        />
        <StatCard
          icon={BatteryCharging}
          label="Today's Swaps"
          value={region.stats.swapsToday}
          change={15.3}
          subtitle="Real-time swaps"
        />
        <StatCard
          icon={Zap}
          label="Weekly Swaps"
          value={region.stats.swapsWeek}
          change={10.7}
          subtitle="This week total"
        />
      </div>

      {/* Metrics + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <PerformanceMetric
              label="Station Utilization"
              current={75}
              target={100}
              unit="%"
            />
            <PerformanceMetric label="Customer Growth" current={1200} target={1500} />
            <PerformanceMetric
              label="Swap Efficiency"
              current={88}
              target={95}
              unit="%"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Regional Insights
          </h3>
          {[
            {
              icon: TrendingUp,
              color: "blue",
              label: "Top Performing Circle",
              value: "West Circle",
            },
            {
              icon: AlertCircle,
              color: "amber",
              label: "Needs Attention",
              value: "2 Circles",
            },
            {
              icon: Calendar,
              color: "emerald",
              label: "Monthly Target",
              value: "78% Achieved",
            },
          ].map(({ icon: Icon, color, label, value }) => (
            <div
              key={label}
              className={`flex justify-between items-center p-3 rounded-lg bg-${color}-50 mb-3`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`text-${color}-600`} size={20} />
                <span className="text-sm font-medium">{label}</span>
              </div>
              <span className={`text-sm font-bold text-${color}-700`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Circles */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Circles Overview</h3>
        <div className="grid gap-4">
          {region.circles.map((circle) => (
            <motion.div
              key={circle.id}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-all"
              onClick={() => setSelectedCircle(circle)}
            >
              <div>
                <h4 className="font-semibold text-gray-900">{circle.name}</h4>
                <p className="text-sm text-gray-600">
                  {circle.cities.length} cities •{" "}
                  {circle.stats.activeCustomers.toLocaleString()} customers
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {circle.stats.swapsToday} swaps today
                </p>
                <p className="text-xs text-gray-500">
                  {circle.stats.activeStations} active stations
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const CircleOverview = ({ circle }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Active Customers"
          value={circle.stats.activeCustomers.toLocaleString()}
          change={8.3}
        />
        <StatCard
          icon={MapPin}
          label="Active Stations"
          value={circle.stats.activeStations}
          change={5.1}
        />
        <StatCard
          icon={BatteryCharging}
          label="Today's Swaps"
          value={circle.stats.swapsToday}
          change={12.7}
        />
        <StatCard
          icon={Zap}
          label="Weekly Swaps"
          value={circle.stats.swapsWeek}
          change={9.4}
        />
      </div>

      {/* City Overview */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Cities in {circle.name}
        </h3>
        <div className="grid gap-4">
          {circle.cities.map((city) => (
            <motion.div
              key={city.id}
              whileHover={{ scale: 1.01 }}
              className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer"
              onClick={() => setSelectedCity(city)}
            >
              <h4 className="font-semibold text-gray-900">{city.name}</h4>
              <p className="text-sm text-gray-600">
                {city.clusters.length} clusters •{" "}
                {Math.floor(
                  circle.stats.activeCustomers / circle.cities.length
                ).toLocaleString()}{" "}
                avg. customers
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const CityOverview = ({ city }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Clusters in {city.name}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {city.clusters.map((cluster) => (
          <motion.div
            key={cluster.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer"
          >
            <h4 className="font-semibold text-gray-900 mb-2">{cluster.name}</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Stations: 8</p>
              <p>
                Status: <span className="text-emerald-600 font-medium">Active</span>
              </p>
              <p>Last Activity: 2 hours ago</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // ---------- Role Handling ----------
  const fullAccessRoles = ["Admin", "Regional Head"];
  const circleAccessRoles = ["Circle Head"];
  const taskBasedRoles = ["Technician", "Support"];

  const renderHierarchyDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 p-8 transition-all pb-20 md:pb-8"> {/* Added padding bottom for mobile */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            ⚡ Voltup Hierarchy Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome, {user.role} •{" "}
            {selectedRegion ? selectedRegion.name : "Regional Overview"}
          </p>
        </div>
        {(selectedRegion || selectedCircle || selectedCity) && (
          <button
            onClick={goBack}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={18} /> Back
          </button>
        )}
      </div>

      <Breadcrumbs />

      <AnimatePresence mode="wait">
        {!selectedRegion && fullAccessRoles.includes(user.role) && (
          <motion.div
            key="regions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hierarchyData.regions.map((region) => (
                <motion.div
                  key={region.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedRegion(region)}
                  className="bg-white border border-emerald-100 p-6 rounded-2xl shadow-sm hover:shadow-lg cursor-pointer"
                >
                  <h3 className="text-xl font-bold text-emerald-700 mb-3">
                    {region.name}
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Circles: {region.circles.length}</p>
                    <p>
                      Active Customers:{" "}
                      {region.stats.activeCustomers.toLocaleString()}
                    </p>
                    <p>Today's Swaps: {region.stats.swapsToday}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedRegion && !selectedCircle && (
          <motion.div
            key="region"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <RegionOverview region={selectedRegion} />
          </motion.div>
        )}

        {selectedCircle && !selectedCity && (
          <motion.div
            key="circle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CircleOverview circle={selectedCircle} />
          </motion.div>
        )}

        {selectedCity && (
          <motion.div
            key="city"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CityOverview city={selectedCity} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <BottomNavBar />
      </div>
    </div>
  );

  // ---------- Final Render ----------
  if (fullAccessRoles.includes(user.role) || circleAccessRoles.includes(user.role))
    return renderHierarchyDashboard();

  if (taskBasedRoles.includes(user.role))
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 p-8 pb-20 md:pb-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            ⚡ Operations Dashboard
          </h1>
          <p className="text-gray-600 mb-8">Welcome, {user.role}</p>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {user.role === "Technician" ? "Assigned Maintenance Tasks" : "Open Support Tickets"}
            </h2>
            <div className="space-y-4">
              {user.role === "Technician" ? (
                <>
                  <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                    <h3 className="font-semibold">Battery station #12 – Cooling fan check</h3>
                    <p className="text-sm text-gray-600">Due: Today</p>
                  </div>
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold">Cluster C2 – Terminal issue</h3>
                    <p className="text-sm text-gray-600">Due: Tomorrow</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <h3 className="font-semibold">User swap delay in East Region – Pending</h3>
                    <p className="text-sm text-gray-600">Opened: 2 hours ago</p>
                  </div>
                  <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                    <h3 className="font-semibold">Recharge mismatch – Escalated</h3>
                    <p className="text-sm text-gray-600">Opened: 1 day ago</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Bar for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
          <BottomNavBar />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center text-center p-8 pb-20 md:pb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Access Restricted
        </h1>
        <p className="text-gray-600">
          Your role ({user.role}) does not have access to this dashboard.
        </p>
      </div>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <BottomNavBar />
      </div>
    </div>
  );
}