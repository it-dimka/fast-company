import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";
import TextFields from "./textFields";

const UsersList = () => {
  const pageSize = 8;
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleDelete = (userId) => {
    setUsers((prevState) => prevState?.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users?.map((user) => {
        if (user._id === id) {
          user.bookmark = !user.bookmark;
        }
        return user;
      })
    );
  };

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
    setSearch("");
  };

  const clearFilter = () => {
    setSelectedProf(undefined);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearch = ({ target }) => {
    setSearch(target.value);
    clearFilter();
  };

  if (users) {
    const searchUsers = users?.filter(user => user.name.toLowerCase().includes(search));
    const filteredUsers = selectedProf
      ? users?.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : users;
    const count = search ? searchUsers.length : filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(search ? searchUsers : sortedUsers, currentPage, pageSize);

    return (
      <div className={"d-flex flex-column me-3"}>
        <div className={"d-flex"}>
          {professions &&
            <div className={"d-flex flex-column p-3"}>
              <GroupList items={professions} selectedItem={selectedProf} onItemSelect={handleProfessionSelect}/>
              <button className={"btn btn-secondary btn-sm m-1"} onClick={clearFilter}>Сброс</button>
            </div>
          }
          <div className={"flex-grow-1"}>
            <SearchStatus length={count}/>
            <TextFields classes={"mb-2"} cleanable placeholder={"Search..."}
              onChange={handleSearch} name={"search"} value={search}
            />
            {count > 0 && (
              <UsersTable users={usersCrop} selectedSort={sortBy} onSort={handleSort} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark} />
            )}
          </div>
        </div>
        <div className={"d-flex justify-content-center"}>
          <Pagination itemCount={count} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange}
            onNextPage={handleNextPage} onPrevPage={handlePrevPage}
          />
        </div>
      </div>
    );
  }
  return <span className={"fs-4 fw-bold ms-2"}>IsLoading...</span>;
};

export default UsersList;
