"use client";

import type { CategorizedTimeEntry } from "@/lib/types";
import { useEffect, useState } from "react";
import {
   Cell,
   Legend,
   Pie,
   PieChart,
   ResponsiveContainer,
   Tooltip,
} from "recharts";

interface CategoryDistributionChartProps {
   entries: CategorizedTimeEntry[];
}

export function CategoryDistributionChart({
   entries,
}: CategoryDistributionChartProps) {
   const [chartData, setChartData] = useState<any[]>([]);

   useEffect(() => {
      if (!entries.length) return;

      // Group entries by category
      const categoryMap = new Map();

      entries.forEach((entry) => {
         const category = entry.category;
         const duration = entry.duration / 3600; // Convert seconds to hours

         if (categoryMap.has(category)) {
            categoryMap.set(category, categoryMap.get(category) + duration);
         } else {
            categoryMap.set(category, duration);
         }
      });

      // Convert map to array and sort by hours
      const data = Array.from(categoryMap.entries()).map(([name, value]) => ({
         name,
         value: Number.parseFloat(value.toFixed(2)),
      }));

      data.sort((a, b) => b.value - a.value);

      setChartData(data);
   }, [entries]);

   // Generate colors for the chart
   const COLORS = [
      "#E01B22",
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#F9C80E",
      "#FF8C42",
      "#98C1D9",
      "#6A0572",
      "#AB83A1",
   ];

   const RADIAN = Math.PI / 180;
   const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
   }: any) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return percent > 0.05 ? (
         <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
         >
            {`${(percent * 100).toFixed(0)}%`}
         </text>
      ) : null;
   };

   return (
      <div className="h-80">
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
               <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
               >
                  {chartData.map((entry, index) => (
                     <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                     />
                  ))}
               </Pie>
               <Tooltip
                  formatter={(value: number) => [
                     `${value.toFixed(2)} hours`,
                     "Time Spent",
                  ]}
               />
               <Legend />
            </PieChart>
         </ResponsiveContainer>
      </div>
   );
}
