import { useState, useEffect } from "react";
import { Item } from "../types";

export function useIcon(item: Item) {
  const [icon, setIcon] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  useEffect(() => {
    switch (item.type.toLowerCase()) {
      case "smartwatch":
        setIcon("watch-outline");
        break;
      case "phone":
        setIcon("phone-portrait-outline");
        break;
      case "television":
        setIcon("tv-outline");
        break;
      case "pc":
        setIcon("laptop-outline");
        break;

      default:
        setIcon("gift-outline");
        break;
    }
    let weigthString = "";
    if (item.weigth >= 1000) {
      weigthString = (item.weigth / 1000).toFixed(1) + "kg";
    } else {
      weigthString = `${item.weigth}g`;
    }
    setWeight(weigthString);
  }, []);

  return [icon, weight];
}
