import addTodoList from "../controllers/todoList/add";
import deleteTodoList from "../controllers/todoList/delete";
import getAllTodoLists from "../controllers/todoList/get";
import getTodoListById from "../controllers/todoList/getById";
import renameTodoList from "../controllers/todoList/rename";
import toggleTodo from "../controllers/todos/check";

export interface ElectronAPI {
  // todoLists
  "todoLists:get": typeof getAllTodoLists;
  "todoLists:add": typeof addTodoList;
  "todoLists:delete": typeof deleteTodoList;
  "todoLists:rename": typeof renameTodoList;
  "todoLists:getById": typeof getTodoListById;

  // todos
  "todos:toggle": typeof toggleTodo;
}
