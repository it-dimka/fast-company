import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, name, defaultOption, value, data, onChange, error }) => {
  const iterationElements =
      !Array.isArray(data) && typeof data === "object"
        ? Object.values(data)
        : data;

  const getSelectClasses = () => {
    return `form-select${error ? " is-invalid" : ""}`;
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">{label}</label>
      <select value={value} onChange={handleChange} name={name} className={getSelectClasses()} id={name} required>
        <option disabled value="">{defaultOption}</option>
        {iterationElements?.length > 0 &&
              iterationElements.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
      </select>
      {error &&
          <div className="invalid-feedback">{error}</div>
      }
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string
};

export default SelectField;
