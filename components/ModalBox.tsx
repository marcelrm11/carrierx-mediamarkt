import React, { ReactNode } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableHighlightProps,
} from "react-native";
import { CustomButton } from "./CustomButton";

interface ModalBoxProps {
  isVisible: boolean;
  toggle: Function;
  onPress: (...args: any[]) => void;
  children: ReactNode;
  buttonText: string;
  title: string;
}

export const ModalBox: React.FC<ModalBoxProps> = ({
  isVisible,
  toggle,
  onPress,
  children,
  buttonText,
  title,
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
            <Text style={styles.title}>{title}</Text>
            {children}
            <CustomButton
              onPress={(...args) => onPress && onPress(...args)}
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
  modalButton: {
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 25,
    paddingBottom: 15,
    fontSize: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
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
