import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
  const iterableElements = Array.isArray(items)
    ? items
    : Object.keys(items).map(item => items[item]);

  return (
    <ul className="list-group">
      {iterableElements.map(item =>
        <li
          className={"list-group-item" + (item === selectedItem ? " active" : "")}
          role={"button"}
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
        >
          {item[contentProperty]}
        </li>
      )}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default GroupList;
