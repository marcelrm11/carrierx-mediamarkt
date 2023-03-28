import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CustomInputProps {
  label: string;
  children: React.ReactNode;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  children,
  label,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
