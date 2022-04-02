import React from "react";

const Qualitie = ({name, color}) => {
  const style = `badge bg-${color} me-1`;
  return <span className={style}>{name}</span>;
};

export default Qualitie;
