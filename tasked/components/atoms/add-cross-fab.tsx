import { StyleSheet, TouchableOpacity } from "react-native";
import Cross from "../icons/icon-cross";

import type { JSX } from "react";
import type { TouchableOpacityProps } from "react-native";

type AddCrossFABProps = Omit<TouchableOpacityProps, "children"> & {
  isAdding?: boolean;
  size?: number;
  color?: string;
  backgroundColor?: string;
  elevation?: number;
};

type AddCrossFABType = (props: AddCrossFABProps) => JSX.Element;

const AddCrossFAB: AddCrossFABType = ({
  isAdding = false,
  size = 48,
  color = "#51ACB4",
  backgroundColor = "#51ACB4",
  elevation = 6,
  style,
  onPress,
  ...touchableProps
}) => {
  //

  const iconRotation = isAdding ? "45deg" : "0deg";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.fab,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          elevation,
          shadowOpacity: elevation > 0 ? 0.3 : 0,
          shadowRadius: elevation > 0 ? 4 : 0,
          shadowOffset: elevation > 0 ? { width: 0, height: 2 } : undefined,
        },
        style,
      ]}
      onPress={onPress}
      {...touchableProps}
    >
      <Cross
        size={size * 0.97}
        color={color}
        style={{ transform: [{ rotate: iconRotation }] }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
  },
});

export { AddCrossFAB };
export type { AddCrossFABProps, AddCrossFABType };
