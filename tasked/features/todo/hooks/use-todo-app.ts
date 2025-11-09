import { useOperationStore } from "@/stores/operation.store";
import { useTodos } from "./use-todos";

import type { Todo, TodoUpdate } from "../todo.types";

type State = {
  ready: boolean;
};

type Handlers = {
  add: () => void;
  update: (id: string, payload: Partial<Omit<Todo, "id">>) => void;
  blur: () => void;
  press: (id: string) => void;
};

type UseTodoAppType = () => [State, Handlers];

const useTodoApp: UseTodoAppType = () => {
  //

  const [s, { add, remove, update, find }] = useTodos();
  const dispatch = useOperationStore((s) => s.dispatch);

  const handleAdding = () => {
    const todoState = useOperationStore.getState().todoState;
    if (todoState.editing?.state) {
      //

      const currentTodo = find(todoState.editing.id);

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

  const state = { ready: s.ready };
  const handlers = {
    add: handleAdding,
    update: handleUpdate,
    blur: handleOnBlur,
    press: handleTextLabelPress,
  };

  return [state, handlers];
};

export { useTodoApp };
export type { UseTodoAppType };

