"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";

const regionsData = [
  {
    id: "west",
    name: "West Region",
    sales: 1240,
    operations: 890,
    performance: 88,
    circles: [
      {
        id: "mumbai",
        name: "Mumbai Circle",
        sales: 780,
        operations: 530,
        performance: 91,
        cities: [
          {
            id: "navi-mumbai",
            name: "Navi Mumbai",
            customers: 340,
            stations: 45,
            uptime: 97,
          },
          {
            id: "thane",
            name: "Thane",
            customers: 420,
            stations: 50,
            uptime: 95,
          },
        ],
      },
      {
        id: "pune",
        name: "Pune Circle",
        sales: 460,
        operations: 360,
        performance: 85,
        cities: [
          {
            id: "kothrud",
            name: "Kothrud",
            customers: 230,
            stations: 30,
            uptime: 93,
          },
        ],
      },
    ],
  },
  {
    id: "north",
    name: "North Region",
    sales: 980,
    operations: 650,
    performance: 82,
    circles: [
      {
        id: "delhi",
        name: "Delhi Circle",
        sales: 720,
        operations: 490,
        performance: 89,
        cities: [
          {
            id: "gurgaon",
            name: "Gurgaon",
            customers: 310,
            stations: 40,
            uptime: 94,
          },
        ],
      },
    ],
  },
];

export default function HierarchyDashboard() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);

  const handleBack = () => {
    if (selectedCircle) setSelectedCircle(null);
    else setSelectedRegion(null);
  };

  const exportToCSV = (data, name) => {
    const csvContent = [
      Object.keys(data[0]).join(","),
      ...data.map((row) => Object.values(row).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, ${name}.csv);
  };

  const currentData = selectedCircle
    ? selectedCircle.cities
    : selectedRegion
    ? selectedRegion.circles
    : regionsData;

  const title = selectedCircle
    ? City Performance - ${selectedCircle.name}
    : selectedRegion
    ? Circle Overview - ${selectedRegion.name}
    : "Regional Overview";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-emerald-700">{title}</h2>
          {(selectedRegion || selectedCircle) && (
            <button
              onClick={handleBack}
              className="text-sm mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition"
            >
              ← Back
            </button>
          )}
        </div>
        <button
          onClick={() => exportToCSV(currentData, title.replace(/\s+/g, "_"))}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          Export CSV
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Sales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={currentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#059669" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-md p-4 rounded-2xl">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Operational Performance
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={currentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#10b981"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md p-4 rounded-2xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Summary</h3>
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-emerald-50 text-emerald-800">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              {selectedCircle ? (
                <>
                  <th className="px-4 py-2 text-left">Customers</th>
                  <th className="px-4 py-2 text-left">Stations</th>
                  <th className="px-4 py-2 text-left">Uptime (%)</th>
                </>
              ) : (
                <>
                  <th className="px-4 py-2 text-left">Sales</th>
                  <th className="px-4 py-2 text-left">Operations</th>
                  <th className="px-4 py-2 text-left">Performance</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, idx) => (
              <tr
                key={item.id}
                onClick={() => {
                  if (selectedRegion && !selectedCircle)
                    setSelectedCircle(item);
                  else if (!selectedRegion) setSelectedRegion(item);
                }}
                className={`hover:bg-emerald-50 transition cursor-pointer ${
                  idx % 2 ? "bg-gray-50" : ""
                }`}
              >
                <td className="px-4 py-2 font-medium text-emerald-800">
                  {item.name}
                </td>
                {selectedCircle ? (
                  <>
                    <td className="px-4 py-2">{item.customers}</td>
                    <td className="px-4 py-2">{item.stations}</td>
                    <td className="px-4 py-2">{item.uptime}</td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{item.sales}</td>
                    <td className="px-4 py-2">{item.operations}</td>
                    <td className="px-4 py-2">{item.performance}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}