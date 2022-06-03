import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import TextFields from "../../common/form/textFields";
import { useUser } from "../../../hooks/useUser";
import { useProfessions } from "../../../hooks/useProfession";

const UsersListPage = () => {
  const pageSize = 8;
  const { users } = useUser();
  const { professions } = useProfessions();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleDelete = (userId) => {
    // setUsers((prevState) => prevState?.filter((user) => user._id !== userId));\
    console.log(userId);
  };

  const handleToggleBookMark = (id) => {
    // setUsers(
    //   users?.map((user) => {
    //     if (user._id === id) {
    //       user.bookmark = !user.bookmark;
    //     }
    //     return user;
    //   })
    // );
    console.log(id);
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

  const handleSearch = (target) => {
    setSearch(target.value);
    clearFilter();
  };

  if (users) {
    const searchUsers = users?.filter(user => user.name.toLowerCase().includes(search));
    const filteredUsers = selectedProf
      ? users?.filter(user => user.profession === selectedProf?._id)
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

export default UsersListPage;
