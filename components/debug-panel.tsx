"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DebugPanel() {
   const [isOpen, setIsOpen] = useState(false);
   const [debugInfo, setDebugInfo] = useState<any>(null);
   const [isLoading, setIsLoading] = useState(false);

   const fetchDebugInfo = async () => {
      setIsLoading(true);
      try {
         const response = await fetch("/api/debug");
         const data = await response.json();
         setDebugInfo(data);
      } catch (error) {
         console.error("Error fetching debug info:", error);
         setDebugInfo({ error: "Failed to fetch debug info" });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="fixed bottom-4 right-4 z-50">
         <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white shadow-md"
         >
            {isOpen ? "Close Debug" : "Debug"}
         </Button>

         {isOpen && (
            <div className="mt-2 p-4 bg-white rounded-lg shadow-lg border w-80 max-h-96 overflow-auto">
               <h3 className="font-medium mb-2">Debug Panel</h3>

               <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchDebugInfo}
                  disabled={isLoading}
                  className="mb-4"
               >
                  {isLoading ? "Loading..." : "Fetch Debug Info"}
               </Button>

               {debugInfo && (
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                     {JSON.stringify(debugInfo, null, 2)}
                  </pre>
               )}
            </div>
         )}
      </div>
   );
}
