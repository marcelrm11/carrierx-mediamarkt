import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { Parcel, RootStackParamList } from "../../types";
import { useParcels } from "../../hooks/useParcels";
import { CarrierListItem } from "./CarrierListItem";

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
});
