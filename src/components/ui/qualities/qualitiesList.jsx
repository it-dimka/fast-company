import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { getQualitiesLoadingStatus, loadQualitiesList } from "../../../store/qualities";
import { useDispatch, useSelector } from "react-redux";

const QualitiesList = ({ qualities }) => {
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

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
