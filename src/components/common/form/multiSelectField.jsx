import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, onChange, data, name }) => {
  const iterationElements = !Array.isArray(data) && typeof data === "object"
    ? Object.keys(data)?.map(item => {
      return { label: data[item].name, value: data[item]._id };
    })
    : data?.map(item => {
      return { label: item.name, value: item._id };
    });

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
  name: PropTypes.string
};

export default MultiSelectField;
