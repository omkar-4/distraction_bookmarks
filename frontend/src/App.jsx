import { useEffect, useState } from "react";

const VersionInfo = () => {
  const [versionInfo, setVersionInfo] = useState({
    chrome: "",
    node: "",
    electron: "",
  });

  useEffect(() => {
    if (
      window.electron &&
      typeof window.electron.getVersionInfo === "function"
    ) {
      setVersionInfo(window.electron.getVersionInfo());
    } else {
      console.error("getVersionInfo function is not available.");
    }
  }, []);

  return (
    <div>
      <p>Chrome Version: {versionInfo.chrome}</p>
      <p>Node Version: {versionInfo.node}</p>
      <p>Electron Version: {versionInfo.electron}</p>
      <h2>helleo</h2>
    </div>
  );
};

export default VersionInfo;
