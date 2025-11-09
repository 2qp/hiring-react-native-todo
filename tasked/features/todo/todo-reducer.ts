type TodoAction =
  | { type: "START_ADDING" }
  | { type: "STOP_ADDING" }
  | { type: "START_EDITING"; id: string }
  | { type: "STOP_EDITING"; id: string }
  | { type: "CANCEL_EDITING" };

type TodoScreenState = {
  adding: boolean;
  editing: { id: string; state: boolean } | null;
};

const INITIAL_STATE = {
  adding: false,
  editing: null,
};

const todoReducer = (
  state: TodoScreenState,
  action: TodoAction
): TodoScreenState => {
  switch (action.type) {
    case "START_ADDING":
      return { ...state, adding: true };
    case "STOP_ADDING":
      return { ...state, adding: false };
    case "START_EDITING":
      return { ...state, editing: { id: action.id, state: true } };
    case "STOP_EDITING":
      return {
        ...state,
        editing:
          state.editing?.id === action.id
            ? { id: action.id, state: false }
            : state.editing,
      };
    case "CANCEL_EDITING":
      return { ...state, editing: null };
    default:
      return state;
  }
};

export { INITIAL_STATE, todoReducer };
export type { TodoScreenState };
