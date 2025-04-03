"use client";

import { Button } from "@/components/ui/button";
import { Clock, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function Header({ userName }: { userName: string }) {
   return (
      <header className="border-b">
         <div className="container mx-auto py-4 px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
               <Clock className="h-6 w-6" />
               <h1 className="text-xl font-bold">Toggl Categorizer</h1>
            </div>

            <div className="flex items-center gap-4">
               <span className="text-sm text-gray-600 hidden md:inline-block">
                  Signed in as {userName}
               </span>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="flex items-center gap-2"
               >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
               </Button>
            </div>
         </div>
      </header>
   );
}
