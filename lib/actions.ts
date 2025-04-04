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

   const existing = await categorizationsCollection.findOne({ entryId });

   if (existing) {
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
      await categorizationsCollection.insertOne({
         entryId,
         category,
         userModified: true,
         createdAt: new Date(),
         modifiedAt: new Date(),
      });
   }

   const correctionsCollection = db.collection("categoryCorrections");
   await correctionsCollection.insertOne({
      entryId,
      previousCategory,
      newCategory: category,
      timestamp: new Date(),
   });

   revalidatePath("/entries");

   return { success: true };
}
