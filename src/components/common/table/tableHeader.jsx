import React from "react";
import PropTypes from "prop-types";
import { arrowDown, arrowUp } from "../../../utils/svgIcons";

const TableHeader = ({ selectedSort, onSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };

  const getArrow = () => {
    return selectedSort.order === "asc" ? arrowUp : arrowDown;
  };

  const renderColumn = (item) => {
    if (selectedSort.path === columns[item].path) {
      return (
        <>
          {columns[item].name}
          {getArrow()}
        </>
      );
    }
    return columns[item].name;
  };

  return (
    <thead>
      <tr>
        {Object.keys(columns).map(column => (
          <th
            scope="col"
            key={column}
            role={columns[column].path ? "button" : null}
            onClick={columns[column].path
              ? () => handleSort(columns[column].path)
              : undefined}
          >
            {renderColumn(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired,
  onSort: PropTypes.func.isRequired
};

export default TableHeader;
