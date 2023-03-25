import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from "react-native";
import { ParcelList } from "./components/ParcelList";
import { ParcelListByCarrier } from "./components/ParcelListByCarrier";
import { CarrierParcel } from "./components/CarrierParcel";

const Stack = createNativeStackNavigator();

export default function App() {
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
  },
});
