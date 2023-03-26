import { useState, useEffect } from "react";
import { getParcels } from "../storage/ParcelStorage";
import { Parcel } from "../types";

export function useParcels() {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        setLoading(true);
        const storedParcels = await getParcels();
        setParcels(storedParcels);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        console.log(error);
        setLoading(false);
      }
    };

    fetchParcels();
  }, []);

  return [parcels, loading, error];
}
