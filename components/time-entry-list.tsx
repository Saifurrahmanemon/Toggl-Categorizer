"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { updateTimeEntryCategory } from "@/lib/actions";
import type { CategorizedTimeEntry } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Edit2, Save } from "lucide-react";
import { useState } from "react";

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

export function TimeEntryList({
   entries,
}: {
   entries: CategorizedTimeEntry[];
}) {
   const [editingId, setEditingId] = useState<string | null>(null);
   const [selectedCategory, setSelectedCategory] = useState<string>("");
   const [updatingId, setUpdatingId] = useState<string | null>(null);

   const handleEdit = (entry: CategorizedTimeEntry) => {
      setEditingId(entry.id);
      setSelectedCategory(entry.category);
   };

   const handleSave = async (entry: CategorizedTimeEntry) => {
      if (!selectedCategory) return;

      setUpdatingId(entry.id);

      try {
         await updateTimeEntryCategory({
            entryId: entry.id,
            category: selectedCategory,
            previousCategory: entry.category,
         });

         entry.category = selectedCategory;
      } catch (error) {
         console.error("Failed to update category:", error);
      } finally {
         setEditingId(null);
         setUpdatingId(null);
      }
   };

   if (entries.length === 0) {
      return (
         <p className="text-gray-500 text-center py-8">
            No time entries found.
         </p>
      );
   }

   return (
      <div className="space-y-4">
         {entries.map((entry) => (
            <div
               key={entry.id}
               className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
               <div className="flex justify-between items-start">
                  <div className="space-y-1">
                     <h3 className="font-medium">
                        {entry.description || "No description"}
                     </h3>
                     <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(entry.start), {
                           addSuffix: true,
                        })}{" "}
                        • {Math.round(entry.duration / 60)} minutes
                     </p>
                  </div>
                  <div className="flex items-center space-x-2">
                     {editingId === entry.id ? (
                        <>
                           <Select
                              value={selectedCategory}
                              onValueChange={setSelectedCategory}
                           >
                              <SelectTrigger className="w-[180px]">
                                 <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                 {CATEGORIES.map((category) => (
                                    <SelectItem key={category} value={category}>
                                       {category}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSave(entry)}
                              disabled={updatingId === entry.id}
                           >
                              {updatingId === entry.id ? (
                                 <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                              ) : (
                                 <Save className="h-4 w-4" />
                              )}
                           </Button>
                        </>
                     ) : (
                        <>
                           <Badge variant="outline" className="bg-gray-100">
                              {entry.category}
                           </Badge>
                           <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(entry)}
                           >
                              <Edit2 className="h-4 w-4" />
                           </Button>
                        </>
                     )}
                  </div>
               </div>
               {entry.aiConfidence &&
                  entry.aiConfidence < 0.7 &&
                  !editingId && (
                     <div className="mt-2">
                        <Badge
                           variant="outline"
                           className="bg-yellow-50 text-yellow-800 border-yellow-200"
                        >
                           Low confidence prediction
                        </Badge>
                     </div>
                  )}
            </div>
         ))}
      </div>
   );
}
