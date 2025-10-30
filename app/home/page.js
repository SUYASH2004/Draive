"use client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import KPISection from "../components/KPISection";

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome to <span className="text-emerald-600">Voltup Draive Dashboard</span> ⚡
          </h2>
          <p className="text-gray-500 mt-2">
            Monitor your EV ecosystem performance and operations efficiently.
          </p>

          {/* KPI Cards */}
          <KPISection />

          {/* Recent Activity Section */}
          <section className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h3>
            <div className="bg-white rounded-2xl shadow-md p-6">
              <ul className="space-y-3 text-gray-600">
                <li>🔋 Asset EV001 battery health updated to 94%</li>
                <li>🧾 New work order assigned to technician Rahul</li>
                <li>🚗 Customer “GreenFleet Pvt Ltd” subscribed to Pro Plan</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
