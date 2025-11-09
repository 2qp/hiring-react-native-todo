import { AddCrossFAB } from "@/components/atoms/add-cross-fab";
import { LoadingScreen } from "@/components/organisms/loading-screen";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TodoList } from "./components/todo-list";
import { useTodoApp } from "./hooks/use-todo-app";
import { useTodos } from "./hooks/use-todos";

import type { JSX } from "react";

type TodosAppType = () => JSX.Element;

const TodosApp: TodosAppType = () => {
  //

  const [state, { add, remove, toggle, update }] = useTodos();

  const [screen, handlers] = useTodoApp({
    add,
    remove,
    update,
    todos: state.todos,
  });

  const dismissKeyboard = () => Keyboard.dismiss();

  if (!state.ready) {
    return <LoadingScreen />;
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
        <View style={{ flex: 1 }}>
          <TodoList
            todos={state.todos}
            onDelete={remove}
            onToggle={toggle}
            onUpdate={handlers.update}
            isEditing={screen.todoState.editing}
            onBlur={handlers.blur}
            onTextLabelPress={handlers.press}
          />
        </View>
      </TouchableWithoutFeedback>
      <AddCrossFAB
        isAdding={screen.todoState.adding}
        onPress={handlers.add}
        style={styles.fabPosition}
        color="#FFFFFF"
      />
    </>
  );
};

const styles = StyleSheet.create({
  fabPosition: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});

export { TodosApp };
export type { TodosAppType };
