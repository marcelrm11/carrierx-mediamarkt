import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import { Parcel } from "../../types";
import { pastOrFuture, totalItems } from "../../utils";
import { ListBox } from "../ListBox";

type ParcelListItemProps = {
  date: DateConstructor | string;
  navigation: NavigationProp<ParamListBase>;
  parcels: Parcel[];
};

export function ParcelListItem({
  date,
  navigation,
  parcels,
}: ParcelListItemProps) {
  return (
    <ListBox
      onPress={() =>
        navigation.navigate("CarrierList", {
          date: date,
          parcels: parcels,
        })
      }
    >
      <View>
        <Text style={styles.itemBoxTitle}>{`Parcel List ${date}`}</Text>
        <Text style={styles.itemBoxText}>
          {`${parcels.length} carriers` +
            (pastOrFuture(parcels[0].pickupDate) === "past"
              ? " picked "
              : " will pick ") +
            `up the parcel ` +
            (pastOrFuture(parcels[0].pickupDate) === "today"
              ? "today"
              : `on ${parcels[0].pickupDate}`)}
        </Text>
        <Text style={styles.itemBoxText}>{`${totalItems(parcels)} items`}</Text>
      </View>
      <Text style={styles.dateText}>{`${date}`}</Text>
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
});
