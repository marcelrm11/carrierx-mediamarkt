import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

interface MyComponentProps {
  navigation: NavigationProp<ParamListBase>;
}

export const CarrierParcel: React.FC<MyComponentProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>--id-- Parcel List</Text>
      <Text>Carrier Parcel Items</Text>
      <Text>DriverInfo Modal</Text>
      <Text>SignatureCanvas Modal</Text>
      <Text>Success Modal</Text>
      <Text>Fail Modal</Text>
      <View>
        <Button
          title="Go home"
          onPress={() => navigation.navigate("ParcelList")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
