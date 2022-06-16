import React, { useEffect, useState } from "react";
import TextAreaField from "../common/form/textAreaField";
import { validator } from "../../utils/validator";
import { validatorConfigAddCommentForm } from "../../utils/errors";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.values(data).every(item => !!item)) {
      validate();
    }
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfigAddCommentForm);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (target) => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New comment</h2>
      <TextAreaField onChange={handleChange} name={"content"} value={data?.content || ""} error={errors.content} label={"Комментарий"} />
      <div className={"d-flex justify-content-end"}>
        <button className={"btn btn-primary"}>Опубликовать</button>
      </div>
    </form>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentForm;
