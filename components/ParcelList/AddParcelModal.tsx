import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import carriers from "../../data/drivers.json";

interface AddParcelModalProps {
  isVisible: boolean;
  toggle: Function;
}

export const AddParcelModal: React.FC<AddParcelModalProps> = ({
  isVisible,
  toggle,
}) => {
  const [selectedCarrier, setSelectedCarrier] =
    React.useState<string>("not assigned");
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => toggle(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Parcel and carrier information</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>ID</Text>
            <TextInput
              style={styles.input}
              placeholder={"641DB7B2FC13".toUpperCase()}
              placeholderTextColor="grey"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Carrier ID</Text>
            <Picker
              style={styles.input}
              selectedValue={selectedCarrier}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCarrier(itemValue)
              }
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
          </View>

          <TextInput style={styles.input} />
          <TouchableHighlight
            style={[styles.buttonContainer, styles.modalButton]}
            onPress={() => toggle(false)}
          >
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
    zIndex: 100,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 40,
    fontSize: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  label: {
    position: "absolute",
    left: 10,
    top: -10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    fontSize: 12,
    color: "gray",
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderWidth: 0,
  },
  modalButton: {
    borderRadius: 5,
    width: "100%",
    // marginBottom: 0,
  },
});
