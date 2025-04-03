import { connectToDatabase } from "@/lib/mongodb";
import type { CategorizedTimeEntry, TimeEntry } from "@/lib/types";
import { OpenAI } from "openai";

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

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
   id: any;
   category: any;
   confidence: any;
}

export async function categorizeTimeEntries(
   timeEntries: TimeEntry[]
): Promise<CategorizedTimeEntry[]> {
   if (timeEntries.length === 0) return [];

   const db = await connectToDatabase();
   const categorizations = db.collection("categorizations");

   const entryIds = timeEntries.map((entry) => entry.id);
   const existingCategorizations = await categorizations
      .find({ entryId: { $in: entryIds } })
      .toArray();

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

   // If there are entries to categorize, use the AI model
   if (entriesToCategorize.length > 0) {
      const batchSize = 10; // Process in batches to avoid rate limits

      for (let i = 0; i < entriesToCategorize.length; i += batchSize) {
         const batch = entriesToCategorize.slice(i, i + batchSize);

         const prompt = `
        Categorize the following time entries into one of these categories:
        ${CATEGORIES.join(", ")}

        For each entry, provide the category and a confidence score between 0 and 1.
        Format your response as JSON with the structure:
        [{ "id": "entry_id", "category": "category_name", "confidence": 0.95 }]

        Time entries:
        ${batch
           .map(
              (entry) =>
                 `ID: ${entry.id}, Description: ${
                    entry.description || "No description"
                 }`
           )
           .join("\n")}
      `;

         try {
            const response = await openai.chat.completions.create({
               model: "gpt-4o",
               messages: [{ role: "user", content: prompt }],
               temperature: 0.3,
               response_format: { type: "json_object" },
            });

            const content = response.choices[0].message.content;
            if (!content) continue;

            const result = JSON.parse(content);

            if (Array.isArray(result.categorizations)) {
               const categorizationsToInsert = result.categorizations.map(
                  (cat: Category) => ({
                     entryId: cat.id,
                     category: cat.category,
                     aiConfidence: cat.confidence,
                     createdAt: new Date(),
                  })
               );

               if (categorizationsToInsert.length > 0) {
                  await categorizations.insertMany(categorizationsToInsert);
               }

               // Update the categorization map
               result.categorizations.forEach((cat: Category) => {
                  categorizationMap.set(cat.id, {
                     category: cat.category,
                     aiConfidence: cat.confidence,
                  });
               });
            }
         } catch (error) {
            console.error("Error categorizing time entries:", error);
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
      const categorization = categorizationMap.get(entry.id) || {
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
