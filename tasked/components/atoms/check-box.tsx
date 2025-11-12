import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Checkmark } from "../icons/icon-check";

import type { JSX } from "react";
import type { GestureResponderEvent } from "react-native";

type CheckBoxProps = {
  checked: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  testID?: string;
};

type CheckBoxType = (props: CheckBoxProps) => JSX.Element;

const CheckBox: CheckBoxType = ({
  checked,
  onPress,
  testID,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={1}
      disabled={disabled}
      onPress={onPress}
      style={styles.container}
    >
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked && <Checkmark size={15} color="#ffffff" />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
  },
  boxChecked: {
    backgroundColor: "#51ACB4",
    borderWidth: 1,
    borderColor: "#51ACB4",
  },
});

export { CheckBox };
export type { CheckBoxProps, CheckBoxType };
