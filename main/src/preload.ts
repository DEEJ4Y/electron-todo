import { contextBridge, ipcRenderer } from "electron/renderer";
import { ElectronAPI } from "./types/preload";

const electronAPI: ElectronAPI = {
  "todoLists:get": () => ipcRenderer.invoke("todoLists:get"),
  "todoLists:add": (data: any) => ipcRenderer.invoke("todoLists:add", data),
  "todoLists:delete": (id: any) => ipcRenderer.invoke("todoLists:delete", id),
  "todoLists:rename": (data: any) =>
    ipcRenderer.invoke("todoLists:rename", data),
  "todoLists:getById": (id: any) => ipcRenderer.invoke("todoLists:getById", id),

  "todos:toggle": (data: any) => ipcRenderer.invoke("todos:toggle", data),
};

contextBridge.exposeInMainWorld("electronAPI", electronAPI);
