import React, { useEffect, useState } from "react";
import TextFields from "../common/form/textFields";
import SelectField from "../common/form/selectField";
import { getDataByLabel, getQualitiesByLabel } from "../../utils/formatData";
import RadioFields from "../common/form/Radio";
import { genderOptions } from "../../utils/genderOptions";
import MultiSelectField from "../common/form/multiSelectField";
import { validator } from "../../utils/validator";
import { validatorConfigEditForm } from "../../utils/errors";
import ButtonHistoryBack from "../common/buttonHistoryBack";
import { useDispatch, useSelector } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../store/qualities";
import { getProfessions, getProfessionsLoadingStatus } from "../../store/professions";
import { getCurrentUserData, updateCurrentUserData } from "../../store/users";

const EditForm = () => {
  const currentUser = useSelector(getCurrentUserData());
  const dispatch = useDispatch();
  const [user, setUser] = useState(currentUser);
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(true);
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const qualities = useSelector(getQualities());
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus());
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
    if (!!currentUser && !qualitiesLoading && !professionsLoading) {
      setLoading(false);
    }
  }, [qualities, professions, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(updateCurrentUserData(user));
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
              <TextFields onChange={handleChange} name={"name"} value={user?.name} error={errors.name} label={"??????"} />
              <TextFields onChange={handleChange} name={"email"} value={user?.email} error={errors.email} label={"?????????????????????? ??????????"} />
              <SelectField onChange={handleChange} name={"profession"} value={user?.profession} data={professionsList} label={"???????????????? ???????? ??????????????????"} />
              <RadioFields onChange={handleChange} name={"sex"} value={user?.sex} data={genderOptions} label={"?????? ??????"} />
              <MultiSelectField onChange={handleChange} name={"qualities"} defaultValue={userQualities} data={qualitiesList} label={"???????? ????????????????"} />
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
