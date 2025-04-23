import { Todo, TodoList } from "@prisma/client";

export interface TodoListWithTodos extends TodoList {
  todos: Todo[];
}
