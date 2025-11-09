import { useReducer } from "react";
import { INITIAL_STATE, todoReducer } from "../todo-reducer";

import type { TodoScreenState } from "../todo-reducer";
import type { Todo, TodoUpdate } from "../todo.types";
import type { UseTodosHandlers } from "./use-todos";

type State = {
  todoState: TodoScreenState;
};

type Handlers = {
  add: () => void;
  update: (id: string, payload: Partial<Omit<Todo, "id">>) => void;
  blur: () => void;
  press: (id: string) => void;
};

type UseTodoAppParams = {
  todos: Todo[];
} & Pick<UseTodosHandlers, "add" | "remove" | "update">;

type UseTodoAppType = (params: UseTodoAppParams) => [State, Handlers];

const useTodoApp: UseTodoAppType = ({ todos, add, update, remove }) => {
  //

  const [todoState, dispatch] = useReducer(todoReducer, INITIAL_STATE);

  const handleAdding = () => {
    if (todoState.editing?.state) {
      //

      const currentTodo = todos.find(
        (todo) => todo.id === todoState.editing!.id
      );

      if (!currentTodo?.title) {
        remove(todoState.editing.id);
        dispatch({ type: "CANCEL_EDITING" });
        dispatch({ type: "STOP_ADDING" });
        return;
      }
    }

    const todo = add("");
    dispatch({ type: "START_ADDING" });
    dispatch({ type: "START_EDITING", id: todo.id });
  };

  const handleUpdate = (id: string, payload: TodoUpdate) => {
    update(id, payload);
    dispatch({ type: "CANCEL_EDITING" });
    dispatch({ type: "STOP_ADDING" });
  };

  const handleOnBlur = () => dispatch({ type: "CANCEL_EDITING" });

  const handleTextLabelPress = (id: string) =>
    dispatch({ type: "START_EDITING", id });

  const state = { todoState };
  const handlers = {
    add: handleAdding,
    update: handleUpdate,
    blur: handleOnBlur,
    press: handleTextLabelPress,
  };

  return [state, handlers];
};

export { useTodoApp };
export type { UseTodoAppParams, UseTodoAppType };
