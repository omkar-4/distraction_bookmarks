import { useState, useEffect } from "react";

function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);

  useEffect(() => {
    // Listen for update-available message
    window.electronAPI.onUpdateAvailable(() => {
      setUpdateAvailable(true);
    });

    // Listen for update-downloaded message
    window.electronAPI.onUpdateDownloaded(() => {
      setUpdateDownloaded(true);
    });
  }, []);

  const handleUpdateNow = () => {
    // Restart the app to install the update
    window.electronAPI.restartApp();
  };

  return (
    <div className="App">
      <h1>Welcome to My Electron App</h1>

      {updateAvailable && !updateDownloaded && (
        <div>
          <p>An update is available. It will be downloaded automatically.</p>
        </div>
      )}

      {updateDownloaded && (
        <div>
          <p>Update downloaded! Click the button below to install.</p>
          <button onClick={handleUpdateNow}>Install Update</button>
        </div>
      )}
    </div>
  );
}

export default App;
