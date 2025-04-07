import { LoadingSpinner } from "@/components/loading-spinner";
import { ReportsContent } from "@/components/reports-content";
import { requireAuth } from "@/lib/auth-utils";
import { Suspense } from "react";

export default async function ReportsPage() {
   await requireAuth();

   return (
      <main className="p-6">
         <div className="mb-6">
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-gray-500">
               Detailed analytics of your time entries
            </p>
         </div>

         <Suspense fallback={<LoadingSpinner />}>
            <ReportsContent />
         </Suspense>
      </main>
   );
}
