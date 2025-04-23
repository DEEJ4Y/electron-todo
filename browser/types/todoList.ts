export interface TodoList {
  id: number;
  title: string;
}

export interface TodoListWithTodos extends TodoList {
  todos: Todo[];
}

export interface Todo {
  id: number;
  title: string;
  checked: boolean;
}
