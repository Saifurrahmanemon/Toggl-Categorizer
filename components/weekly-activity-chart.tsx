"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format, startOfWeek, addDays, parseISO, isWithinInterval } from "date-fns"
import type { CategorizedTimeEntry } from "@/lib/types"

interface WeeklyActivityChartProps {
  entries: CategorizedTimeEntry[]
}

export function WeeklyActivityChart({ entries }: WeeklyActivityChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (!entries.length) return

    // Get the current week's start date (Sunday)
    const today = new Date()
    const startDate = startOfWeek(today)

    // Initialize data for each day of the week
    const weekData = Array.from({ length: 7 }, (_, i) => {
      const date = addDays(startDate, i)
      return {
        name: format(date, "EEE"),
        date,
        hours: 0,
      }
    })

    // Group entries by day of the week
    entries.forEach((entry) => {
      const entryDate = parseISO(entry.start)
      const dayIndex = weekData.findIndex((day) =>
        isWithinInterval(entryDate, {
          start: new Date(day.date.setHours(0, 0, 0, 0)),
          end: new Date(day.date.setHours(23, 59, 59, 999)),
        }),
      )

      if (dayIndex !== -1) {
        weekData[dayIndex].hours += entry.duration / 3600 // Convert seconds to hours
      }
    })

    // Format hours to 2 decimal places
    weekData.forEach((day) => {
      day.hours = Number.parseFloat(day.hours.toFixed(2))
    })

    setChartData(weekData)
  }, [entries])

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value: number) => [`${value} hours`, "Time Spent"]} />
          <Bar dataKey="hours" fill="#E01B22" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

