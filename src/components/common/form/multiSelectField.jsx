import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, onChange, data, name, defaultValue }) => {
  const iterationElements =
      !Array.isArray(data) && typeof data === "object"
        ? Object.values(data)
        : data;

  const handleChange = (value) => {
    onChange({ name: name, value: value });
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <Select
        isMulti
        closeMenuOnSelect={false}
        className="basic-multi-select"
        classNamePrefix="select"
        defaultValue={defaultValue}
        onChange={handleChange}
        options={iterationElements}
        name={name}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  defaultValue: PropTypes.array
};

export default MultiSelectField;
