"use client";

import { Treemap, Tooltip, ResponsiveContainer } from "recharts";

export default function YearlyActivityTree() {
  const data = [
    {
      name: "2025",
      children: [
        { name: "Jan", size: 400 },
        { name: "Feb", size: 300 },
        { name: "Mar", size: 200 },
        { name: "Apr", size: 278 },
        { name: "May", size: 189 },
        { name: "Jun", size: 239 },
        { name: "Jul", size: 349 },
        { name: "Aug", size: 200 },
        { name: "Sep", size: 300 },
        { name: "Oct", size: 250 },
        { name: "Nov", size: 210 },
        { name: "Dec", size: 160 },
      ],
    },
  ];

  return (
    <div className="w-full h-96 rounded-xl border p-4">
      <h2 className="text-lg font-semibold mb-2">Yearly Activity Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          // ratio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        >
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
