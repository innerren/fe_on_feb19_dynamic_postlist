import React from "react";
import Coment from "./Coment";

class CommentList extends React.Component {


  list = () =>
    this.props.comments.map(coment => (
      <Coment 
      key={coment.id}
      coment = {coment}
      />
    ));

  render() {
    const comments = this.props.comments;
    return (
      <div className="comments">
        <ul className="comments-list">
          {comments ? this.list(comments) : <h2> Loading... </h2>}
        </ul>
      </div>
    );
  }
}

export default CommentList;
