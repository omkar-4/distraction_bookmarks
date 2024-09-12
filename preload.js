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
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("preloader running ...");
  window.bridge.updateMessage(updateMessage);

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;

    window.getVersionInfo = () => {
      return {
        chrome: process.versions.chrome,
        node: process.versions.node,
        electron: process.versions.electron,
      };
    };
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

function updateMessage(e, msg) {
  document.getElementById("update-h4").innerHTML = msg;
  console.log("update message logged in view");
}
