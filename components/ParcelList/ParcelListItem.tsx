import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React from "react";
import { TouchableHighlight, View, StyleSheet, Text } from "react-native";
import { Parcel } from "../../types";
import { pastOrFuture, totalItems } from "../../utils";

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
  console.log(date);
  console.log("now:", new Date().toLocaleDateString);
  return (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate("ParcelListByCarrier", {
          date: date,
          parcels: parcels,
        })
      }
    >
      <View style={styles.itemBox}>
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
          <Text style={styles.itemBoxText}>{`${totalItems(
            parcels
          )} items`}</Text>
        </View>
        <Text style={styles.dateText}>{`${date}`}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  itemBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 15,
  },
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
