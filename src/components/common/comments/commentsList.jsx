import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentsList = ({ data, onRemove }) => {
  return data.map(comment => <Comment key={comment._id} comment={comment} onRemove={onRemove} />);
};

CommentsList.propTypes = {
  data: PropTypes.array,
  onRemove: PropTypes.func
};

export default CommentsList;
