"use client";
import { motion } from "framer-motion";

export default function Card({ 
  title, 
  value, 
  icon, 
  subtitle, 
  trend, 
  onClick,
  className = "" 
}) {
  const getTrendColor = (trend) => {
    if (!trend) return "text-gray-500";
    return trend > 0 ? "text-emerald-500" : "text-red-500";
  };

  const getTrendIcon = (trend) => {
    if (!trend) return null;
    return trend > 0 ? "▲" : "▼";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative bg-white/80 backdrop-blur-md border border-emerald-100/60
        rounded-2xl p-6 overflow-hidden group
        shadow-sm hover:shadow-xl transition-all duration-300 ease-out
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      {/* Subtle glowing border on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

      {/* Content */}
      <div className="relative z-10 space-y-3">
        {/* Title + Icon + Trend */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600 font-medium text-sm">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 shadow-sm">
              {icon}
            </div>
            <span>{title}</span>
          </div>

          {trend && (
            <div
              className={`text-xs font-semibold ${getTrendColor(trend)} flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg`}
            >
              <span>{getTrendIcon(trend)}</span>
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        {/* Main Value */}
        <div className="text-4xl font-extrabold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent tracking-tight">
          {value}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div className="text-sm text-gray-500 font-medium">{subtitle}</div>
        )}

        {/* Progress Bar (auto-detect for percentage-based KPIs) */}
        {(title.toLowerCase().includes("battery") ||
          title.toLowerCase().includes("health")) &&
          typeof value === "string" &&
          value.includes("%") && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: value }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full shadow-sm"
                />
              </div>
            </div>
          )}
      </div>
    </motion.div>
  );
}
