import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextFields from "../common/form/textFields";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioFields from "../common/form/Radio";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxFields from "../common/form/CheckBoxFields";
import { getProfessionById, getProfessionByLabel, getQualitiesById, getQualitiesByLabel } from "../../utils/formatData";
import { genderOptions } from "../../utils/genderOptions";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  const [errors, setErrors] = useState({});
  const [professions, setProfession] = useState();
  const [qualities, setQualities] = useState([]);

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      const professionsList = getProfessionByLabel(data);
      setProfession(professionsList);
    });
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = getQualitiesByLabel(data);
      setQualities(qualitiesList);
    });
  }, []);

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
    },
    profession: {
      isRequired: {
        message: "Обязательно укажите вашу профессию"
      }
    },
    license: {
      isRequired: {
        message: "Подтвердите что вы ознакомились с лицензионным соглашением"
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
    console.log({
      ...data,
      profession: getProfessionById(data.profession, professions),
      qualities: getQualitiesById(data.qualities, qualities)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextFields onChange={handleChange} name={"email"} label={"Email"}
        value={data.email} error={errors?.email} placeholder={"Email"}
      />
      <TextFields onChange={handleChange} name={"password"} label={"Password"} type={"password"}
        value={data.password} error={errors?.password} placeholder={"Password"}
      />
      <SelectField label={"Profession"} name={"profession"} defaultOption={"Choose..."} error={errors.profession}
        value={data.profession} data={professions} onChange={handleChange} />
      <RadioFields data={genderOptions} value={data.sex} name={"sex"} onChange={handleChange} label={"Выберите пол"} />
      <MultiSelectField data={qualities} defaultValue={data.qualities} name={"qualities"} label={"Выберите ваши качества"} onChange={handleChange} />
      <CheckBoxFields onChange={handleChange} value={data.license} name={"license"} error={errors.license}>
        Я ознакомлен с <a className={"btn-link"} role={"button"}>Лицензионным соглашением</a>
      </CheckBoxFields>
      <button className={"btn btn-primary w-100 mx-auto mb-2"} type={"submit"} disabled={!isValid}>Submit</button>
    </form>
  );
};

export default RegisterForm;
