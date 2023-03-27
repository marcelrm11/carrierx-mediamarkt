import { Picker } from "@react-native-picker/picker";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import carriers from "../../data/drivers.json";
import { CustomInput } from "../CustomInput";
import { ModalBox } from "../ModalBox";

interface AddParcelModalProps {
  isVisible: boolean;
  toggle: Function;
}

export const AddParcelModal: React.FC<AddParcelModalProps> = ({
  isVisible,
  toggle,
}) => {
  const [parcelId, setParcelId] = React.useState<string>("");
  const [selectedCarrier, setSelectedCarrier] =
    React.useState<string>("not assigned");

  return (
    <ModalBox
      isVisible={isVisible}
      toggle={toggle}
      onPress={() => console.log("store parcel")}
      buttonText="ADD"
      title="Parcel and carrier information"
    >
      <CustomInput label="ID">
        <TextInput
          style={styles.input}
          placeholder={"641DB7B2FC13".toUpperCase()}
          placeholderTextColor="grey"
          onChangeText={setParcelId}
          value={parcelId}
        />
      </CustomInput>

      <CustomInput label="Carrier ID">
        <Picker
          style={styles.input}
          selectedValue={selectedCarrier}
          onValueChange={(itemValue) => setSelectedCarrier(itemValue)}
        >
          {carriers.map((carrier) => {
            return (
              <Picker.Item
                label={carrier.id.$oid.toUpperCase()}
                value={carrier.id.$oid}
                key={carrier.id.$oid}
              />
            );
          })}
        </Picker>
      </CustomInput>
    </ModalBox>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontSize: 16,
    borderWidth: 0,
  },
});
