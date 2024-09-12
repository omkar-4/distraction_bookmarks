import { useEffect, useState } from "react";

const App = () => {
  const [versionInfo, setVersionInfo] = useState({
    chrome: "",
    node: "",
    electron: "",
  });
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    if (
      window.electron &&
      typeof window.electron.getVersionInfo === "function"
    ) {
      setVersionInfo(window.electron.getVersionInfo());
    } else {
      console.error("getVersionInfo function is not available.");
    }

    // Listen for update messages from the main process
    if (window.bridge) {
      window.bridge.updateMessage((event, message) => {
        setUpdateMessage(message);
      });
    }

    // Check for updates when the component loads
    if (window.electron && typeof window.electron.checkForUpdates === "function") {
      window.electron.checkForUpdates();
    }

    // Listen for update-available and update-downloaded events
    if (window.electron) {
      window.electron.onUpdateAvailable(() => {
        setUpdateMessage("Update available! Downloading...");
      });

      window.electron.onUpdateDownloaded(() => {
        setUpdateMessage("Update downloaded! Restart the app to apply.");
      });
    }
  }, []);

  return (
    <div>
      <p>Chrome Version: {versionInfo.chrome}</p>
      <p>Node Version: {versionInfo.node}</p>
      <p>Electron Version: {versionInfo.electron}</p>
      <h2>helleo</h2>
      <h2>kaise ho</h2>
      <h2>changa ho?</h2>
      <h4 id="update-h4">{updateMessage}</h4>
    </div>
  );
};

export default App;
