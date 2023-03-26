type Item = {
  $oid: string;
};

interface Parcel {
  id: Item;
  deliveryAdress: string;
  deliveryDate: string;
  pickupAdress: string;
  pickupDate: string;
  itemsCount: number;
  items: Array<Item>;
  carrier?: string;
}

type RootStackParamList = {
  ParcelList: { parcel: Parcel };
  ParcelListByCarrier: {
    date: DateConstructor | string;
    parcels: Parcel[];
  };
  CarrierParcel: { parcel: Parcel };
};

export type { Item, Parcel, RootStackParamList };
