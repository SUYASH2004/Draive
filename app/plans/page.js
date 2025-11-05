"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { REGIONS, findRegionById } from "../data/hierarchyData";
import AnalyticsCard from "./components/AnalyticsCard";
import DataTable from "./components/DataTable";
import BottomNavBar from "../components/BottomNavBar";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Download, FileText, ArrowRight, Menu, X } from "lucide-react";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { useRole } from "../components/RoleContext";

/* ---------- Helpers ---------- */
function formatMoney(n) {
  if (!n && n !== 0) return "—";
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(1)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return `₹${n?.toLocaleString('en-IN')}`;
}

function formatNumber(n) {
  if (!n && n !== 0) return "—";
  return n?.toLocaleString('en-IN');
}

function toSeries(arr = []) {
  return (arr || []).map((v, i) => ({ name: `M${i + 1}`, value: v }));
}

function exportRegionCSV(region) {
  const rows = [["circle", "revenue", "swaps", "uptime", "stations", "customers"]];
  (region.circles || []).forEach((c) =>
    rows.push([
      c.name,
      c.metrics.revenue ?? 0,
      c.metrics.swaps ?? 0,
      c.metrics.uptime ?? 0,
      c.metrics.stations ?? 0,
      c.metrics.customers ?? 0,
    ])
  );
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${region.id || "region"}-circles.csv`);
}

function exportRegionPDF(region) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text(`${region.name} — Circles Report`, 12, 18);
  doc.setFontSize(11);
  doc.text(`Total Revenue: ${formatMoney(region.metrics.revenue)}`, 12, 28);
  doc.text(`Total Swaps: ${formatNumber(region.metrics.swaps)}`, 12, 36);
  doc.save(`${region.id || "region"}-report.pdf`);
}

/* ---------- Component ---------- */
export default function RegionalDashboard() {
  const router = useRouter();
  const regions = useMemo(() => REGIONS || [], []);
  const { user } = useRole();

  // State for mobile responsiveness
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // role logic
  const roleRaw = (user?.role || "").toLowerCase();
  const roleIsRegional = /regional|regional head|admin/.test(roleRaw);
  const roleIsCircle = /circle|circle head/.test(roleRaw);
  const roleIsCity = /city|ops|technician|support/.test(roleRaw);

  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const selectedRegion = selectedRegionId ? findRegionById(selectedRegionId) : null;

  // Check mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const companySummary = useMemo(() => {
    const revenue = regions.reduce((s, r) => s + (r.metrics?.revenue || 0), 0);
    const swaps = regions.reduce((s, r) => s + (r.metrics?.swaps || 0), 0);
    const stations = regions.reduce((s, r) => s + (r.metrics?.stations || 0), 0);
    const customers = regions.reduce((s, r) => s + (r.metrics?.customers || 0), 0);
    const avgUptime =
      regions.length > 0
        ? +(regions.reduce((s, r) => s + (r.metrics?.uptime || 0), 0) / regions.length).toFixed(1)
        : 0;
    return { revenue, swaps, stations, customers, avgUptime };
  }, [regions]);

  const openRegion = useCallback(
    (r) => {
      if (!r) return;
      if (roleIsRegional || roleIsCircle) {
        setSelectedRegionId(r.id);
        setMobileMenuOpen(false);
      } else {
        alert("You don't have permission to open this region.");
      }
    },
    [roleIsRegional, roleIsCircle]
  );

  const circleColumns = [
    { key: "name", label: "Circle" },
    { key: "revenue", label: "Revenue", render: (r) => formatMoney(r.metrics?.revenue) },
    { key: "swaps", label: "Swaps", render: (r) => formatNumber(r.metrics?.swaps || 0) },
    { key: "uptime", label: "Uptime", render: (r) => `${r.metrics?.uptime ?? 0}%` },
    { key: "stations", label: "Stations", render: (r) => r.metrics?.stations ?? 0 },
    {
      key: "action",
      label: "Action",
      render: (r) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (roleIsRegional || roleIsCircle) {
                router.push(`/user-management/region/${selectedRegion?.id}/circle/${r.id}`);
              } else {
                alert("You don't have permission to open this circle.");
              }
            }}
            className="text-sm text-emerald-700 underline px-2 py-1"
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-center justify-between sm:block">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-emerald-700">
                Regional Operations
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base max-w-xl">
                Enterprise dashboard for monitoring swaps, stations, and revenue.
              </p>
            </div>
            
            {/* Mobile menu button */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md bg-emerald-100 text-emerald-700 sm:hidden"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>

          {/* User info and actions - hidden on mobile when menu is closed */}
          <div className={`${isMobile && !mobileMenuOpen ? 'hidden' : 'flex'} flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4`}>
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-500">Signed in as</div>
              <div className="text-sm text-emerald-700 truncate max-w-[120px] sm:max-w-none">
                {user?.email ?? "Guest"}
              </div>
            </div>

            {roleIsRegional && (
              <button
                onClick={() => router.push(selectedRegion?.id ? `/user-management/region/${selectedRegion.id}` : "/user-management")}
                className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm mt-2 sm:mt-0"
              >
                Manage Users
              </button>
            )}
          </div>
        </div>

        {/* KPI Cards - Stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <AnalyticsCard 
            title="Total Revenue" 
            value={formatMoney(companySummary.revenue)} 
            hint="All regions combined" 
          />
          <AnalyticsCard 
            title="Total Swaps" 
            value={formatNumber(companySummary.swaps)} 
            hint="Total swap transactions" 
          />
          <AnalyticsCard 
            title="Network Uptime" 
            value={`${companySummary.avgUptime}%`} 
            hint="Average uptime" 
          />
          <AnalyticsCard 
            title="Stations" 
            value={formatNumber(companySummary.stations)} 
            hint="Total swap stations" 
          />
          <AnalyticsCard 
            title="Customers" 
            value={formatNumber(companySummary.customers)} 
            hint="Active customers" 
          />
        </div>

        {/* Regions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Regions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {regions.map((r) => (
              <div 
                key={r.id} 
                className="bg-white rounded-2xl p-4 border shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-500">Region</div>
                    <div className="text-lg font-semibold text-emerald-800 mt-1 truncate">
                      {r.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 truncate">
                      Head: {r.head}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-sm text-gray-500">Revenue</div>
                    <div className="text-xl font-bold text-green-600">
                      {formatMoney(r.metrics.revenue)}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatNumber(r.metrics.swaps)} swaps
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <div className="bg-emerald-50/60 rounded-lg p-3 flex items-center justify-between">
                    <div className="text-xs text-gray-600">Uptime</div>
                    <div className="text-sm font-semibold text-emerald-700">
                      {r.metrics.uptime}%
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-2 border border-emerald-50">
                    <div className="h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={toSeries(r.series)}>
                          <Line 
                            dataKey="value" 
                            stroke="#059669" 
                            strokeWidth={2} 
                            dot={false} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {(r.circles || []).length} circles
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openRegion(r)}
                      className="px-3 py-1 rounded-md text-sm bg-emerald-600 text-white flex items-center gap-1"
                    >
                      Open <ArrowRight size={14} />
                    </button>

                    {(roleIsRegional || roleIsCircle) && (
                      <button
                        onClick={() => exportRegionCSV(r)}
                        className="px-2 py-1 border rounded-md text-sm text-xs"
                      >
                        CSV
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Region Details */}
        {selectedRegion && (
          <section className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold text-emerald-800 truncate">
                  Region — {selectedRegion.name}
                </h2>
                <div className="text-xs text-gray-500">Circles overview & analytics</div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(roleIsRegional || roleIsCircle) && (
                  <>
                    <button
                      onClick={() => exportRegionCSV(selectedRegion)}
                      className="px-3 py-2 bg-white border rounded-md text-sm flex-1 sm:flex-none text-center"
                    >
                      Export CSV
                    </button>
                    <button
                      onClick={() => exportRegionPDF(selectedRegion)}
                      className="px-3 py-2 bg-emerald-600 text-white rounded-md text-sm flex-1 sm:flex-none text-center"
                    >
                      Export PDF
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedRegionId(null)}
                  className="px-3 py-2 bg-white border rounded-md text-sm flex-1 sm:flex-none text-center"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <AnalyticsCard 
                title="Revenue" 
                value={formatMoney(selectedRegion.metrics.revenue)} 
                hint="Region total revenue" 
              />
              <AnalyticsCard 
                title="Swaps" 
                value={formatNumber(selectedRegion.metrics.swaps)} 
                hint="Total swaps" 
              />
              <AnalyticsCard 
                title="Stations" 
                value={formatNumber(selectedRegion.metrics.stations)} 
                hint="Total stations" 
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl p-4 border shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                  <div className="font-semibold text-gray-700">Sales by Circle</div>
                  <div className="text-xs text-gray-500">Period: last 6 months</div>
                </div>
                <div className="h-56 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={(selectedRegion.circles || []).map((c) => ({
                        name: c.name.length > 8 ? c.name.substring(0, 8) + '...' : c.name,
                        revenue: c.metrics.revenue,
                      }))}
                    >
                      <XAxis dataKey="name" angle={isMobile ? -45 : 0} textAnchor={isMobile ? "end" : "middle"} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#10B981" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border shadow-sm">
                <div className="font-semibold text-gray-700 mb-2">Circle list</div>
                <div className="max-h-64 sm:max-h-80 overflow-auto">
                  <DataTable
                    columns={circleColumns}
                    rows={selectedRegion.circles || []}
                    onRowClick={(row) => {
                      if (roleIsRegional || roleIsCircle) {
                        router.push(`/user-management/region/${selectedRegion?.id}/circle/${row.id}`);
                      } else {
                        alert("You don't have permission to open this circle.");
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <BottomNavBar />
    </div>
  );
}