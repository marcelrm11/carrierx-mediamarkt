import * as React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Parcel } from "../types";
import { groupBy } from "../utils";
import { getParcels } from "../storage/ParcelStorage";
import Icon from "react-native-vector-icons/AntDesign";
import { Modal } from "react-native";

interface ParcelListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const ParcelList: React.FC<ParcelListProps> = ({ navigation }) => {
  const [parcels, setParcels] = React.useState<Parcel[]>([]);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchParcels = async () => {
      try {
        const storedParcels = await getParcels();
        setParcels(storedParcels);
      } catch (error) {
        console.log(error);
      }
    };

    fetchParcels();
  }, []);

  const parcelsByDate: { [key: string]: Parcel[] } = groupBy(
    parcels,
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
      {modalVisible && <View style={styles.overlay}></View>}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Parcel ID</Text>
            <Text>Carrier ID</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={20} style={styles.buttonIcon} />
      </TouchableHighlight>
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
  buttonContainer: {
    backgroundColor: "red",
    margin: "auto",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1, // Make sure the overlay is behind the modal
  },
});
