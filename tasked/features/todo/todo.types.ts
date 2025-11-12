type Todo = {
  id: string;
  title: string;
  content: string | null;
  isDone: boolean;
};

type TodoUpdate = Partial<Omit<Todo, "id">>;

type EditingState = {
  id: string;
  state: boolean;
} | null;

export type { EditingState, Todo, TodoUpdate };
