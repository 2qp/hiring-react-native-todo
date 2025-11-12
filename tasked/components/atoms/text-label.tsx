import { StyleSheet, Text } from "react-native";

import type { JSX } from "react";
import type { TextProps } from "react-native";

type TextLabelProps = TextProps;

type TextLabelType = (props: TextLabelProps) => JSX.Element;

const TextLabel: TextLabelType = ({ style, ...props }) => {
  return <Text style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: -0.003,
    color: "#333",
  },
});

export { TextLabel };
export type { TextLabelProps, TextLabelType };
