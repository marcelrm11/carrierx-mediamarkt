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
