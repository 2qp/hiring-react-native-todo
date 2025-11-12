import { INITIAL_STATE, todoReducer } from "@/features/todo/todo-reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { TodoAction, TodoScreenState } from "@/features/todo/todo-reducer";

type TodoStore = {
  todoState: TodoScreenState;

  dispatch: (action: TodoAction) => void;

  clear: () => void;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

const useOperationStoreBase = create<TodoStore>()(
  persist(
    devtools((set) => ({
      //
      _hasHydrated: false,

      //
      todoState: INITIAL_STATE,
      dispatch: (action) =>
        set((state) => ({
          todoState: todoReducer(state.todoState, action),
        })),

      clear: () => set(() => ({ todoState: { adding: false, editing: null } })),

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      //
    })),

    //
    {
      name: "operations-storage",
      storage: createJSONStorage(() => AsyncStorage),

      //
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);

// const useOperationStore = createSelectors(useOperationStoreBase);

export { useOperationStoreBase as useOperationStore };
