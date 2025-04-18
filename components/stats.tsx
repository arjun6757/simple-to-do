"use client";

import ActivityCalendar from "react-activity-calendar";

import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const taskStats = {
  completed: 12,
  pending: 4,
  skipped: 2,
};

const focusStats = {
  totalSessions: 18,
  totalMinutes: 540, // 9 hours
};

const mockActivityData = [
  { date: "2025-03-10", count: 2, level: 1 },
  { date: "2025-03-12", count: 4, level: 3 },
  { date: "2025-03-13", count: 1, level: 1 },
  { date: "2025-03-15", count: 5, level: 4 },
  { date: "2025-03-18", count: 3, level: 2 },
  { date: "2025-03-19", count: 2, level: 1 },
  { date: "2025-03-21", count: 1, level: 1 },
  { date: "2025-03-24", count: 6, level: 4 },
  { date: "2025-03-26", count: 4, level: 3 },
  { date: "2025-03-28", count: 2, level: 1 },
  { date: "2025-04-01", count: 3, level: 2 },
  { date: "2025-04-02", count: 2, level: 1 },
  { date: "2025-04-03", count: 5, level: 4 },
  { date: "2025-04-05", count: 1, level: 1 },
  { date: "2025-04-07", count: 4, level: 3 },
  { date: "2025-04-08", count: 2, level: 1 },
  { date: "2025-04-10", count: 3, level: 2 },
  { date: "2025-04-11", count: 1, level: 1 },
  { date: "2025-04-13", count: 4, level: 3 },
];

const barData = [
  { day: "Mon", minutes: 90 },
  { day: "Tue", minutes: 60 },
  { day: "Wed", minutes: 45 },
  { day: "Thu", minutes: 30 },
  { day: "Fri", minutes: 60 },
  { day: "Sat", minutes: 120 },
  { day: "Sun", minutes: 135 },
];

// Generates mock daily activity data for the whole year (365 days)
// function generateYearlyMockStats(year = 2025) {
//   const stats = [];
//   const start = new Date(`${year}-01-01`);
//   const end = new Date(`${year}-12-31`);

//   for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
//     stats.push({
//       date: d.toISOString().slice(0, 10),
//       value: Math.floor(Math.random() * 6), // 0 to 5 pomodoros
//     });
//   }

//   return stats;
// }

const Stats = () => {
  return (
    <div className="font-sans flex flex-col gap-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-xs lg:col-span-2">
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">
              Focus Time (Last 7 Days)
            </h2>
            <div className="h-auto sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip wrapperClassName="rounded-md" />
                  <Bar dataKey="minutes" fill="#525252" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Summary cards */}
        <div className="min-h-full">
          <Card className="shadow-xs h-full">
            <CardContent>
              <h2 className="text-lg font-semibold mb-2">
                Productivity Summary
              </h2>
              <ul className="space-y-1 text-sm">
                <li>✅ Tasks Completed: {taskStats.completed}</li>
                <li>⏳ Focus Sessions: {focusStats.totalSessions}</li>
                <li>🕒 Total Focus Time: {focusStats.totalMinutes / 60} hrs</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardContent>
          <ActivityCalendar
            data={mockActivityData}
            blockSize={12}
            blockMargin={2}
            fontSize={14}
            hideColorLegend
            hideTotalCount
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
