type RootStackParamList = {
  ParcelList: { parcel: Parcel };
  ParcelListByCarrier: {
    date: DateConstructor | string;
    parcels: Parcel[];
  };
  CarrierParcel: { parcel: Parcel };
};

type Id = {
  $oid: string;
};

interface Parcel {
  id: Id;
  deliveryAdress: string;
  deliveryDate: string;
  pickupAdress: string;
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
  centerAdress: string;
}

export type { RootStackParamList, Id, Parcel, Driver };
