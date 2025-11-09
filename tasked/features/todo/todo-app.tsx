import { AddCrossFAB } from "@/components/atoms/add-cross-fab";
import { LoadingScreen } from "@/components/organisms/loading-screen";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TodoList } from "./components/todo-list";
import { useTodoApp } from "./hooks/use-todo-app";
import { useTodos } from "./hooks/use-todos";

import type { JSX } from "react";

const titleHeight = 41;
const titleMarginTop = 84;
const contentMarginTop = 16;
const statusBarHeight = StatusBar.currentHeight || 0;

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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        titleHeight + titleMarginTop + contentMarginTop + statusBarHeight
      }
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
        <View style={styles.contentContainer}>
          <TodoList
            todos={state.todos}
            onDelete={remove}
            onToggle={toggle}
            onUpdate={handlers.update}
            isEditing={screen.todoState.editing}
            onBlur={handlers.blur}
            onTextLabelPress={handlers.press}
          />

          <View style={styles.fabContainer}>
            <AddCrossFAB
              isAdding={screen.todoState.adding}
              onPress={handlers.add}
              style={[]}
              color="#FFFFFF"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  fabContainer: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});

export { TodosApp };
export type { TodosAppType };
