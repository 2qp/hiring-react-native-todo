import { Platform, StyleSheet, View, VirtualizedList } from "react-native";
import { TodoItem } from "./todo-item";

import type { JSX } from "react";
import type { Todo } from "../todo.types";

type TodoListProps = {
  todos: Todo[];
};

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
        onScrollToIndexFailed={() => {}}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps={Platform.OS === "ios" ? "handled" : "always"}
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

