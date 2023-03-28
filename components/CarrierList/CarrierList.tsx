import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { Parcel, RootStackParamList } from "../../types";
import { useParcels } from "../../hooks/useParcels";
import { CarrierListItem } from "./CarrierListItem";
import { totalItems } from "../../utils";

interface CarrierListProps {
  navigation: NavigationProp<RootStackParamList, "CarrierList">;
  route: RouteProp<RootStackParamList, "CarrierList">;
}

export const CarrierList: React.FC<CarrierListProps> = ({
  navigation,
  route,
}) => {
  const { date } = route.params;

  const [parcels, loading, error] = useParcels();

  const dateParcels = parcels.filter(
    (parcel: Parcel) => parcel.deliveryDate === date
  );

  console.log(`parcels for ${date}:`, dateParcels);

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>{`${totalItems(
        dateParcels
      )} items to be picked up`}</Text>
      <ScrollView>
        {dateParcels.map((parcel: Parcel) => {
          return (
            <CarrierListItem
              navigation={navigation}
              parcel={parcel}
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
  topText: {
    fontSize: 12,
    marginTop: 10,
    marginLeft: 5,
    // color: "rgba(58, 53, 65, 0.87)",
  },
});
