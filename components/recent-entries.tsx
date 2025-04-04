"use client"

import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import type { CategorizedTimeEntry } from "@/lib/types"

interface RecentEntriesProps {
  entries: CategorizedTimeEntry[]
}

export function RecentEntries({ entries }: RecentEntriesProps) {
  if (entries.length === 0) {
    return <p className="text-gray-500 text-center py-4">No recent entries found.</p>
  }

  return (
    <div>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between border-b pb-4">
            <div className="space-y-1">
              <h3 className="font-medium">{entry.description || "No description"}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <span>{formatDistanceToNow(new Date(entry.start), { addSuffix: true })}</span>
                <span className="mx-2">•</span>
                <span>{Math.round(entry.duration / 60)} minutes</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-gray-100">
                {entry.category}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Button asChild variant="outline">
          <Link href="/entries" className="flex items-center">
            View all entries
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

