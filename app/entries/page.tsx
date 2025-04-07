import { LoadingSpinner } from "@/components/loading-spinner";
import { TimeEntriesList } from "@/components/time-entries-list";
import { requireAuth } from "@/lib/auth-utils";
import { Suspense } from "react";

export default async function EntriesPage() {
   await requireAuth();

   return (
      <main className="p-6">
         <div className="mb-6">
            <h1 className="text-2xl font-bold">Time Entries</h1>
            <p className="text-gray-500">
               View and manage your categorized time entries
            </p>
         </div>

         <Suspense fallback={<LoadingSpinner />}>
            <TimeEntriesList />
         </Suspense>
      </main>
   );
}
