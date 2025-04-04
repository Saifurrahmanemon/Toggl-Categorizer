import { DashboardContent } from "@/components/dashboard-content";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function Home() {
   const session = await getServerSession(authOptions);

   if (!session) {
      return (
         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
               <h1 className="text-3xl font-bold text-center mb-6">
                  Toggl Time Entry Categorizer
               </h1>
               <p className="text-gray-600 mb-8 text-center">
                  Automatically categorize your Toggl time entries using AI.
               </p>
               <div className="flex justify-center">
                  <Button
                     asChild
                     size="lg"
                     className="bg-toggl-red hover:bg-toggl-darkRed"
                  >
                     <a href="/api/auth/signin">Sign in with Toggl</a>
                  </Button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <main className="p-6">
         <div className="mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-500">
               Overview of your time entries and categories
            </p>
         </div>

         <Suspense fallback={<LoadingSpinner />}>
            <DashboardContent />
         </Suspense>
      </main>
   );
}
