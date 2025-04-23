import initTodoListsEvents from "./todoLists";
import initTodosEvents from "./todos";

const initIpcMainEvents = (ipcMain: Electron.IpcMain) => {
  initTodoListsEvents(ipcMain);
  initTodosEvents(ipcMain);
};

export default initIpcMainEvents;
