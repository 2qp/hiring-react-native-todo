import { createSelectors } from "@/utils/with-selectors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { Todo } from "./todo.types";

type TodoStore = {
  todos: Todo[];

  setTodos: (todos: Todo[]) => void;

  clear: () => void;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

const useTodoStoreBase = create<TodoStore>()(
  persist(
    devtools((set) => ({
      todos: [],

      //
      _hasHydrated: false,

      //
      setTodos: (todos) => set({ todos }),

      clear: () => set(() => ({ todos: [] })),

      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      //
    })),

    //
    {
      name: "todo-storage",
      storage: createJSONStorage(() => AsyncStorage),

      //
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
    }
  )
);

const useTodoStore = createSelectors(useTodoStoreBase);

export { useTodoStore };
