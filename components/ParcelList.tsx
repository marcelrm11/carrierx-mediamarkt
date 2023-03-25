import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import data from "../data/parcels.json";
import { Item, Parcel } from "../types";

interface ParcelListProps {
  navigation: NavigationProp<ParamListBase>;
  // other props...
}

export const ParcelList: React.FC<ParcelListProps> = ({ navigation }) => {
  const [parcelList, setParcelList] = React.useState<Parcel[]>([]);

  React.useEffect(() => {
    // let tempParcelList = [];
    const fetchParcelList = async () => {
      try {
        setParcelList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchParcelList();
  }, []);

  const parcelsByDate: { [key: string]: Parcel[] } = {};

  parcelList.forEach((parcel) => {
    const deliveryDate = new Date(parcel.deliveryDate).toLocaleDateString();
    if (!parcelsByDate[deliveryDate]) {
      parcelsByDate[deliveryDate] = [parcel];
    } else {
      parcelsByDate[deliveryDate].push(parcel);
    }
  });

  return (
    <View style={styles.container}>
      <Text>Parcel Lists</Text>
      <View>
        {parcelList.map((parcel) => {
          return (
            <ParcelListItem
              parcel={parcel}
              key={parcel.id.$oid}
              navigation={navigation}
            />
          );
        })}
      </View>
      <Text>Parcel Modal</Text>
      <View>
        <Button
          title="Go to next screen"
          // onPress={() => addParcel()}
        />
      </View>
    </View>
  );
};

type ParcelListItemProps = {
  parcel: Parcel;
  navigation: NavigationProp<ParamListBase>;
};

function ParcelListItem({ parcel, navigation }: ParcelListItemProps) {
  return (
    <View style={styles.container}>
      <Text>
        Parcel List Item {parcel.id.$oid}
        <Button
          title="Parcel details"
          onPress={() => navigation.navigate("ParcelListByCarrier", parcel)}
        />
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid blue",
  },
});
