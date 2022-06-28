import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { getQualitiesLoadingStatus } from "../../../store/qualities";
import { useSelector } from "react-redux";

const QualitiesList = ({ qualities }) => {
  const isLoading = useSelector(getQualitiesLoadingStatus());
  if (isLoading) return <span>Loading Qualities...</span>;
  return (
    <>
      {qualities.map(id => {
        return <Quality key={id} qualityId={id}/>;
      })}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
