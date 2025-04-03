import { TimeEntryList } from "@/components/time-entry-list";
import { categorizeTimeEntries } from "@/lib/categorization";
import { getTimeEntries } from "@/lib/toggl";

export async function TimeEntriesDashboard() {
   const timeEntries = await getTimeEntries();

   const categorizedEntries = await categorizeTimeEntries(timeEntries);

   return (
      <div className="space-y-6">
         <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
               Your Categorized Time Entries
            </h2>
            <TimeEntryList entries={categorizedEntries} />
         </div>
      </div>
   );
}
