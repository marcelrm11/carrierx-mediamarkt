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
}

export type { Item, Parcel };
