import React from "react";
import { useHistory } from "react-router-dom";

const ButtonHistoryBack = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };

  return (
    <button className={"btn btn-primary btn-lg"} onClick={handleClick}>
      <i className={"bi bi-caret-left"}></i>
      Назад</button>
  );
};

export default ButtonHistoryBack;
