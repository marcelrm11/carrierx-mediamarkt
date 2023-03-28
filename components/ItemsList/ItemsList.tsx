import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { Item, RootStackParamList } from "../../types";
import storeItems from "../../data/items.json";
import { ItemsListItem } from "./ItemsListItem";
import { CustomButton } from "../CustomButton";
import { DeliveryModal } from "./DeliveryModal";
import { SuccessModal } from "./SuccessModal";

interface ItemsListProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<RootStackParamList, "ItemsList">;
}
// todo: take carrier ID for the header
export const ItemsList: React.FC<ItemsListProps> = ({ navigation, route }) => {
  const { parcel } = route.params;
  const [items, setItems] = React.useState<Item[]>([]);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [successVisible, setSuccessVisible] = React.useState<boolean>(true);
  const [step, setStep] = React.useState<number>(0);
  const [success, setSuccess] = React.useState<boolean>(false);

  //todo: implement success flag state behavior

  React.useEffect(() => {
    const parcelItems = storeItems.filter((item) =>
      parcel.items.map((i) => i.$oid).includes(item.id.$oid)
    );
    console.log(parcelItems);
    setItems(parcelItems);
  }, []);

  // todo: step state variable for the modals flow
  const handleDeliveryPress = () => {
    setStep(1);
    setModalVisible(true);
  };
  const handleDriversPress = () => {
    setStep(2);
    setModalVisible(false);
    setSuccessVisible(true);
    setSuccess(Math.random() < 0.5);
  };
  const handleSuccessPress = () => {
    if (success) {
      navigation.navigate("ParcelList");
    } else {
      setStep(0);
      setModalVisible(false);
    }

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {items.map((item: Item) => {
          return <ItemsListItem item={item} key={item.id.$oid} />;
        })}
      </ScrollView>

      {step === 1 && (
        <DeliveryModal
          isVisible={modalVisible}
          toggle={setModalVisible}
          onPress={handleDriversPress}
        />
      )}
      {step === 2 && (
        <SuccessModal
          isVisible={successVisible}
          toggle={setSuccessVisible}
          onPress={handleSuccessPress}
          success={success}
        />
      )}

      <CustomButton onPress={handleDeliveryPress} buttonText="DELIVERY" />
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
