import { CategoryChart } from "@/components/category-chart";
import { RecentEntries } from "@/components/recent-entries";
import { TimeStats } from "@/components/time-stats";
import { categorizeTimeEntries } from "@/lib/categorization";
import { getTimeEntries } from "@/lib/toggl";
import { AlertCircle } from "lucide-react";

export async function DashboardContent() {
   try {
      const timeEntries = await getTimeEntries();

      if (!timeEntries || timeEntries.length === 0) {
         return (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
               <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
               <h2 className="text-xl font-semibold mb-2">
                  No time entries found
               </h2>
               <p className="text-gray-600 text-center">
                  We couldn't find any time entries for the last 30 days. Start
                  tracking time in Toggl to see your data here.
               </p>
            </div>
         );
      }

      const categorizedEntries = await categorizeTimeEntries(timeEntries);

      return (
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TimeStats entries={categorizedEntries} />

            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
               <h2 className="text-lg font-semibold mb-4">
                  Category Distribution
               </h2>
               <CategoryChart entries={categorizedEntries} />
            </div>

            <div className="md:col-span-3 bg-white p-6 rounded-lg shadow">
               <h2 className="text-lg font-semibold mb-4">Recent Entries</h2>
               <RecentEntries entries={categorizedEntries.slice(0, 5)} />
            </div>
         </div>
      );
   } catch (error) {
      throw error;
   }
}
