import * as React from "react";
import { Button, Text, View, StyleSheet, ScrollView } from "react-native";
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

  console.log(parcelsByDate);

  return (
    <View style={styles.container}>
      <Text>Parcel Lists</Text>
      <ScrollView>
        {Object.entries(parcelsByDate).map(([deliveryDate, dateParcels]) => {
          return (
            <ParcelListItem
              date={deliveryDate}
              parcels={dateParcels}
              key={deliveryDate}
              navigation={navigation}
            />
          );
        })}
      </ScrollView>
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
    <View style={styles.container}>
      <Text>
        {`Parcel List ${date}`}
        <Button
          title="Parcel details"
          onPress={() =>
            navigation.navigate("ParcelListByCarrier", {
              date: date,
              parcels: parcels,
            })
          }
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
