import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
         <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
            <h1 className="text-6xl font-bold text-toggl-red mb-4">404</h1>
            <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-8">
               The page you are looking for doesn't exist or has been moved.
            </p>
            <Button asChild className="bg-toggl-red hover:bg-toggl-darkRed">
               <Link href="/">Return to Dashboard</Link>
            </Button>
         </div>
      </div>
   );
}
