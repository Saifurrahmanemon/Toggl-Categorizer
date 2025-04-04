"use client";

import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { updateTimeEntryCategory } from "@/lib/actions";
import type { CategorizedTimeEntry } from "@/lib/types";
import { Edit2 } from "lucide-react";
import { useState } from "react";

interface EditCategoryDialogProps {
   entry: CategorizedTimeEntry;
}

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

export function EditCategoryDialog({ entry }: EditCategoryDialogProps) {
   const [open, setOpen] = useState(false);
   const [selectedCategory, setSelectedCategory] = useState(entry.category);
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSave = async () => {
      if (selectedCategory === entry.category) {
         setOpen(false);
         return;
      }

      setIsSubmitting(true);

      try {
         await updateTimeEntryCategory({
            entryId: entry.id,
            category: selectedCategory,
            previousCategory: entry.category,
         });

         // Update the entry in the UI
         entry.category = selectedCategory;
         setOpen(false);
      } catch (error) {
         console.error("Failed to update category:", error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
               <Edit2 className="h-4 w-4" />
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-md">
            <DialogHeader>
               <DialogTitle>Edit Category</DialogTitle>
               <DialogDescription>
                  Change the category for this time entry.
               </DialogDescription>
            </DialogHeader>

            <div className="py-4">
               <div className="mb-4">
                  <h3 className="font-medium">
                     {entry.description || "No description"}
                  </h3>
               </div>

               <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                     Category
                  </label>
                  <Select
                     value={selectedCategory}
                     onValueChange={setSelectedCategory}
                  >
                     <SelectTrigger id="category" className="w-full">
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
               </div>
            </div>

            <DialogFooter>
               <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
               </Button>
               <Button
                  onClick={handleSave}
                  disabled={isSubmitting || selectedCategory === entry.category}
                  className="bg-toggl-red hover:bg-toggl-darkRed"
               >
                  {isSubmitting ? "Saving..." : "Save Changes"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
