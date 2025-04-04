import { getTimeEntries } from "@/lib/toggl"
import { categorizeTimeEntries } from "@/lib/categorization"
import { CategoryChart } from "@/components/category-chart"
import { TimeStats } from "@/components/time-stats"
import { RecentEntries } from "@/components/recent-entries"

export async function DashboardContent() {
  // Fetch time entries from Toggl
  const timeEntries = await getTimeEntries()

  // Categorize time entries using AI
  const categorizedEntries = await categorizeTimeEntries(timeEntries)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Time statistics */}
      <TimeStats entries={categorizedEntries} />

      {/* Category distribution chart */}
      <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
        <CategoryChart entries={categorizedEntries} />
      </div>

      {/* Recent entries */}
      <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Entries</h2>
        <RecentEntries entries={categorizedEntries.slice(0, 5)} />
      </div>
    </div>
  )
}

