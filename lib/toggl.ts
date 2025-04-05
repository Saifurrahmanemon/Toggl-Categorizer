import { authOptions } from "@/lib/auth";
import type { TimeEntry } from "@/lib/types";
import { getServerSession } from "next-auth";
import { TOGGL_BASE_URL } from "./constant";

export async function getTimeEntries(): Promise<TimeEntry[]> {
   const session = await getServerSession(authOptions);

   if (!session || !session.accessToken) {
      throw new Error("Not authenticated");
   }

   const startDate = new Date();
   startDate.setDate(startDate.getDate() - 7);

   const startDateString = startDate.toISOString();
   const endDateString = new Date().toISOString();

   const auth = btoa(`${session.api_token}:api_token`);

   try {
      const response = await fetch(
         `${TOGGL_BASE_URL}/me/time_entries?start_date=${startDateString}&end_date=${endDateString}`,
         {
            headers: {
               Authorization: `Basic ${auth}`,
               "Content-Type": "application/json",
            },
            cache: "no-store",
         }
      );

      if (!response.ok) {
         throw new Error(`Failed to fetch time entries: ${response.status}`);
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Error fetching time entries:", error);
      return [];
   }
}
