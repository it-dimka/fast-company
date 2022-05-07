import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, defaultOption, value, data, onChange, error }) => {
  const iterationElements = !Array.isArray(data) && typeof data === "object"
    ? Object.keys(data)?.map(item => {
      return { name: data[item].name, value: data[item]._id };
    })
    : data?.map(item => {
      return { name: item.name, value: item._id };
    });

  const getSelectClasses = () => {
    return `form-select${error ? " is-invalid" : ""}`;
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">{label}</label>
      <select value={value} onChange={handleChange} name={"profession"} className={getSelectClasses()} id="validationCustom04" required>
        <option disabled value="">{defaultOption}</option>
        {data &&
              iterationElements.map(item => <option key={item.value} value={item.value}>{item.name}</option>)}
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
  onChange: PropTypes.func
};

export default SelectField;
