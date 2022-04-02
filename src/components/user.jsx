import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => {
  return (
      <tr>
        <td>{props.name}</td>
        <td>{props.qualities.map(item => <Qualitie key={item._id}  {...item} />)}</td>
        <td>{props.profession.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}/5</td>
        <td><Bookmark status={props.bookmark} id={props._id} onToggleBookMark={props.onToggleBookMark}/></td>
        <td>
          <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => props.onDelete(props._id)}
          >
            Delete
          </button>
        </td>
      </tr>

  )
}

export default User
