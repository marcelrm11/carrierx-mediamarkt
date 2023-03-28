import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlightProps,
} from "react-native";
import { CustomInput } from "../CustomInput";
import { ModalBox } from "../ModalBox";

interface DeliveryModalProps {
  isVisible: boolean;
  toggle: Function;
  onPress: Function;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({
  isVisible,
  toggle,
  onPress,
}) => {
  const [driversName, setDriversName] = React.useState<string>("");
  const [licensePlate, setLicensePlate] = React.useState<string>("");

  return (
    <ModalBox
      isVisible={isVisible}
      toggle={toggle}
      onPress={(...args) => onPress && onPress(...args)}
      buttonText="NEXT"
      title="Delivery information"
    >
      <CustomInput label="Driver's name">
        <TextInput
          style={styles.input}
          placeholder={"Manfred Steger"}
          placeholderTextColor="grey"
          onChangeText={setDriversName}
          value={driversName}
        />
      </CustomInput>

      <CustomInput label="License plate">
        <TextInput
          style={styles.input}
          placeholder={"3859FYK"}
          placeholderTextColor="grey"
          onChangeText={setLicensePlate}
          value={licensePlate}
        />
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
