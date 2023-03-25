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
      parcel: Parcel;
    };
  };
}

export const ParcelListByCarrier: React.FC<ParcelListByCarrierProps> = ({
  navigation,
  route,
}) => {
  const { parcel } = route.params;
  return (
    <View style={styles.container}>
      <Text>Parcel List --date--</Text>
      <Text>Parcel List by Carrier</Text>
      <View>
        <Button
          title="Go to next screen"
          onPress={() => navigation.navigate("CarrierParcel")}
        />
      </View>
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
