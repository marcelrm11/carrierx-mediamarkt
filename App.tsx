import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import { ParcelList } from "./components/ParcelList";
import { ParcelListByCarrier } from "./components/ParcelListByCarrier";
import { CarrierParcel } from "./components/CarrierParcel";
import { RootStackParamList } from "./types";
import { initParcels } from "./storage/ParcelStorage";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  React.useEffect(() => {
    console.log("app initializing parcels");
    initParcels();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ParcelList">
        <Stack.Screen
          name="ParcelList"
          component={ParcelList}
          options={{ title: "Parcel Lists" }}
        />
        <Stack.Screen
          name="ParcelListByCarrier"
          component={ParcelListByCarrier}
          options={{ title: "Parcel List --day--" }}
        />
        <Stack.Screen
          name="CarrierParcel"
          component={CarrierParcel}
          options={{ title: "--id-- Parcel List" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//  <StatusBar style="auto" />

//  style={styles.container}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // fontFamily: // see 'Using Fonts' in the project documentation
  },
});
