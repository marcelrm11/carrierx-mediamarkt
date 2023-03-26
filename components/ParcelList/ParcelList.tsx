import * as React from "react";
import { View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Parcel } from "../../types";
import { groupBy } from "../../utils";
import Icon from "react-native-vector-icons/AntDesign";
import { ParcelListItem } from "./ParcelListItem";
import { AddParcelModal } from "./AddParcelModal";
import { useParcels } from "../../hooks/useParcels";
interface ParcelListProps {
  navigation: NavigationProp<ParamListBase>;
}

export const ParcelList: React.FC<ParcelListProps> = ({ navigation }) => {
  const [parcels, loading, error] = useParcels();
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const parcelsByDate: { [key: string]: Parcel[] } = groupBy(
    parcels,
    "deliveryDate"
  );

  console.log("parcels by date:", parcelsByDate);

  return (
    <View style={styles.container}>
      <ScrollView>
        {Object.entries(parcelsByDate)
          .reverse()
          .map(([deliveryDate, dateParcels]) => {
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
      <AddParcelModal isVisible={modalVisible} toggle={setModalVisible} />
      <TouchableHighlight
        style={styles.buttonContainer}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="plus" size={20} style={styles.buttonText} />
      </TouchableHighlight>
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
});
