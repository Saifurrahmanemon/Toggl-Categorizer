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
   const categorizationsCollection = db.collection("categorizations");

   // Check if we already have a categorization for this entry
   const existing = await categorizationsCollection.findOne({ entryId });

   if (existing) {
      // Update the existing categorization
      await categorizationsCollection.updateOne(
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
      // Create a new categorization
      await categorizationsCollection.insertOne({
         entryId,
         category,
         userModified: true,
         createdAt: new Date(),
         modifiedAt: new Date(),
      });
   }

   // Store this correction for model improvement
   const correctionsCollection = db.collection("categoryCorrections");
   await correctionsCollection.insertOne({
      entryId,
      previousCategory,
      newCategory: category,
      timestamp: new Date(),
   });

   // Revalidate the page to show the updated data
   revalidatePath("/");

   return { success: true };
}
