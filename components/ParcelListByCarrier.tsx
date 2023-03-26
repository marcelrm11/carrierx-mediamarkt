import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { Parcel } from "../types";
import { groupBy, totalItems } from "../utils";

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

  const parcelsByCarrier: { [key: string]: Parcel[] } = groupBy(
    parcels,
    "carrier"
  );

  console.log(parcelsByCarrier);

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
