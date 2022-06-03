import React from "react";
import { useProfessions } from "../../hooks/useProfession";
import PropTypes from "prop-types";

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfessions();
  const profession = getProfession(id);
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
