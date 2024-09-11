// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("node:path");
require("dotenv").config(); // Load .env file

const db = require("./database");

function addBookmark(title, description, summary, link) {
  db.run(
    "INSERT INTO bookmarks (title, description, summary, link) VALUES (?, ?, ?, ?)",
    [title, description, summary, link],
    function (err) {
      if (err) {
        console.error(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
}

const isDev = process.env.NODE_ENV === "development"; // Check if in development mode

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: false, // isolates renderer from Node.js
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Load URL in development or index.html in production
  if (isDev) {
    mainWindow.loadURL("http://localhost:5173"); // Vite dev server
    // mainWindow.webContents.openDevTools(); // Open DevTools in dev mode
  } else {
    mainWindow.loadFile(path.join(__dirname, "frontend/dist/index.html")); // Vite production build
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
