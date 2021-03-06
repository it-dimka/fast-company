import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, placeholder, value, onChange, error, classes, row }) => {
  const getInputClasses = () => {
    return `form-control${error ? " is-invalid" : ""}`;
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <div className={"input-group has-validation"}>
        <textarea
          id={name}
          name={name}
          value={value}
          rows={row}
          placeholder={placeholder}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {error &&
              <div className={"invalid-feedback"}>{error}</div>
        }
      </div>
    </div>
  );
};

TextAreaField.defaultProps = {
  classes: "mb-4",
  row: 3
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  classes: PropTypes.string,
  error: PropTypes.string,
  row: PropTypes.number,
  onChange: PropTypes.func.isRequired
};

export default TextAreaField;
