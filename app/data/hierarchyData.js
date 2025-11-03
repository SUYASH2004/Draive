export const hierarchyData = {
  regions: [
    {
      id: "north",
      name: "North Region",
      stats: {
        activeCustomers: 1200,
        activeStations: 84,
        swapsToday: 560,
        swapsWeek: 3120,
      },
      circles: [
        {
          id: "delhi-circle",
          name: "Delhi Circle",
          stats: {
            activeCustomers: 450,
            activeStations: 25,
            swapsToday: 200,
            swapsWeek: 1000,
          },
          cities: [
            {
              id: "delhi-city",
              name: "Delhi",
              clusters: [
                { id: "connaught", name: "Connaught Place" },
                { id: "dwarka", name: "Dwarka" },
                { id: "noida", name: "Noida" },
                { id: "gurgaon", name: "Gurgaon" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "south",
      name: "South Region",
      stats: {
        activeCustomers: 950,
        activeStations: 62,
        swapsToday: 410,
        swapsWeek: 2200,
      },
      circles: [
        {
          id: "bangalore-circle",
          name: "Bangalore Circle",
          stats: {
            activeCustomers: 500,
            activeStations: 30,
            swapsToday: 220,
            swapsWeek: 1100,
          },
          cities: [
            {
              id: "bangalore-city",
              name: "Bangalore",
              clusters: [
                { id: "whitefield", name: "Whitefield" },
                { id: "koramangala", name: "Koramangala" },
                { id: "hebbal", name: "Hebbal" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
