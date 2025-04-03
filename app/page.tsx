import { Header } from "@/components/header";
import { LoadingSpinner } from "@/components/loading-spinner";
import { TimeEntriesDashboard } from "@/components/time-entries-dashboard";
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
                  <Button asChild size="lg">
                     <a href="/api/auth/signin">Sign in with Toggl</a>
                  </Button>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen flex flex-col">
         <Header userName={session.user?.name || "User"} />
         <div className="container mx-auto py-8 px-4 flex-1">
            <h1 className="text-3xl font-bold mb-8">Your Time Entries</h1>
            <Suspense fallback={<LoadingSpinner />}>
               <TimeEntriesDashboard />
            </Suspense>
         </div>
      </div>
   );
}
