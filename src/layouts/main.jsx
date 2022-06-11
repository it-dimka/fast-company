import React from "react";
import useMokData from "../utils/mokData";

const Main = () => {
  const { initialize, progress, status, error } = useMokData();

  const handleClick = () => {
    initialize();
  };

  return (
    <div className={"container mt-5"}>
      <h1>Main page</h1>
      <h3>Инициализация Firebase</h3>
      <ul>
        <li>Status {status}</li>
        <li>Progress {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className={"btn btn-primary mt-5"} onClick={handleClick}>Инициализация</button>
    </div>
  );
};

export default Main;
