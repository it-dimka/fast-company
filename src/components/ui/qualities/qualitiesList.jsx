import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ data }) => {
  const { getQuality } = useQualities();
  return (
    <>
      {data.map(id => {
        const userQuality = getQuality(id);
        return <Quality key={id} {...userQuality} />;
      })}
    </>
  );
};

QualitiesList.propTypes = {
  data: PropTypes.array
};

export default QualitiesList;
