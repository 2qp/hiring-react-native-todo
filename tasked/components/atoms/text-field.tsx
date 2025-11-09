import { StyleSheet, TextInput } from "react-native";

import type { JSX } from "react";
import type { TextInputProps } from "react-native";

type TextFieldProps = TextInputProps;

type TextFieldType = (props: TextFieldProps) => JSX.Element;

const TextField: TextFieldType = ({ style, ...props }) => {
  return <TextInput style={[styles.input, style]} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.003,
    borderWidth: 0,
    borderColor: "#ccc",
    borderRadius: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: "#333",
  },
});
export { TextField };
export type { TextFieldProps, TextFieldType };
