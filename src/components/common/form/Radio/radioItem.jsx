import React from "react";
import PropTypes from "prop-types";

const RadioItem = ({ name, id, label, onChange, value, checked }) => {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name={name}
        id={id}
        checked={checked}
        onChange={onChange}
        value={value} />
      <label className="form-check-label" htmlFor={id}>{label}</label>
    </div>
  );
};

RadioItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  checked: PropTypes.bool
};

export default RadioItem;
