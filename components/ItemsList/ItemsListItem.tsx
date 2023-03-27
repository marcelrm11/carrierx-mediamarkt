import { NavigationProp, ParamListBase } from "@react-navigation/native";
import * as React from "react";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import { Item, Parcel } from "../../types";
import { pastOrFuture, totalItems } from "../../utils";
import { ListBox } from "../ListBox";
import Icon from "react-native-vector-icons/Ionicons";

type ItemsListItemProps = {
  // date: DateConstructor | string;
  navigation: NavigationProp<ParamListBase>;
  item: Item;
};

export function ItemsListItem({ navigation, item }: ItemsListItemProps) {
  const [icon, setIcon] = React.useState<string>("");
  React.useEffect(() => {
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
  }, []);
  const [weight, setWeight] = React.useState<string>("");
  React.useEffect(() => {
    let weigthString = "";
    if (item.weigth >= 1000) {
      weigthString = (item.weigth / 1000).toFixed(1) + "kg";
    } else {
      weigthString = `${item.weigth}g`;
    }
    setWeight(weigthString);
  });

  return (
    <ListBox>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={20} style={styles.icon} />
      </View>
      <View style={styles.info}>
        <Text
          style={styles.itemBoxTitle}
        >{`${item.id.$oid.toUpperCase()}`}</Text>
        <Text style={styles.itemBoxText}>{weight}</Text>
      </View>
    </ListBox>
  );
}

const styles = StyleSheet.create({
  itemBoxTitle: {
    fontSize: 16,
  },
  itemBoxText: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    color: "red",
    fontWeight: "500",
  },
  icon: {
    color: "red",
  },
  iconContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(223, 0, 0, 0.1)",
  },
  info: {
    flexGrow: 1,
  },
});
