// Modules to control application life and create native browser window
const { app, autoUpdater, dialog, BrowserWindow } = require("electron");
const path = require("node:path");
require("dotenv").config();
const { db, addBookmark } = require("./db");

const { updateElectronApp, UpdateSourceType } = require("update-electron-app");
updateElectronApp({
  updateInterval: '5 minutes',
});

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

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
