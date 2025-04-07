import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export async function requireAuth() {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/auth/signin");
   }

   return session;
}

export async function requireRole(role: string) {
   const session = await getServerSession(authOptions);

   if (!session) {
      redirect("/auth/signin");
   }

   return session;
}

export async function apiAuthMiddleware(req: NextRequest) {
   const session = await getServerSession(authOptions);

   if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
         status: 401,
         headers: {
            "Content-Type": "application/json",
         },
      });
   }

   return null; // Continue to the API route
}
