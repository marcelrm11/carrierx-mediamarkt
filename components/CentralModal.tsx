import React, { ReactNode } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableHighlightProps,
} from "react-native";
import { CustomButton } from "./CustomButton";

interface CentralModalProps {
  isVisible: boolean;
  toggle: Function;
  onPress: TouchableHighlightProps["onPress"];
  icon: ReactNode;
  message: string;
  buttonText: string;
}

export const CentralModal: React.FC<CentralModalProps> = ({
  isVisible,
  toggle,
  onPress,
  icon,
  message,
  buttonText,
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
            {icon}
            <Text style={styles.message}>{message}</Text>
            <CustomButton
              onPress={onPress}
              buttonText={buttonText}
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
  modalButton: {
    marginBottom: 10,
  },
  message: {
    textAlign: "center",
    marginBottom: 0,
    paddingBottom: 0,
    fontSize: 30,
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
});
