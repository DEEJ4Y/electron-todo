import dotenv from "dotenv";

dotenv.config();

import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import initIpcMainEvents from "./events";

const preloadScriptPath = path.join(
  __dirname,
  process.env.PRELOAD_SCRIPT_PATH || ""
);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: preloadScriptPath,
    },
    title: "Todo App",
    autoHideMenuBar: true,
  });

  const startUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../../browser/out/index.html")}`;

  initIpcMainEvents(ipcMain);

  mainWindow.loadURL(startUrl);
}

app?.whenReady?.().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app?.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

console.log("starting electron");
