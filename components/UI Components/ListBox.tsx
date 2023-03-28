import React, { ReactNode } from "react";
import {
  TouchableHighlight,
  View,
  StyleSheet,
  TouchableHighlightProps,
} from "react-native";

interface ListBoxProps {
  children: ReactNode;
  onPress?: TouchableHighlightProps["onPress"];
}

export function ListBox({ children, onPress }: ListBoxProps) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.itemBox}>{children}</View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  itemBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 25,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    padding: 15,
  },
});
