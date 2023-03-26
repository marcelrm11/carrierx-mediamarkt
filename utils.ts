import { Parcel } from "./types";

/**
 * Calculates the total number of items across all parcels.
 * @param parcels An array of Parcel objects
 * @returns The total number of items across all parcels
 */
export function totalItems(parcels: Parcel[]): number {
  return parcels.reduce((a, b) => a + b.itemsCount, 0);
}

/**
 * Groups an array of objects by a specified key.
 * @param arr An array of objects to group
 * @param group The key to group by
 * @returns An object whose keys are the unique values of the specified key, and whose values are arrays of objects that share that value
 */
export function groupBy(arr: any[], group: string): any {
  let result: { [key: string]: any[] } = {};

  arr.forEach((el) => {
    const subgroup = el[group] || "not assigned";
    if (!result[subgroup]) {
      result[subgroup] = [el];
    } else {
      result[subgroup].push(el);
    }
  });

  return result;
}

/**
 * Determines whether a given date string represents a past, present, or future date.
 *
 * @param dateString The date string to be evaluated in the format "mm/dd/yyyy".
 * @returns A string indicating whether the date is "past", "today", or "future".
 */
export function pastOrFuture(dateString: string): "past" | "today" | "future" {
  const dateParts = dateString.split("/");
  const year = parseInt(dateParts[2]);
  const month = parseInt(dateParts[0]) - 1; // Month is 0-indexed in JavaScript
  const day = parseInt(dateParts[1]);

  const dateObject = new Date(year, month, day);

  // Compare the dates
  const today = new Date();
  if (dateObject > today) {
    return "future";
  } else if (dateObject < today) {
    return "past";
  } else {
    return "today";
  }
}
