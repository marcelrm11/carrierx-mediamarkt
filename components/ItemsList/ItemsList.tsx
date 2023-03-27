import * as React from "react";
import { Text, View, StyleSheet, Button, ScrollView } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { Item, RootStackParamList } from "../../types";
import storeItems from "../../data/items.json";
import { ItemsListItem } from "./ItemsListItem";

interface ItemsListProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<RootStackParamList, "ItemsList">;
}

// todo: take carrier ID for the header
export const ItemsList: React.FC<ItemsListProps> = ({ navigation, route }) => {
  const { parcel } = route.params;
  const [items, setItems] = React.useState<Item[]>([]);
  React.useEffect(() => {
    const parcelItems = storeItems.filter((item) =>
      parcel.items.map((i) => i.$oid).includes(item.id.$oid)
    );
    console.log(parcelItems);
    setItems(parcelItems);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map((item: Item) => {
          return (
            <ItemsListItem
              navigation={navigation}
              item={item}
              key={parcel.id.$oid}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 15,
    paddingVertical: 0,
  },
});
