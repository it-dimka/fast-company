import React, { useEffect, useState } from "react";
import api from "../../api";
import SelectField from "../common/form/selectField";
import TextAreaField from "../common/form/textAreaField";
import { validator } from "../../utils/validator";
import { validatorConfigAddCommentForm } from "../../utils/errors";
import PropTypes from "prop-types";
import { getDataByLabel } from "../../utils/formatData";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);

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
    setData(initialData);
    setErrors({});
  };

  const arrayOfUsers = users && getDataByLabel(users);

  return (
    <form onSubmit={handleSubmit}>
      <h2>New comment</h2>
      <SelectField onChange={handleChange} name={"userId"} value={data.userId} data={arrayOfUsers} error={errors.userId} label={"Автор комментария"} defaultOption={"Выберите автора"} />
      <TextAreaField onChange={handleChange} name={"content"} value={data.content} error={errors.content} label={"Комментарий"} />
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
