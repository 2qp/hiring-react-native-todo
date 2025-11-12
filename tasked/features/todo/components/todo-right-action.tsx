import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Reanimated, { useAnimatedStyle } from "react-native-reanimated";

import type { JSX } from "react";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import type { SharedValue } from "react-native-reanimated";

type RightActionProps = {
  progress: SharedValue<number>;
  drag: SharedValue<number>;
  swipeable: SwipeableMethods;
  onDelete: () => void;
};

type RightActionType = (props: RightActionProps) => JSX.Element;

const RightAction: RightActionType = ({
  drag,
  progress: _prog,
  swipeable,
  onDelete,
}) => {
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: drag.value + 50 }],
  }));

  return (
    <Reanimated.View style={[styles.rightActionContainer, style]}>
      <RectButton
        style={styles.deleteButton}
        onPress={() => {
          onDelete();
          swipeable.close();
        }}
      >
        <MaterialIcons name="delete-forever" size={24} color="black" />
      </RectButton>
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  swipeable: {
    backgroundColor: "#fff",
    paddingVertical: 8,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  textContainer: { flex: 1, marginLeft: 8 },

  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  rightActionContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: "100%",
  },
  deleteButton: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export { RightAction };
export type { RightActionProps, RightActionType };
