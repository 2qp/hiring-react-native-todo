import { AddCrossFAB } from "@/components/atoms/add-cross-fab";
import { LoadingScreen } from "@/components/organisms/loading-screen";
import { useOperationStore } from "@/stores/operation.store";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TodoList } from "./components/todo-list";
import { useTodoApp } from "./hooks/use-todo-app";
import { useTodoStoreBase } from "./todo.store";

import type { JSX } from "react";

const titleHeight = 41;
const titleMarginTop = 84;
const contentMarginTop = 16;
const statusBarHeight = StatusBar.currentHeight || 0;

type TodosAppType = () => JSX.Element;

const TodosApp: TodosAppType = () => {
  //

  const todos = useTodoStoreBase((s) => s.todos);
  const todoState = useOperationStore((s) => s.todoState);

  const [state, handlers] = useTodoApp();

  const dismissKeyboard = () => Keyboard.dismiss();

  if (!state.ready) {
    return <LoadingScreen />;
  }

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={
          titleHeight + titleMarginTop + contentMarginTop + statusBarHeight
        }
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
          <View style={styles.contentContainer}>
            <TodoList todos={todos} />

            <View style={styles.fabContainer}>
              <AddCrossFAB
                isAdding={todoState.adding}
                onPress={handlers.add}
                style={[]}
                color="#FFFFFF"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
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

