import { DebugPanel } from "@/components/debug-panel";
import { Sidebar } from "@/components/sidebar";
import { authOptions } from "@/lib/auth";
import { isDev } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Toggl Time Entry Categorizer",
   description: "Automatically categorize your Toggl time entries using AI",
};

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const session = await getServerSession(authOptions);

   return (
      <html lang="en">
         <body className={inter.className}>
            {session ? (
               <div className="flex h-screen">
                  <Sidebar userName={session.user?.name || "User"} />
                  <div className="flex-1 md:ml-64 overflow-auto">
                     {children}
                  </div>
               </div>
            ) : (
               children
            )}
            {isDev && session && <DebugPanel />}
            <Analytics />
         </body>
      </html>
   );
}
