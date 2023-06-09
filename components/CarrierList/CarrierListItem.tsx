import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Parcel } from "../../types";
import { ListBox } from "../UI Components/ListBox";
import Icon from "react-native-vector-icons/FontAwesome5";

type CarrierListItemProps = {
  navigation: NavigationProp<ParamListBase>;
  parcel: Parcel;
};

export function CarrierListItem({ navigation, parcel }: CarrierListItemProps) {
  return (
    <ListBox
      onPress={() => navigation.navigate("ItemsList", { parcel: parcel })}
    >
      <View style={styles.iconContainer}>
        <Icon name="truck" size={20} style={styles.icon} />
      </View>

      <View>
        <Text
          style={styles.itemBoxTitle}
        >{`${parcel.id.$oid.toUpperCase()} Parcel List`}</Text>
        <Text style={styles.itemBoxText}>
          {parcel.carrier || "no carrier assigned yet"}
        </Text>
        <Text
          style={styles.itemBoxText}
        >{`${parcel.itemsCount} items to be picked up`}</Text>
      </View>

      <View>
        <Text style={styles.dateText}>DELIVERY</Text>
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
});
