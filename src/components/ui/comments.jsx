import React, { useEffect, useState } from "react";
import CommentsList from "../common/comments/commentsList";
import api from "../../api";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import AddCommentForm from "./addCommentForm";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then(data => setComments(data));
  }, []);

  const handleRemoveComment = (id) => {
    api.comments.remove(id).then(id => {
      setComments(comments.filter(x => x._id !== id));
    });
  };

  const handleAddCommentFormSubmit = (data) => {
    api.comments.add({ ...data, pageId: userId }).then(data => setComments([...comments, data]));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <div className="col-md-8">
      <div className={"card mb-2"}>
        <div className={"card-body"}>
          <AddCommentForm onSubmit={handleAddCommentFormSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr/>
            <CommentsList data={sortedComments} onRemove={handleRemoveComment} />
          </div>
        </div>

      )}
    </div>
  );
};

export default Comments;
