import { useState, useEffect } from "react";
import { Item } from "../types";

/**

useIcon is a custom hook that takes an object of type Item and returns an array of two values, the icon and weight of the item.
@param {Item} item - The item to get the icon and weight for.
@returns {Array<string>} An array of two string values, the icon and weight of the item.
@example
const item = { type: 'smartwatch', weight: 120 };
const [icon, weight] = useIcon(item);
console.log(icon); // 'watch-outline'
console.log(weight); // '120g'
*/
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
