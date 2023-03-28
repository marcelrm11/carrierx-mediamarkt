import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Parcel } from "../../types";
import { groupBy } from "../../utils";
import Icon from "react-native-vector-icons/AntDesign";
import { ParcelListItem } from "./ParcelListItem";
import { AddParcelModal } from "./AddParcelModal";
import { useParcels } from "../../hooks/useParcels";
import { CustomButton } from "../UI Components/CustomButton";
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

  // console.log("parcels by date:", parcelsByDate);

  const handleAddParcel = () => {
    setModalVisible(false);
  };

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

      <AddParcelModal
        isVisible={modalVisible}
        toggle={setModalVisible}
        onPress={handleAddParcel}
      />

      <CustomButton
        style={styles.roundButton}
        onPress={() => setModalVisible(true)}
        buttonText={<Icon name="plus" size={20} />}
      />
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
  roundButton: {
    width: 50,
    borderRadius: 25,
  },
});
