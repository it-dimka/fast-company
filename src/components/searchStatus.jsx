import React from "react";

const SearchStatus = ({length}) => {

  if (length === 0) {
    return <h1><span className="badge bg-danger ms-1">Никто с тобой не тусанет</span></h1>;
  }

  let string = 'человек тусанет';
  if (length === 2 || length === 3 || length === 4) {
    string = 'человека тусанут';
  }

  return <h1><span className="badge bg-primary ms-1">{`${length} ${string} с тобой сегодня`}</span></h1>;
};

export default SearchStatus;
