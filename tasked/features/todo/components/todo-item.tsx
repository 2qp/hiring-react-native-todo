import { CheckBox } from "@/components/atoms/check-box";
import { TextField } from "@/components/atoms/text-field";
import { TextLabel } from "@/components/atoms/text-label";
import { useOperationStore } from "@/stores/operation.store";
import { memo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTodoApp } from "../hooks/use-todo-app";
import { useTodos } from "../hooks/use-todos";

import type { JSX } from "react";
import type { Todo } from "../todo.types";

type TodoItemProps = {
  todo: Todo;
};

type TodoItemType = (props: TodoItemProps) => JSX.Element;

const TodoItem: TodoItemType = ({ todo }) => {
  const [_, { toggle }] = useTodos();
  const [__, { update, blur, press }] = useTodoApp();

  const [text, setText] = useState(todo.title || "");

  const isEditing = useOperationStore((s) => s.todoState.editing);

  const isThisEditing = isEditing?.id === todo.id && isEditing.state;

  const handleSubmit = () => {
    update(todo.id, { title: text });
    blur();
  };

  return (
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
  );
};

const styles = StyleSheet.create({
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

