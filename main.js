// Main.js
const { app, dialog, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
require("dotenv").config();
const { db, addBookmark } = require("./db"); // Assuming you're using this for the database
const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = false; // Disable auto download
autoUpdater.autoInstallOnAppQuit = true; // Automatically install updates when quitting

const isDev = process.env.NODE_ENV === "dev"; // Detect environment (development or production)

const createWindow = () => {
  console.log("Creating window...");
  
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      sandbox: true,
    },
    icon: path.join(__dirname, "icons/logo.ico"), // Your app icon
  });

  // Load the appropriate URL based on environment
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173"); // Vite development server
    // Uncomment if you want to open dev tools
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "frontend/dist/index.html")); // Vite production build
  }

  // Notify users when an update is available
  autoUpdater.on("update-available", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update Available",
        message: "An update is available. Do you want to update now?",
        buttons: ["Yes", "No"],
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.downloadUpdate(); // Start download when "Yes" is clicked
        }
      });
  });

  autoUpdater.on("update-not-available", (info)=>{
    console.log("update-not-available", info)
  })

  // Notify users when the update has been downloaded
  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Update Ready",
        message: "A new update is ready. Do you want to install and restart now?",
        buttons: ["Yes", "Later"],
      })
      .then((result) => {
        if (result.response === 0) {
          autoUpdater.quitAndInstall(); // Install and restart if "Yes"
        }
      });
  });
};

// Register the IPC event for checking updates manually
ipcMain.on("check-for-updates", () => {
  autoUpdater.checkForUpdates();
});

// App ready event
app.whenReady().then(() => {
  createWindow(); // Create the browser window

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Auto check for updates when the app is ready
  autoUpdater.checkForUpdates();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Ensure that the database (db) related functionality still works
// Assuming you have your db functions like addBookmark working elsewhere in the code
