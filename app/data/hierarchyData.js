// draive/app/data/hierarchy.js
export const REGIONS = [
  {
    id: "west",
    name: "West",
    head: "Rajesh Sharma",
    metrics: {
      revenue: 12800000,
      swaps: 48200,
      uptime: 98.6,
      stations: 220,
      customers: 15800,
      batteries: 32000,
    },
    series: [1200, 1400, 1500, 1600, 1700, 1800],
    circles: [
      {
        id: "mumbai",
        name: "Mumbai",
        head: "Amit Patel",
        metrics: { revenue: 4800000, swaps: 18200, uptime: 97.8, stations: 75, customers: 6200 },
        series: [1200, 1250, 1300, 1350, 1400, 1450],
      },
      {
        id: "pune",
        name: "Pune",
        head: "Anjali Mehta",
        metrics: { revenue: 3200000, swaps: 13200, uptime: 98.1, stations: 60, customers: 5600 },
        series: [1000,1050,1100,1150,1180,1200],
      },
    ],
  },
  {
    id: "north",
    name: "North",
    head: "Vikram Singh",
    metrics: {
      revenue: 9200000,
      swaps: 38000,
      uptime: 97.2,
      stations: 180,
      customers: 11200,
      batteries: 22000,
    },
    series: [900,950,1000,1050,1100,1150],
    circles: [
      {
        id: "delhi",
        name: "Delhi",
        head: "Sunita Rao",
        metrics: { revenue: 4200000, swaps: 21000, uptime: 97.5, stations: 80, customers: 7200 },
        series: [700,720,740,760,780,800],
      },
    ],
  },
  {
    id: "south",
    name: "South",
    head: "Kumar R",
    metrics: { revenue: 7600000, swaps: 29000, uptime: 98.4, stations: 150, customers: 9000, batteries: 18000 },
    series: [700,720,740,760,780,820],
    circles: [],
  },
  {
    id: "east",
    name: "East",
    head: "Meera Iyer",
    metrics: { revenue: 4300000, swaps: 17000, uptime: 96.9, stations: 100, customers: 6500, batteries: 10000 },
    series: [400,420,430,440,460,480],
    circles: [],
  },
];

export function findRegionById(id) {
  return REGIONS.find((r) => r.id === id) || null;
}
export function findCircleById(regionId, circleId) {
  const r = findRegionById(regionId);
  return r ? (r.circles || []).find((c) => c.id === circleId) || null : null;
}