import React, { useState } from "react";
import CommentsList from "../common/comments/commentsList";
import api from "../../api";
import { orderBy } from "lodash";
import AddCommentForm from "./addCommentForm";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const { createComment } = useComments();

  // useEffect(() => {
  //   api.comments.fetchCommentsForUser(userId).then(data => setComments(data));
  // }, []);

  const handleRemoveComment = (id) => {
    api.comments.remove(id).then(id => {
      setComments(comments.filter(x => x._id !== id));
    });
  };

  const handleSubmit = (data) => {
    createComment(data);
    // api.comments.add({ ...data, pageId: userId }).then(data => setComments([...comments, data]));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <div className="col-md-8">
      <div className={"card mb-2"}>
        <div className={"card-body"}>
          <AddCommentForm onSubmit={handleSubmit} />
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
