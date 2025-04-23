import toggleTodo from "../controllers/todos/check";

const initTodosEvents = (ipcMain: Electron.IpcMain) => {
  ipcMain.handle("todos:toggle", toggleTodo);
};

export default initTodosEvents;
