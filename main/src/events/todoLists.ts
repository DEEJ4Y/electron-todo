import addTodoList from "../controllers/todoList/add";
import deleteTodoList from "../controllers/todoList/delete";
import getAllTodoLists from "../controllers/todoList/get";
import getTodoListById from "../controllers/todoList/getById";
import renameTodoList from "../controllers/todoList/rename";

const initTodoListsEvents = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle("todoLists:getById", getTodoListById);
  ipcMain.handle("todoLists:get", getAllTodoLists);
  ipcMain.handle("todoLists:add", addTodoList);
  ipcMain.handle("todoLists:delete", deleteTodoList);
  ipcMain.handle("todoLists:rename", renameTodoList);
};

export default initTodoListsEvents;
