import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const session = await getServerSession(authOptions);

      if (!session) {
         return NextResponse.json(
            { error: "Not authenticated" },
            { status: 401 }
         );
      }

      const db = await connectToDatabase();

      const recentCategorizations = await db
         .collection("categorizations")
         .find({})
         .sort({ createdAt: -1 })
         .limit(5)
         .toArray();

      const recentCorrections = await db
         .collection("categoryCorrections")
         .find({})
         .sort({ timestamp: -1 })
         .limit(5)
         .toArray();

      return NextResponse.json({
         recentCategorizations,
         recentCorrections,
         timestamp: new Date().toISOString(),
      });
   } catch (error) {
      console.error("Debug API error:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}
