import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Calendar, Clock, Zap } from "lucide-react";

export default function AboutPage() {
   return (
      <div className="min-h-screen bg-gray-50">
         <main className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
               <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                     About Toggl Categorizer
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                     Automatically categorize your Toggl time entries using AI
                     to gain insights into how you spend your time.
                  </p>
               </div>

               <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                     <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                           AI-Powered Time Categorization
                        </h2>
                        <p className="text-gray-600 mb-6">
                           Our app uses Google's Gemini AI to automatically
                           analyze and categorize your Toggl time entries,
                           giving you powerful insights without the manual work.
                        </p>
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                           <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
                              <Calendar className="h-5 w-5 mr-2" />
                              7-Day Limitation
                           </h3>
                           <p className="text-amber-700">
                              Due to the limitations of the free version of the
                              Gemini AI API, this app currently only shows and
                              categorizes time entries from the past 7 days.
                              This helps us manage API usage and ensure the
                              service remains available to all users.
                           </p>
                        </div>
                     </div>
                     <div className="flex-shrink-0 bg-toggl-red/10 p-6 rounded-full">
                        <BarChart className="h-24 w-24 text-toggl-red" />
                     </div>
                  </div>
               </div>

               <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Features
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <Card>
                     <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                           <div className="bg-toggl-red/10 p-3 rounded-full mb-4">
                              <Clock className="h-8 w-8 text-toggl-red" />
                           </div>
                           <h3 className="text-lg font-semibold mb-2">
                              Time Analysis
                           </h3>
                           <p className="text-gray-600">
                              Get a clear breakdown of how your time is
                              distributed across different categories of work.
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                           <div className="bg-toggl-red/10 p-3 rounded-full mb-4">
                              <BarChart className="h-8 w-8 text-toggl-red" />
                           </div>
                           <h3 className="text-lg font-semibold mb-2">
                              Visual Reports
                           </h3>
                           <p className="text-gray-600">
                              View beautiful charts and visualizations that make
                              it easy to understand your time usage patterns.
                           </p>
                        </div>
                     </CardContent>
                  </Card>

                  <Card>
                     <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                           <div className="bg-toggl-red/10 p-3 rounded-full mb-4">
                              <Zap className="h-8 w-8 text-toggl-red" />
                           </div>
                           <h3 className="text-lg font-semibold mb-2">
                              AI Categorization
                           </h3>
                           <p className="text-gray-600">
                              Let AI do the work of categorizing your entries
                              based on descriptions and patterns.
                           </p>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </main>

         <footer className="bg-white border-t border-gray-200 mt-16">
            <div className="container mx-auto px-6 py-8">
               <div className="text-center text-gray-500 text-sm">
                  <p>
                     This app is not affiliated with Toggl. It's an independent
                     tool that works with Toggl data.
                  </p>
                  <p className="mt-2">
                     © {new Date().getFullYear()} Toggl Time Entry Categorizer
                  </p>
               </div>
            </div>
         </footer>
      </div>
   );
}
