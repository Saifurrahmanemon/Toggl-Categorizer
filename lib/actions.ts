"use server";

import { connectToDatabase } from "@/lib/mongodb";
import type { CategoryUpdateParams } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function updateTimeEntryCategory({
   entryId,
   category,
   previousCategory,
}: CategoryUpdateParams) {
   const db = await connectToDatabase();
   const categorizations = db.collection("categorizations");

   // Check if we already have a categorization for this entry
   const existing = await categorizations.findOne({ entryId });

   if (existing) {
      await categorizations.updateOne(
         { entryId },
         {
            $set: {
               category,
               userModified: true,
               modifiedAt: new Date(),
            },
         }
      );
   } else {
      await categorizations.insertOne({
         entryId,
         category,
         userModified: true,
         createdAt: new Date(),
         modifiedAt: new Date(),
      });
   }

   const corrections = db.collection("categoryCorrections");
   await corrections.insertOne({
      entryId,
      previousCategory,
      newCategory: category,
      timestamp: new Date(),
   });

   revalidatePath("/");

   return { success: true };
}
