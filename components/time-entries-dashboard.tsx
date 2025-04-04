import { getTimeEntries } from "@/lib/toggl"
import { categorizeTimeEntries } from "@/lib/categorization"
import { TimeEntryList } from "@/components/time-entry-list"

export async function TimeEntriesDashboard() {
  // Fetch time entries from Toggl
  const timeEntries = await getTimeEntries()

  // Categorize time entries using AI
  const categorizedEntries = await categorizeTimeEntries(timeEntries)

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Your Categorized Time Entries</h2>
        <TimeEntryList entries={categorizedEntries} />
      </div>
    </div>
  )
}

