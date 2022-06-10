import React from "react";
import PropTypes from "prop-types";

const Quality = ({ name, color }) => {
  const style = `badge bg-${color} me-1`;
  return <span className={style}>{name}</span>;
};

Quality.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string
};

export default Quality;
