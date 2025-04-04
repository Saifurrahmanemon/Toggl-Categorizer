"use client"

import { useState, useEffect } from "react"
import { Clock, Calendar, BarChart2, Tag } from "lucide-react"
import type { CategorizedTimeEntry } from "@/lib/types"

interface TimeStatsProps {
  entries: CategorizedTimeEntry[]
}

export function TimeStats({ entries }: TimeStatsProps) {
  const [stats, setStats] = useState({
    totalHours: 0,
    totalEntries: 0,
    topCategory: "",
    uniqueCategories: 0,
  })

  useEffect(() => {
    if (!entries.length) return

    // Calculate total hours
    const totalSeconds = entries.reduce((total, entry) => total + entry.duration, 0)
    const totalHours = totalSeconds / 3600 // Convert seconds to hours

    // Find top category
    const categoryMap = new Map()
    entries.forEach((entry) => {
      const category = entry.category
      const duration = entry.duration

      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + duration)
      } else {
        categoryMap.set(category, duration)
      }
    })

    let topCategory = ""
    let maxDuration = 0

    categoryMap.forEach((duration, category) => {
      if (duration > maxDuration) {
        maxDuration = duration
        topCategory = category
      }
    })

    setStats({
      totalHours,
      totalEntries: entries.length,
      topCategory,
      uniqueCategories: categoryMap.size,
    })
  }, [entries])

  const statItems = [
    {
      title: "Total Hours",
      value: `${stats.totalHours.toFixed(2)}h`,
      icon: Clock,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Entries",
      value: stats.totalEntries.toString(),
      icon: Calendar,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Top Category",
      value: stats.topCategory,
      icon: BarChart2,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Categories",
      value: stats.uniqueCategories.toString(),
      icon: Tag,
      color: "bg-orange-100 text-orange-600",
    },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Time Statistics</h2>
      <div className="space-y-4">
        {statItems.map((item) => {
          const Icon = item.icon

          return (
            <div key={item.title} className="flex items-center">
              <div className={`p-3 rounded-full ${item.color} mr-4`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

