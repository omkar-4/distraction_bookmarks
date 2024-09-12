// preload.js
const { contextBridge, ipcRenderer } = require("electron");

let bridge = {
  updateMessage: (callback) => ipcRenderer.on("updateMessage", callback),
};
contextBridge.exposeInMainWorld("bridge", bridge);

contextBridge.exposeInMainWorld("electron", {
  getVersionInfo: () => ({
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron,
  }),
  checkForUpdates: () => ipcRenderer.send("check-for-updates"),
  onUpdateAvailable: (callback) => ipcRenderer.on("update-available", callback),
  onUpdateDownloaded: (callback) =>
    ipcRenderer.on("update-downloaded", callback),
});
