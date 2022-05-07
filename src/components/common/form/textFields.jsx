import React, { useState } from "react";
import PropTypes from "prop-types";
import { eye, eyeSlash, clear } from "../../../utils/svgIcons";

const TextFields = ({ label, type, name, placeholder, value, onChange, error, cleanable, classes }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const autoComplete = () => {
    return type === "password" ? "on" : null;
  };

  const getInputClasses = () => {
    return `form-control${error ? " is-invalid" : ""}`;
  };

  const clearInput = () => {
    onChange({ target: { value: "" } });
  };

  return (
    <div className={classes}>
      <label htmlFor={name}>{label}</label>
      <div className={"input-group has-validation"}>
        <input
          id={name}
          type={showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete()}
          className={getInputClasses()}
        />
        {(cleanable && value) &&
          <button className={"btn btn-outline-secondary"} type={"button"} onClick={clearInput}>{clear}</button>
        }
        {type === "password" &&
          <button className={"btn btn-outline-secondary"} type={"button"} onClick={toggleShowPassword}>{showPassword ? eyeSlash : eye}</button>
        }
        {error &&
            <div className={"invalid-feedback"}>{error}</div>
        }
      </div>
    </div>
  );
};

TextFields.defaultProps = {
  type: "text",
  classes: "mb-4"
};

TextFields.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  classes: PropTypes.string,
  error: PropTypes.string,
  cleanable: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default TextFields;
