import React, { ReactNode } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableHighlightProps,
} from "react-native";
import { CustomButton } from "../CustomButton";
import Ionicon from "react-native-vector-icons/Ionicons";

interface SuccessModalProps {
  isVisible: boolean;
  toggle: Function;
  success: boolean;
  onPress: Function;
}

const Icon = ({ success }: { success: boolean }) => {
  return (
    <Ionicon
      name={success ? "checkmark-circle-outline" : "alert-circle-outline"}
      size={140}
      style={styles.icon}
    />
  );
};

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isVisible,
  toggle,
  success,
  onPress,
}) => {
  return (
    <>
      {isVisible && <View style={styles.overlay} />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => toggle(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Icon success={success} />

            <Text style={styles.message}>
              {success
                ? "Parcel successfully delivered to the carrier"
                : "Some information is wrong"}
            </Text>

            <CustomButton
              onPress={(...args) => onPress && onPress(...args)}
              buttonText={success ? "GO TO PARCEL LIST" : "BACK"}
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    zIndex: 100,
    margin: 15,
  },
  modalView: {
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
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
  modalButton: {
    marginBottom: 15,
  },
  message: {
    textAlign: "center",
    marginBottom: 0,
    paddingBottom: 0,
    fontSize: 28,
    borderBottomColor: "lightgray",
    borderBottomWidth: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1, // Make sure the overlay is behind the modal
  },
  icon: {
    color: "red",
    textAlign: "center",
  },
});
