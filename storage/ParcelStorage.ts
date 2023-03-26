import AsyncStorage from "@react-native-async-storage/async-storage";
import { Parcel } from "../types";
import parcels from "../data/parcels.json";

// Key used to store parcels in Async Storage
const PARCEL_STORAGE_KEY = "PARCEL_STORAGE_KEY";

export const initParcels = async () => {
  console.log("getting parcels from storage");
  try {
    const existingParcels = await getParcels();
    if (existingParcels.length === 0) {
      await AsyncStorage.setItem(PARCEL_STORAGE_KEY, JSON.stringify(parcels));
    }
  } catch (error) {
    console.log("Error initializing parcels:", error);
  }
};

export const storeParcel = async (parcel: Parcel) => {
  try {
    const existingParcels = await getParcels();
    const updatedParcels = [...existingParcels, parcel];
    await AsyncStorage.setItem(
      PARCEL_STORAGE_KEY,
      JSON.stringify(updatedParcels)
    );
  } catch (error) {
    console.log("Error storing parcel:", error);
  }
};

export const getParcels = async (): Promise<Parcel[]> => {
  try {
    const parcelsString = await AsyncStorage.getItem(PARCEL_STORAGE_KEY);
    if (parcelsString) {
      return JSON.parse(parcelsString);
    }
  } catch (error) {
    console.log("Error getting parcels:", error);
  }
  return [];
};
