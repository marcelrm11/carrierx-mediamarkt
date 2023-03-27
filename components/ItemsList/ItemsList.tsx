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
import Ionicon from "react-native-vector-icons/Ionicons";
import { CentralModal } from "../CentralModal";

let flag = true; //todo: implement flag behavior
const Icon = () => {
  return (
    <Ionicon
      name={flag ? "checkmark-circle-outline" : "alert-circle-outline"}
      size={20}
      style={styles.icon}
    />
  );
};

interface ItemsListProps {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<RootStackParamList, "ItemsList">;
}
// todo: take carrier ID for the header
export const ItemsList: React.FC<ItemsListProps> = ({ navigation, route }) => {
  const { parcel } = route.params;
  const [items, setItems] = React.useState<Item[]>([]);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [centralModal, setCentralModal] = React.useState<boolean>(true);

  React.useEffect(() => {
    const parcelItems = storeItems.filter((item) =>
      parcel.items.map((i) => i.$oid).includes(item.id.$oid)
    );
    console.log(parcelItems);
    setItems(parcelItems);
  }, []);

  // todo: step state variable for the modals flow
  return (
    <View style={styles.container}>
      {/* <SvgUri
        style={styles.image}
        uri={require("../../assets/smartphone-fail.png")}
      /> */}
      <ScrollView>
        {items.map((item: Item) => {
          return <ItemsListItem item={item} key={item.id.$oid} />;
        })}
      </ScrollView>

      <DeliveryModal isVisible={modalVisible} toggle={setModalVisible} />
      <CentralModal
        isVisible={centralModal}
        toggle={setCentralModal}
        onPress={() => console.log("onPress")}
        icon={<Icon />}
        // icon={<></>}
        message="message"
        buttonText="buttonText"
      />

      <CustomButton
        onPress={() => setModalVisible(true)}
        buttonText="DELIVERY"
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
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  icon: {
    color: "red",
  },
});
