import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextFields from "../common/form/textFields";
import CheckBoxFields from "../common/form/CheckBoxFields";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email обязателен для заполнения"
      },
      isEmail: {
        message: "Email введен не корректно"
      }
    },
    password: {
      isRequired: {
        message: "Password обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен сожержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен сожержать хотя бы одно число"
      },
      min: {
        message: "Пароль не должен быть короче 8 символов",
        value: 8
      }
    }
  };

  const handleChange = (target) => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextFields onChange={handleChange} name={"email"} label={"Email"}
        value={data.email} error={errors?.email} placeholder={"Email"}
      />
      <TextFields onChange={handleChange} name={"password"} label={"Password"} type={"password"}
        value={data.password} error={errors?.password} placeholder={"Password"}
      />
      <CheckBoxFields value={data.stayOn} name={"stayOn"} onChange={handleChange}>Оставаться в системе</CheckBoxFields>
      <button className={"btn btn-primary w-100 mx-auto mb-2"} type={"submit"} disabled={!isValid}>Submit</button>
    </form>
  );
};

export default LoginForm;
