"use client";
import React from "react";

export default function DataTable({ columns = [], rows = [], onRowClick }) {
  return (
    <div className="overflow-x-auto bg-white rounded-2xl p-4 border shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="text-left text-xs text-gray-500 uppercase">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="py-2 pr-4">{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.id || i}
              className={`transition hover:bg-emerald-50 cursor-pointer ${i % 2 ? "bg-gray-50" : ""}`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((c) => (
                <td key={c.key} className="py-3 pr-4">
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
