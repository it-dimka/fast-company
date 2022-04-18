import React from "react";
import PropTypes from "prop-types";
import { checkIcon, unCheckIcon } from "../utils/svgIcons";

const Bookmark = ({ status, id, onToggleBookMark }) => {
  const getRenderIcon = () => {
    return status ? checkIcon : unCheckIcon;
  };

  return (
    <button className={"btn btn-sm"} onClick={() => onToggleBookMark(id)}>
      {getRenderIcon()}
    </button>
  );
};

Bookmark.propTypes = {
  status: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};
export default Bookmark;
