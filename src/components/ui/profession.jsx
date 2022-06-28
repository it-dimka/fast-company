import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus());
  const profession = useSelector(getProfessionById(id));
  if (!isLoading) {
    return (
      <p>{profession.name}</p>
    );
  }
  return "Loading...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
