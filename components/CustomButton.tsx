import * as React from "react";
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  TouchableHighlightProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface CustomButtonProps {
  onPress: (...args: any[]) => void;
  buttonText: string | React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  buttonText,
  style,
}) => {
  return (
    <TouchableHighlight
      style={[styles.button, style]}
      onPress={(...args) => onPress && onPress(...args)}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    margin: "auto",
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 5,
    width: "100%",
    height: 50,
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
});
