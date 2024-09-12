const { contextBridge, ipcRenderer } = require("electron");

// Expose update-related APIs to the frontend
contextBridge.exposeInMainWorld("electronAPI", {
  onUpdateAvailable: (callback) => ipcRenderer.on("update_available", callback),
  onUpdateDownloaded: (callback) =>
    ipcRenderer.on("update_downloaded", callback),
  restartApp: () => ipcRenderer.send("restart_app"),
});
