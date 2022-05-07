import React from "react";
import PropTypes from "prop-types";

const CheckBoxFields = ({ name, onChange, value, children, error }) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  const getCheckBoxClasses = () => {
    return `form-check-input${error ? " is-invalid" : ""}`;
  };

  return (
    <div className="mb-4">
      <div className="form-check">
        <input className={getCheckBoxClasses()} type="checkbox" value="" id={name} checked={value}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
        {error &&
            <div className="invalid-feedback">
              {error}
            </div>
        }
      </div>
    </div>
  );
};

CheckBoxFields.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  error: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CheckBoxFields;
