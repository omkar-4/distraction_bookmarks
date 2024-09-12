// Modules to control application life and create native browser window
const { app, dialog, BrowserWindow } = require("electron");
const path = require("node:path");
require("dotenv").config();
const { db, addBookmark } = require("./db");

const { autoUpdater, AppUpdater } = require("electron-updater");

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const isDev = process.env.NODE_ENV === "dev"; // true/false

const createWindow = () => {
  console.log("Creating window...");
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: true,
    },
    icon: path.join(__dirname, "icons/logo.ico"),
  });

  // mainWindow.loadFile("index.html");

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173"); // Vite URL
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "frontend/dist/index.html")); // Vite production build
  }
};

// show message to user that update is available
// autoUpdater.on("update-available", () => {
//   dialog
//     .showMessageBox({
//       type: "info",
//       title: "Update Available",
//       message: "An update is available. Do you want to update now?",
//       buttons: ["Yes", "No"],
//     })
//     .then((result) => {
//       if (result.response === 0) {
//         autoUpdater.quitAndInstall();
//       }
//     });
// });

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  autoUpdater.checkForUpdates();
  // curWindow.showMessage("check for updates");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
