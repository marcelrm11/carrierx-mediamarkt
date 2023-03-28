import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Item } from "../../types";
import { ListBox } from "../UI Components/ListBox";
import Icon from "react-native-vector-icons/Ionicons";
import { useIcon } from "../../hooks/useIcon";

type ItemsListItemProps = {
  item: Item;
};

export function ItemsListItem({ item }: ItemsListItemProps) {
  const [icon, weight] = useIcon(item);

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
    color: "rgba(58, 53, 65, 0.87)",
  },
  itemBoxText: {
    fontSize: 12,
    color: "rgba(58, 53, 65, 0.87)",
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
