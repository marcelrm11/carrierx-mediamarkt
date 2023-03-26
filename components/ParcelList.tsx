import * as React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableHighlight,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import data from "../data/parcels.json";
import { Item, Parcel } from "../types";
import { groupBy } from "../utils";

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

  const parcelsByDate: { [key: string]: Parcel[] } = groupBy(
    parcelList,
    "deliveryDate"
  );

  console.log(parcelsByDate);

  return (
    <View style={styles.container}>
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
          <Text>{`Parcel List ${date}`}</Text>
          <Text
            style={styles.itemBoxText}
          >{`X carriers picked/will up ... pickupdate`}</Text>
          <Text style={styles.itemBoxText}>{`total items`}</Text>
        </View>
        <Text style={styles.dateText}>{`${date}`}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    padding: 10,
  },
  itemBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 10,
  },
  itemBoxText: {
    fontSize: 10,
  },
  dateText: {
    fontSize: 10,
    color: "red",
    fontWeight: "500",
  },
});
