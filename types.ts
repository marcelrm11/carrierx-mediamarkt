type RootStackParamList = {
  ParcelList: {};
  CarrierList: { date: DateConstructor | string };
  ItemsList: { parcel: Parcel };
};

type Id = {
  $oid: string;
};

interface Item {
  id: Id;
  type: string;
  model: string;
  price: number;
  weigth: number; // typo in json data
}

interface Parcel {
  id: Id;
  deliveryAdress: string; // typo in json data
  deliveryDate: string;
  pickupAdress: string; // typo in json data
  pickupDate: string;
  itemsCount: number;
  items: Array<Id>;
  carrier?: string;
}

interface Driver {
  id: Id;
  companyName: string;
  driver: string;
  licensePlate: string;
  centerAdress: string; // typo in json data
}

export type { RootStackParamList, Id, Parcel, Driver, Item };
