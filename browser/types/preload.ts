import { TodoList, TodoListWithTodos } from "./todoList";

export interface ElectronAPI {
  "todoLists:get": ElectronAPIHandler<TodoList[], null>;
  "todoLists:add": ElectronAPIHandler<
    TodoList,
    { title: string; items: string[] }
  >;
  "todoLists:delete": ElectronAPIHandler<boolean, number>;
  "todoLists:rename": ElectronAPIHandler<
    boolean,
    { id: number; title: string }
  >;
  "todoLists:getById": ElectronAPIHandler<TodoListWithTodos, number>;

  "todos:toggle": ElectronAPIHandler<boolean, { id: number; checked: boolean }>;
}

export type ElectronAPIHandler<T, K extends any = undefined> = (
  args: K
) => Promise<T | null>;
