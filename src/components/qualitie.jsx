import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ name, color }) => {
  const style = `badge bg-${color} me-1`;
  return <span className={style}>{name}</span>;
};

Qualitie.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default Qualitie;
