import { useTodoStore } from "../todo.store";

import type { Todo } from "../todo.types";

// type UseTodosParams = {};

type State = {
  ready: boolean;
};

type Handlers = {
  add: (title: string) => Todo;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  update: (id: string, payload: Partial<Omit<Todo, "id">>) => void;
  find: (id: string) => Todo | undefined;
};

type UseTodosType = () => //   params: UseTodosParams
[State, Handlers];

const useTodos: UseTodosType = () => {
  //

  // const todos = useTodoStore.use.todos();
  const setTodos = useTodoStore.use.setTodos();
  const ready = useTodoStore.use._hasHydrated();

  const toggle = (id: string) => {
    const todos = useTodoStore.getState().todos;

    const index = todos.findIndex((item) => item.id === id);

    const todo = todos[index];

    const updatedTodo: Todo = { ...todo, isDone: !todo.isDone };

    setTodos([
      ...todos.slice(0, index),
      updatedTodo,
      ...todos.slice(index + 1),
    ]);
  };

  const update = (id: string, payload: Partial<Omit<Todo, "id">>) => {
    const todos = useTodoStore.getState().todos;
    const index = todos.findIndex((item) => item.id === id);

    const todo = todos[index];

    const updatedTodo: Todo = { ...todo, ...payload };

    setTodos([
      ...todos.slice(0, index),
      updatedTodo,
      ...todos.slice(index + 1),
    ]);
  };

  const remove = (id: string) => {
    const todos = useTodoStore.getState().todos;
    const index = todos.findIndex((item) => item.id === id);

    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  };

  const add = (title: string) => {
    const todos = useTodoStore.getState().todos;
    const todo: Todo = {
      id: Date.now().toString(),
      title,
      isDone: false,
      content: null,
    };

    setTodos([todo, ...todos]);

    return todo;
  };

  const find = (id: string) =>
    useTodoStore.getState().todos.find((t) => t.id === id);

  //
  const handlers = {
    add,
    remove,
    toggle,
    update,
    find,
  };

  const state = {
    ready,
  };

  return [state, handlers];
};

export { useTodos };
export type { Handlers as UseTodosHandlers, UseTodosType };

