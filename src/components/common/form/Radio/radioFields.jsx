import React from "react";
import PropTypes from "prop-types";
import RadioItem from "./radioItem";

const RadioFields = ({ value, name, onChange, data, label }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div>
        {data.map(item => <RadioItem
          key={item.name + "_" + item.value}
          id={item.name + "_" + item.value}
          label={item.name}
          name={name}
          value={item.value}
          onChange={handleChange}
          checked={item.value === value}
        />)}
      </div>
    </div>
  );
};

RadioFields.propTypes = {
  data: PropTypes.array,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string
};

export default RadioFields;
