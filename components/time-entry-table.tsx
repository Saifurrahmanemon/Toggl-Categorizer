"use client";

import { EditCategoryDialog } from "@/components/edit-category-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import type { CategorizedTimeEntry } from "@/lib/types";
import { format } from "date-fns";
import {
   ChevronLeft,
   ChevronRight,
   ChevronsLeft,
   ChevronsRight,
   Search,
} from "lucide-react";
import { useMemo, useState } from "react";

interface TimeEntryTableProps {
   entries: CategorizedTimeEntry[];
}

const CATEGORIES = [
   "All Categories",
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

export function TimeEntryTable({ entries }: TimeEntryTableProps) {
   const [currentPage, setCurrentPage] = useState(1);
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("All Categories");
   const [entriesPerPage, setEntriesPerPage] = useState(10);

   const filteredEntries = useMemo(() => {
      return entries.filter((entry) => {
         const matchesSearch =
            entry.description
               ?.toLowerCase()
               .includes(searchQuery.toLowerCase()) || !searchQuery;
         const matchesCategory =
            selectedCategory === "All Categories" ||
            entry.category === selectedCategory;
         return matchesSearch && matchesCategory;
      });
   }, [entries, searchQuery, selectedCategory]);

   const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
   const startIndex = (currentPage - 1) * entriesPerPage;
   const endIndex = startIndex + entriesPerPage;
   const currentEntries = filteredEntries.slice(startIndex, endIndex);

   const goToPage = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, totalPages)));
   };

   const formatDuration = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${minutes}m`;
   };

   return (
      <div>
         <div className="p-4 border-b flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-1">
               <label htmlFor="search" className="text-sm font-medium">
                  Search
               </label>
               <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                  <Input
                     id="search"
                     placeholder="Search by description..."
                     className="pl-8"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
            </div>

            <div className="w-full md:w-48 space-y-1">
               <label htmlFor="category-filter" className="text-sm font-medium">
                  Category
               </label>
               <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
               >
                  <SelectTrigger id="category-filter" className="w-full">
                     <SelectValue placeholder="Filter by category" />
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

            <div className="w-full md:w-32 space-y-1">
               <label
                  htmlFor="entries-per-page"
                  className="text-sm font-medium"
               >
                  Per Page
               </label>
               <Select
                  value={entriesPerPage.toString()}
                  onValueChange={(value) =>
                     setEntriesPerPage(Number.parseInt(value))
                  }
               >
                  <SelectTrigger id="entries-per-page">
                     <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                     {[10, 25, 50, 100].map((value) => (
                        <SelectItem key={value} value={value.toString()}>
                           {value}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>
         </div>

         <div className="overflow-x-auto">
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Description</TableHead>
                     <TableHead>Start Time</TableHead>
                     <TableHead>Duration</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {currentEntries.length === 0 ? (
                     <TableRow>
                        <TableCell
                           colSpan={5}
                           className="text-center py-8 text-gray-500"
                        >
                           No time entries found
                        </TableCell>
                     </TableRow>
                  ) : (
                     currentEntries.map((entry) => (
                        <TableRow key={entry.id}>
                           <TableCell className="font-medium">
                              {entry.description || "No description"}
                           </TableCell>
                           <TableCell>
                              {format(
                                 new Date(entry.start),
                                 "MMM d, yyyy h:mm a"
                              )}
                           </TableCell>
                           <TableCell>
                              {formatDuration(entry.duration)}
                           </TableCell>
                           <TableCell>
                              <Badge variant="outline" className="bg-gray-100">
                                 {entry.category}
                              </Badge>
                              {typeof entry?.aiConfidence === "number" &&
                                 entry.aiConfidence < 0.7 && (
                                    <Badge
                                       variant="outline"
                                       className="ml-2 bg-yellow-50 text-yellow-800 border-yellow-200"
                                    >
                                       Low confidence (
                                       {Math.round(entry.aiConfidence * 100)}%)
                                    </Badge>
                                 )}
                           </TableCell>
                           <TableCell className="text-right">
                              <EditCategoryDialog entry={entry} />
                           </TableCell>
                        </TableRow>
                     ))
                  )}
               </TableBody>
            </Table>
         </div>

         {/* Pagination */}
         <div className="p-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">
               Showing {startIndex + 1} to{" "}
               {Math.min(endIndex, filteredEntries.length)} of{" "}
               {filteredEntries.length} entries
            </div>
            <div className="flex items-center space-x-2">
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
               >
                  <ChevronsLeft className="h-4 w-4" />
               </Button>
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
               >
                  <ChevronLeft className="h-4 w-4" />
               </Button>

               <span className="text-sm">
                  Page {currentPage} of {totalPages || 1}
               </span>

               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
               >
                  <ChevronRight className="h-4 w-4" />
               </Button>
               <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages || totalPages === 0}
               >
                  <ChevronsRight className="h-4 w-4" />
               </Button>
            </div>
         </div>
      </div>
   );
}
