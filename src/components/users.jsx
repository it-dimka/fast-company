import React, {useState} from "react";
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(prevState => prevState.filter(user => user._id !== userId));
  };

  const renderPhrase = (number) => {
    if (number === 0) {
      return <h1><span className="badge bg-danger ms-1">Никто с тобой не тусанет</span></h1>;
    }
    let string = 'человек тусанет';
    if (number === 2 || number === 3 || number === 4) {
      string = 'человека тусанут';
    }
    return <h1><span className="badge bg-primary ms-1">{`${number} ${string} с тобой сегодня`}</span></h1>;
  };

  const renderQualities = (item) => {
    const style = `badge bg-${item.color} me-1`;
    return <span key={item._id} className={style}>{item.name}</span>;
  };

  return (
      <>
        {renderPhrase(users.length)}
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.qualities.map(item => renderQualities(item))}</td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}/5</td>
                <td>
                  <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </>
  );
};

export default Users;
