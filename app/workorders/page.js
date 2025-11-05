"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "../components/RoleContext"; // ✅ Import role context
import workOrdersData from "../data/workorders.json";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BottomNavBar from "../components/BottomNavBar";

export default function WorkOrdersPage() {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filteredData, setFilteredData] = useState(workOrdersData);
  const { user } = useRole();
  const router = useRouter();

  // ✅ Access Control
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Allow only Admin or Operations Head
    if (user.role !== "Admin" && user.role !== "Operations Head") {
      alert("Access denied: You don’t have permission to view Work Orders.");
      router.push("/home");
    }
  }, [user]);

  useEffect(() => {
    let result = workOrdersData.filter(
      (wo) =>
        wo.location.toLowerCase().includes(filter.toLowerCase()) ||
        wo.technician.toLowerCase().includes(filter.toLowerCase()) ||
        wo.id.toLowerCase().includes(filter.toLowerCase())
    );

    if (statusFilter !== "All") {
      result = result.filter((wo) => wo.status === statusFilter);
    }

    setFilteredData(result);
  }, [filter, statusFilter]);

  const totalActive = workOrdersData.filter(
    (w) => w.status === "In Progress" || w.status === "Pending"
  ).length;
  const totalCompleted = workOrdersData.filter(
    (w) => w.status === "Completed"
  ).length;
  const totalCost = workOrdersData.reduce((sum, w) => sum + w.cost, 0);

  const statusColor = {
    Completed: "bg-green-100 text-green-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Delayed: "bg-red-100 text-red-700",
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        ⚙️ Work Orders Dashboard
      </h1>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="shadow-md border-l-4 border-emerald-500">
          <CardHeader>
            <CardTitle>Active Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-emerald-700">{totalActive}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-blue-500">
          <CardHeader>
            <CardTitle>Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-700">{totalCompleted}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md border-l-4 border-yellow-500">
          <CardHeader>
            <CardTitle>Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-700">
              ₹{totalCost.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search by ID, Location, or Technician..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Delayed">Delayed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="shadow-lg">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-emerald-100">
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Est. Hrs</TableHead>
                <TableHead>Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((wo) => (
                <TableRow key={wo.id}>
                  <TableCell className="font-semibold">{wo.id}</TableCell>
                  <TableCell>{wo.type}</TableCell>
                  <TableCell>{wo.technician}</TableCell>
                  <TableCell>{wo.location}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        wo.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : wo.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }
                    >
                      {wo.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        statusColor[wo.status] || "bg-gray-100 text-gray-700"
                      }
                    >
                      {wo.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{wo.estimatedHours}</TableCell>
                  <TableCell>₹{wo.cost.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        <BottomNavBar />
      </div>
    </div>
  );
}
