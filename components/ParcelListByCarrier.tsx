import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { Parcel } from "../types";

interface ParcelListByCarrierProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase, "ParcelListByCarrier"> & {
    params: {
      date: DateConstructor | string;
      parcels: Parcel[];
    };
  };
}

export const ParcelListByCarrier: React.FC<ParcelListByCarrierProps> = ({
  navigation,
  route,
}) => {
  const { date, parcels } = route.params;
  console.log(parcels);
  const parcelsByCarrier: { [key: string]: Parcel[] } = {};

  parcels.forEach((parcel) => {
    const carrier = parcel.carrier || "not assigned";
    if (!parcelsByCarrier[carrier]) {
      parcelsByCarrier[carrier] = [parcel];
    } else {
      parcelsByCarrier[carrier].push(parcel);
    }
  });

  console.log(parcelsByCarrier);

  function totalItems(parcels: Parcel[]): number {
    return parcels.reduce((a, b) => a + b.itemsCount, 0);
  }

  return (
    <View style={styles.container}>
      <>
        <Text>{`Parcel List ${date}`}</Text>
        {Object.entries(parcelsByCarrier).map(([carrier, carrierParcels]) => {
          return (
            <React.Fragment key={carrier}>
              <Text>{carrier}</Text>
              <Text>{`${carrierParcels.length} parcels`}</Text>
              <Text>{`${totalItems(carrierParcels)} items`}</Text>
            </React.Fragment>
          );
        })}
        <View>
          <Button
            title="Go to next screen"
            onPress={() => navigation.navigate("CarrierParcel")}
          />
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
