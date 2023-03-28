import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ParcelList } from "./components/ParcelList/ParcelList";
import { CarrierList } from "./components/CarrierList/CarrierList";
import { ItemsList } from "./components/ItemsList/ItemsList";
import { RootStackParamList } from "./types";
import { initParcels } from "./storage/ParcelStorage";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  React.useEffect(() => {
    console.log("App initializing parcels from parcels.json");
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
          name="CarrierList"
          component={CarrierList}
          options={({ route }) => ({
            title: `Parcel List ${route.params.date}`,
          })}
        />
        <Stack.Screen
          name="ItemsList"
          component={ItemsList}
          options={({ route }) => ({
            title: `${route.params.parcel.carrier?.toUpperCase()} Parcel List`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
