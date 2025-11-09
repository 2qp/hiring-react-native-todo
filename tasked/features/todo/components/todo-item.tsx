import { CheckBox } from "@/components/atoms/check-box";
import { TextField } from "@/components/atoms/text-field";
import { TextLabel } from "@/components/atoms/text-label";
import { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { RightAction } from "./todo-right-action";

import type { JSX } from "react";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import type { SharedValue } from "react-native-reanimated";
import type { EditingState, Todo, TodoUpdate } from "../todo.types";

type TodoStateControllers = {
  isEditing: EditingState;
  onTextLabelPress: (id: string) => void;
  onBlur: (id: string) => void;
};

type TodoItemProps = {
  todo: Todo;

  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, payload: TodoUpdate) => void;
} & TodoStateControllers;

type TodoItemType = (props: TodoItemProps) => JSX.Element;

const TodoItem: TodoItemType = ({
  todo,
  onToggle,
  onUpdate,
  onDelete,
  onTextLabelPress,
  onBlur,
  isEditing,
}) => {
  const swipeableRef = useRef<SwipeableMethods>(null);

  const [text, setText] = useState(todo.title || "");

  const isThisEditing = isEditing?.id === todo.id && isEditing.state;

  const handleOnDelete = () => onDelete(todo.id);

  const handleSubmit = () => {
    onUpdate(todo.id, { title: text });
    onBlur(todo.id);
  };

  //
  const RightActionWrapper = (
    progress: SharedValue<number>,
    drag: SharedValue<number>,
    swipeable: SwipeableMethods
  ) => (
    <RightAction
      drag={drag}
      onDelete={handleOnDelete}
      progress={progress}
      swipeable={swipeable}
    />
  );

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        ref={swipeableRef}
        containerStyle={styles.swipeable}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightActionWrapper}
        overshootRight={false}
      >
        <View style={styles.container}>
          <CheckBox checked={todo.isDone} onPress={() => onToggle(todo.id)} />

          <TouchableOpacity activeOpacity={1} style={styles.textContainer}>
            {isThisEditing ? (
              <TextField
                value={text}
                autoFocus
                onChangeText={setText}
                onSubmitEditing={handleSubmit}
                onBlur={() => onBlur(todo.id)}
              />
            ) : (
              <TextLabel
                onPress={() => onTextLabelPress(todo.id)}
                style={[todo.isDone && styles.completed]}
              >
                {todo.title}
              </TextLabel>
            )}
          </TouchableOpacity>
        </View>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
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
    color: "#555555",
  },

  deleteButton: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
});
export { TodoItem };
export type { TodoItemProps, TodoItemType, TodoStateControllers };
