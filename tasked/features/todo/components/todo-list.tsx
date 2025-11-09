import { StyleSheet, View, VirtualizedList } from "react-native";
import { TodoItem } from "./todo-item";

import type { JSX } from "react";
import type { Todo, TodoUpdate } from "../todo.types";
import type { TodoStateControllers } from "./todo-item";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, payload: TodoUpdate) => void;
} & TodoStateControllers;

type TodoListType = (props: TodoListProps) => JSX.Element;

const TodoList: TodoListType = ({ todos, ...props }) => {
  //

  const getItem = (data: Todo[], index: number) => data[index];
  const getItemCount = (data: Todo[]) => data.length;

  return (
    <View style={styles.container}>
      <VirtualizedList
        data={todos}
        initialNumToRender={10}
        getItemCount={getItemCount}
        getItem={getItem}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoItem todo={item} {...props} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { TodoList };
export type { TodoListProps, TodoListType };
