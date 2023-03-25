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
  ParcelList: undefined;
  ParcelListByCarrier: { parcel: Parcel };
  CarrierParcel: undefined;
};

export type { Item, Parcel, RootStackParamList };
