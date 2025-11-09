import { CheckBox } from "@/components/atoms/check-box";
import { TextField } from "@/components/atoms/text-field";
import { TextLabel } from "@/components/atoms/text-label";
import { useOperationStore } from "@/stores/operation.store";
import { memo, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { useTodoApp } from "../hooks/use-todo-app";
import { useTodos } from "../hooks/use-todos";
import { RightAction } from "./todo-right-action";

import type { JSX } from "react";
import type { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import type { SharedValue } from "react-native-reanimated";
import type { Todo } from "../todo.types";

type TodoItemProps = {
  todo: Todo;
};

type TodoItemType = (props: TodoItemProps) => JSX.Element;

const TodoItem: TodoItemType = ({ todo }) => {
  const swipeableRef = useRef<SwipeableMethods>(null);

  const [_, { remove, toggle }] = useTodos();
  const [__, { update, blur, press }] = useTodoApp();

  const [text, setText] = useState(todo.title || "");

  const isEditing = useOperationStore((s) => s.todoState.editing);

  const isThisEditing = isEditing?.id === todo.id && isEditing.state;

  const handleOnDelete = () => remove(todo.id);

  const handleSubmit = () => {
    update(todo.id, { title: text });
    blur();
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
        <View style={[styles.container, isThisEditing && styles.editing]}>
          <CheckBox checked={todo.isDone} onPress={() => toggle(todo.id)} />

          <TouchableOpacity activeOpacity={1} style={styles.textContainer}>
            {isThisEditing ? (
              <TextField
                value={text}
                autoFocus
                onChangeText={setText}
                onSubmitEditing={handleSubmit}
                onBlur={handleSubmit}
              />
            ) : (
              <TextLabel
                onPress={() => press(todo.id)}
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
    paddingVertical: 0,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    height: 56,
    backgroundColor: "#fff",
  },
  textContainer: { flex: 1, marginLeft: 8 },

  editing: {
    backgroundColor: "#EEEEEE",
  },

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

const MemoizedTodoItem = memo(TodoItem);

export { MemoizedTodoItem as TodoItem };
export type { TodoItemProps, TodoItemType };

