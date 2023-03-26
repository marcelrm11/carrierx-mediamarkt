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
import { TextInput } from "react-native";

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

  console.log("parcels by date:", parcelsByDate);

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
      ...
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
            <Text style={styles.modalTitle}>
              Parcel and carrier information
            </Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>ID</Text>
              <TextInput
                style={styles.input}
                placeholder={"641DB7B2FC13".toUpperCase()}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Carrier ID</Text>
              <TextInput
                style={styles.input}
                placeholder={"HET32R0G0U78".toUpperCase()}
              />
            </View>

            <TextInput style={styles.input} />
            <TouchableHighlight
              style={[styles.buttonContainer, styles.modalButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>ADD</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={20} style={styles.buttonText} />
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
    padding: 15,
    paddingVertical: 0,
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
    marginVertical: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    letterSpacing: 1,
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  label: {
    position: "absolute",
    left: 10,
    top: -10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: 12,
    color: "gray",
  },
  input: {
    padding: 10,
    fontSize: 16,
  },
  modalButton: {
    borderRadius: 5,
    width: "100%",
    // marginBottom: 0,
  },
});
