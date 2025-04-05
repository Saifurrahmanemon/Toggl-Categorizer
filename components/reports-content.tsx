import { CategoryBreakdown } from "@/components/category-breakdown";
import { CategoryDistributionChart } from "@/components/category-distribution-chart";
import { WeeklyActivityChart } from "@/components/weekly-activity-chart";
import { categorizeTimeEntries } from "@/lib/categorization";
import { getTimeEntries } from "@/lib/toggl";

export async function ReportsContent() {
   const timeEntries = await getTimeEntries();

   const categorizedEntries = await categorizeTimeEntries(timeEntries);

   console.log(categorizedEntries);

   return (
      <div className="space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
               <h2 className="text-lg font-semibold mb-4">
                  Category Distribution
               </h2>
               <CategoryDistributionChart entries={categorizedEntries} />
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
               <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
               <WeeklyActivityChart entries={categorizedEntries} />
            </div>
         </div>

         <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>
            <CategoryBreakdown entries={categorizedEntries} />
         </div>
      </div>
   );
}
