"use client";
import Card from "./Card";
import {
  Battery,
  Plug,
  Users,
  ClipboardList,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";

export default function KPISection() {
  const stats = [
    {
      title: "Active Assets",
      value: "42",
      icon: <Plug size={20} />,
      subtitle: "+2 this week",
      trend: 5,
      className: "hover:border-emerald-200"
    },
    {
      title: "Battery Health",
      value: "92%",
      icon: <Battery size={20} />,
      subtitle: "Average across fleet",
      trend: 2,
      className: "hover:border-green-200"
    },
    {
      title: "Total Customers",
      value: "180",
      icon: <Users size={20} />,
      subtitle: "+12 this month",
      trend: 7,
      className: "hover:border-blue-200"
    },
    {
      title: "Pending Work Orders",
      value: "6",
      icon: <ClipboardList size={20} />,
      subtitle: "2 require attention",
      trend: -10,
      className: "hover:border-orange-200"
    },
  ];

  const handleCardClick = (title) => {
    console.log(`Card clicked: ${title}`);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 mt-1 text-sm">
            Real-time insights and key performance indicators
          </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-100 shadow-sm">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">System Operational</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              subtitle={stat.subtitle}
              trend={stat.trend}
              onClick={() => handleCardClick(stat.title)}
              className={stat.className}
            />
          </motion.div>
        ))}
      </div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center shadow-sm">
            <AlertTriangle size={20} className="text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-orange-800">Maintenance Alert</h3>
            <p className="text-orange-600 text-sm">
              2 assets require immediate attention
            </p>
          </div>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors shadow-md">
          Review
        </button>
      </motion.div>
    </div>
  );
}
