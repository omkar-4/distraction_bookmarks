// preload.js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getVersionInfo: () => ({
    chrome: process.versions.chrome,
    node: process.versions.node,
    electron: process.versions.electron,
  }),
});



window.addEventListener("DOMContentLoaded", () => {
  console.log("preloader running ...");
  
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;

    window.getVersionInfo = () => {
      let userAgent = navigator.userAgent; 

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
