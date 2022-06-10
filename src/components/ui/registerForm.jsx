import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextFields from "../common/form/textFields";
import SelectField from "../common/form/selectField";
import RadioFields from "../common/form/Radio";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxFields from "../common/form/CheckBoxFields";
import { getDataByLabel, getQualitiesByLabel } from "../../utils/formatData";
import { genderOptions } from "../../utils/genderOptions";
import { validatorConfigRegisterForm } from "../../utils/errors";
import { useQualities } from "../../hooks/useQualities";
import { useProfessions } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    license: false
  });
  const { signUp } = useAuth();
  const [errors, setErrors] = useState({});
  const { qualities } = useQualities();
  const qualitiesList = getQualitiesByLabel(qualities);
  const { professions } = useProfessions();
  const professionsList = getDataByLabel(professions);

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData(prevState => ({ ...prevState, [target.name]: target.value }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfigRegisterForm);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data, qualities: data.qualities.map(q => q.value)
    };

    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
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
        value={data.profession} data={professionsList} onChange={handleChange}/>
      <RadioFields data={genderOptions} value={data.sex} name={"sex"} onChange={handleChange} label={"Выберите пол"}/>
      <MultiSelectField data={qualitiesList} defaultValue={data.qualities} name={"qualities"}
        label={"Выберите ваши качества"} onChange={handleChange}/>
      <CheckBoxFields onChange={handleChange} value={data.license} name={"license"} error={errors.license}>
          Я ознакомлен с <a className={"btn-link"} role={"button"}>Лицензионным соглашением</a>
      </CheckBoxFields>
      <button className={"btn btn-primary w-100 mx-auto mb-2"} type={"submit"} disabled={!isValid}>Submit</button>
    </form>
  );
};

export default RegisterForm;
