import { TimeEntryTable } from "@/components/time-entry-table";
import { categorizeTimeEntries } from "@/lib/categorization";
import { getTimeEntries } from "@/lib/toggl";

export async function TimeEntriesList() {
   const timeEntries = await getTimeEntries();

   const categorizedEntries = await categorizeTimeEntries(timeEntries);

   return (
      <div className="bg-white rounded-lg shadow">
         <TimeEntryTable entries={categorizedEntries} />
      </div>
   );
}
