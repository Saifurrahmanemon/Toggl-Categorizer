"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
         <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
            <p className="text-gray-600 mb-8">
               We apologize for the inconvenience. Please try again or contact
               support if the problem persists.
            </p>
            <Button
               onClick={reset}
               className="bg-toggl-red hover:bg-toggl-darkRed"
            >
               Try again
            </Button>
         </div>
      </div>
   );
}
