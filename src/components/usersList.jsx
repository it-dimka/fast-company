import React, { useState, useEffect } from "react";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const UsersList = ({ users, ...rest }) => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleProfessionSelect = item => {
    setSelectedProf(item);
  };

  const clearFilter = () => {
    setSelectedProf(undefined);
  };

  const filteredUsers = selectedProf
    ? users.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    : users;
  const count = filteredUsers.length;
  const usersCrop = paginate(filteredUsers, currentPage, pageSize);

  return (
    <div className={"d-flex flex-column"}>
      <div className={"d-flex"}>
        {professions &&
            <div className={"d-flex flex-column p-3"}>
              <GroupList
                items={professions}
                selectedItem={selectedProf}
                onItemSelect={handleProfessionSelect}/>
              <button className={"btn btn-secondary btn-sm m-1"} onClick={clearFilter}>Сброс</button>
            </div>
        }
        <div className={"flex-grow-1"}>
          <SearchStatus length={count}/>
          {count > 0 && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Имя</th>
                  <th scope="col">Качества</th>
                  <th scope="col">Профессия</th>
                  <th scope="col">Встретился, раз</th>
                  <th scope="col">Оценка</th>
                  <th scope="col">Избранное</th>
                  <th scope="col">{}</th>
                </tr>
              </thead>
              <tbody>
                {usersCrop.map((user) => (
                  <User
                    key={user._id}
                    {...user}
                    onToggleBookMark={rest.onToggleBookMark}
                    onDelete={rest.onDelete}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className={"d-flex justify-content-center"}>
        <Pagination
          itemCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default UsersList;
