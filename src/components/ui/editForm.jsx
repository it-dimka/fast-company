import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TextFields from "../common/form/textFields";
import SelectField from "../common/form/selectField";
import { getDataByLabel, getQualitiesByLabel } from "../../utils/formatData";
import RadioFields from "../common/form/Radio";
import { genderOptions } from "../../utils/genderOptions";
import MultiSelectField from "../common/form/multiSelectField";
import { validator } from "../../utils/validator";
import { validatorConfigEditForm } from "../../utils/errors";
import ButtonHistoryBack from "../common/buttonHistoryBack";
import { useProfessions } from "../../hooks/useProfession";
import { useQualities } from "../../hooks/useQualities";
import { useAuth } from "../../hooks/useAuth";

const EditForm = () => {
  const history = useHistory();
  const { currentUser, updateUserData } = useAuth();
  const [user, setUser] = useState(currentUser);
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { professions } = useProfessions();
  const { qualities } = useQualities();
  const professionsList = getDataByLabel(professions);
  const qualitiesList = getQualitiesByLabel(qualities);

  const validate = () => {
    const errors = validator(user, validatorConfigEditForm);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [user]);

  useEffect(() => {
    if (!!currentUser && !!qualities.length && !!professions.length) {
      setLoading(false);
    }
  }, [qualities, professions, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    updateUserData(user);
    history.replace(`/users/${currentUser._id}`);
  };

  const handleChange = (target) => {
    if (target.name === "profession") {
      const _id = target.value;
      setUser(prevState => ({ ...prevState, profession: _id }));
    } else if (target.name === "qualities") {
      const qualities = target.value.map(item => item.value);
      setUser(prevState => ({ ...prevState, qualities }));
    } else {
      setUser(prevState => ({ ...prevState, [target.name]: target.value }));
    }
  };

  const userQualities = user.qualities.map(id => {
    return qualitiesList.find(q => q.value === id);
  });

  return (
    <div className={"container mt-4"}>
      <ButtonHistoryBack />
      <div className={"row"}>
        <div className={"col-md-6 offset-md-3 shadow p-4"}>
          {!isLoading
            ? <form onSubmit={handleSubmit}>
              <TextFields onChange={handleChange} name={"name"} value={user?.name} error={errors.name} label={"Имя"} />
              <TextFields onChange={handleChange} name={"email"} value={user?.email} error={errors.email} label={"Электронная почта"} />
              <SelectField onChange={handleChange} name={"profession"} value={user?.profession} data={professionsList} label={"Выберите свою профессию"} />
              <RadioFields onChange={handleChange} name={"sex"} value={user?.sex} data={genderOptions} label={"Ваш пол"} />
              <MultiSelectField onChange={handleChange} name={"qualities"} defaultValue={userQualities} data={qualitiesList} label={"Ваши качетсва"} />
              <button className={"btn btn-success"} disabled={!isValid} onClick={handleSubmit}>Save</button>
            </form>
            : <span className={"fs-4 fw-bold ms-2"}>Loading Form...</span>
          }
        </div>
      </div>
    </div>
  );
};

export default EditForm;
