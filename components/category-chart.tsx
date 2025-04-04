"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CategorizedTimeEntry } from "@/lib/types"

interface CategoryChartProps {
  entries: CategorizedTimeEntry[]
}

export function CategoryChart({ entries }: CategoryChartProps) {
  const [chartData, setChartData] = useState<any[]>([])
  const [view, setView] = useState<"hours" | "entries">("hours")

  useEffect(() => {
    if (!entries.length) return

    // Group entries by category
    const categoryMap = new Map()

    entries.forEach((entry) => {
      const category = entry.category
      const duration = entry.duration / 3600 // Convert seconds to hours

      if (categoryMap.has(category)) {
        const current = categoryMap.get(category)
        categoryMap.set(category, {
          ...current,
          hours: current.hours + duration,
          count: current.count + 1,
        })
      } else {
        categoryMap.set(category, {
          category,
          hours: duration,
          count: 1,
        })
      }
    })

    // Convert map to array and sort by hours
    const data = Array.from(categoryMap.values())
    data.sort((a, b) => b.hours - a.hours)

    setChartData(data)
  }, [entries])

  // Generate colors for the chart
  const COLORS = ["#E01B22", "#FF6B6B", "#4ECDC4", "#45B7D1", "#F9C80E", "#FF8C42", "#98C1D9", "#6A0572", "#AB83A1"]

  return (
    <div className="h-80">
      <Tabs defaultValue="hours" className="mb-4">
        <TabsList>
          <TabsTrigger value="hours" onClick={() => setView("hours")}>
            Hours
          </TabsTrigger>
          <TabsTrigger value="entries" onClick={() => setView("entries")}>
            Entries
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip
            formatter={(value: number) => [
              view === "hours" ? `${value.toFixed(2)} hours` : `${value} entries`,
              "Value",
            ]}
          />
          <Bar dataKey={view === "hours" ? "hours" : "count"} name={view === "hours" ? "Hours" : "Entries"}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

