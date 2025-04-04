"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import type { CategorizedTimeEntry } from "@/lib/types"

interface CategoryBreakdownProps {
  entries: CategorizedTimeEntry[]
}

interface CategoryData {
  name: string
  hours: number
  percentage: number
  entryCount: number
}

export function CategoryBreakdown({ entries }: CategoryBreakdownProps) {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [totalHours, setTotalHours] = useState(0)

  useEffect(() => {
    if (!entries.length) return

    // Group entries by category
    const categoryMap = new Map()
    let total = 0

    entries.forEach((entry) => {
      const category = entry.category
      const duration = entry.duration / 3600 // Convert seconds to hours
      total += duration

      if (categoryMap.has(category)) {
        const current = categoryMap.get(category)
        categoryMap.set(category, {
          ...current,
          hours: current.hours + duration,
          entryCount: current.entryCount + 1,
        })
      } else {
        categoryMap.set(category, {
          name: category,
          hours: duration,
          entryCount: 1,
        })
      }
    })

    // Calculate percentages and format data
    const categoriesData = Array.from(categoryMap.values()).map((category) => ({
      ...category,
      hours: Number.parseFloat(category.hours.toFixed(2)),
      percentage: Number.parseFloat(((category.hours / total) * 100).toFixed(2)),
    }))

    // Sort by hours (descending)
    categoriesData.sort((a, b) => b.hours - a.hours)

    setCategories(categoriesData)
    setTotalHours(Number.parseFloat(total.toFixed(2)))
  }, [entries])

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Percentage</TableHead>
            <TableHead>Entries</TableHead>
            <TableHead className="w-1/3">Distribution</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.name}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.hours}</TableCell>
              <TableCell>{category.percentage}%</TableCell>
              <TableCell>{category.entryCount}</TableCell>
              <TableCell>
                <Progress value={category.percentage} className="h-2" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 text-sm text-gray-500 text-right">Total Hours: {totalHours}</div>
    </div>
  )
}

