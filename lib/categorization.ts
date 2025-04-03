import { connectToDatabase } from "@/lib/mongodb";
import type { CategorizedTimeEntry, TimeEntry } from "@/lib/types";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const CATEGORIES = [
   "Frontend Development",
   "Backend Development",
   "Design",
   "Research",
   "Meetings",
   "Documentation",
   "DevOps",
   "Testing",
   "Other",
];

interface Category {
   id: string;
   category: string;
   confidence: string;
}

export async function categorizeTimeEntries(
   timeEntries: TimeEntry[]
): Promise<CategorizedTimeEntry[]> {
   if (timeEntries.length === 0) return [];

   // First, check if we have cached categorizations in the database
   const db = await connectToDatabase();
   const categorizationsCollection = db.collection("categorizations");

   const entryIds = timeEntries.map((entry) => entry.id);
   const existingCategorizations = await categorizationsCollection
      .find({ entryId: { $in: entryIds } })
      .toArray();

   // Create a map of existing categorizations for quick lookup
   const categorizationMap = new Map();
   existingCategorizations.forEach((cat) => {
      categorizationMap.set(cat.entryId, {
         category: cat.category,
         aiConfidence: cat.aiConfidence,
      });
   });

   const entriesToCategorize = timeEntries.filter(
      (entry) => !categorizationMap.has(entry.id)
   );

   if (entriesToCategorize.length > 0) {
      const batchSize = 5; // Process in smaller batches for Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      for (let i = 0; i < entriesToCategorize.length; i += batchSize) {
         const batch = entriesToCategorize.slice(i, i + batchSize);

         // Prepare the prompt for the Gemini model
         const prompt = `
        Task: Categorize the following time entries into predefined categories.

        Categories:
        ${CATEGORIES.join(", ")}

        Time entries:
        ${batch
           .map(
              (entry, index) =>
                 `${index + 1}. ID: ${entry.id}, Description: ${
                    entry.description || "No description"
                 }`
           )
           .join("\n")}

        Instructions:
        - Analyze each time entry description and assign it to the most appropriate category
        - For each entry, provide a confidence score between 0 and 1
        - Format your response as a valid JSON array with this structure:
        [
          {
            "id": "entry_id",
            "category": "category_name",
            "confidence": 0.95
          }
        ]
        - Only include the JSON array in your response, no other text
      `;

         try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Extract JSON from the response
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
               console.error("Failed to extract JSON from Gemini response");
               continue;
            }

            try {
               const categorizations = JSON.parse(jsonMatch[0]);

               // Store the categorizations in the database
               const categorizationsToInsert = categorizations.map(
                  (cat: Category) => ({
                     entryId: cat.id,
                     category: cat.category,
                     aiConfidence: cat.confidence,
                     createdAt: new Date(),
                  })
               );

               if (categorizationsToInsert.length > 0) {
                  const result = await categorizationsCollection.insertMany(
                     categorizationsToInsert
                  );
               }

               categorizations.forEach((cat: Category) => {
                  categorizationMap.set(cat.id, {
                     category: cat.category,
                     aiConfidence: cat.confidence,
                  });
               });
            } catch (jsonError) {
               console.error(
                  "Error parsing JSON from Gemini response:",
                  jsonError
               );
            }
         } catch (error) {
            console.error(
               "Error categorizing time entries with Gemini:",
               error
            );

            batch.forEach((entry) => {
               categorizationMap.set(entry.id, {
                  category: "Other",
                  aiConfidence: 0,
               });
            });
         }
      }
   }

   return timeEntries.map((entry) => {
      const categorization = categorizationMap.get(entry.id?.toString()) || {
         category: "Other",
         aiConfidence: 0,
      };

      return {
         ...entry,
         category: categorization.category,
         aiConfidence: categorization.aiConfidence,
      };
   });
}
