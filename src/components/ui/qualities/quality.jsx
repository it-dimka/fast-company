import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getQualityById } from "../../../store/qualities";

const Quality = ({ qualityId }) => {
  const quality = useSelector(getQualityById(qualityId));
  const style = `badge bg-${quality.color} me-1`;
  return <span className={style}>{quality.name}</span>;
};

Quality.propTypes = {
  qualityId: PropTypes.string
};

export default Quality;
