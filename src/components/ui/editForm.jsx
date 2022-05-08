import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../api";
import TextFields from "../common/form/textFields";
import SelectField from "../common/form/selectField";
import { getProfessionByLabel, getQualitiesByLabel } from "../../utils/formatData";
import RadioFields from "../common/form/Radio";
import { genderOptions } from "../../utils/genderOptions";
import MultiSelectField from "../common/form/multiSelectField";

const EditForm = () => {
  const { userId } = useParams();
  const [user, setUser] = useState();
  const [professions, setProfession] = useState();
  const [qualities, setQualities] = useState([]);
  const history = useHistory();

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
    api.users.getById(userId).then(data => setUser(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.users.update(userId, user).then();
    history.replace(`/users/${userId}`);
  };

  const handleChange = (target) => {
    if (target.name === "profession") {
      const _id = target.value;
      const name = professions?.find(item => item.value === _id).label;
      setUser(prevState => ({ ...prevState, profession: { _id, name } }));
    } else if (target.name === "qualities") {
      const qualities = target.value.map(item => {
        return { name: item.label, _id: item.value, color: item.color };
      });
      setUser(prevState => ({ ...prevState, qualities }));
    } else {
      setUser(prevState => ({ ...prevState, [target.name]: target.value }));
    }
  };

  const userQualities = user?.qualities.map(item => {
    return { label: item.name, value: item._id, color: item.color };
  });

  return (
    <div className={"container mt-4"}>
      <div className={"row"}>
        <div className={"col-md-6 offset-md-3 shadow p-4"}>
          {user
            ? <form onSubmit={handleSubmit}>
              <TextFields onChange={handleChange} name={"name"} value={user?.name} label={"Имя"} />
              <TextFields onChange={handleChange} name={"email"} value={user?.email} label={"Электронная почта"} />
              <SelectField onChange={handleChange} name={"profession"} value={user?.profession._id} data={professions} label={"Выберите свою профессию"} />
              <RadioFields onChange={handleChange} name={"sex"} value={user?.sex} data={genderOptions} label={"Ваш пол"} />
              <MultiSelectField onChange={handleChange} name={"qualities"} defaultValue={userQualities} data={qualities} label={"Ваши качетсва"} />
              <button className={"btn btn-success"} onClick={handleSubmit}>Save</button>
            </form>
            : <span className={"fs-4 fw-bold ms-2"}>Loading Form...</span>
          }
        </div>
      </div>
    </div>
  );
};

export default EditForm;
