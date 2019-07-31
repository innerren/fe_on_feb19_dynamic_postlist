import React from "react";
import { getComments } from "./api.js";
import CommentList from "./CommentList";

class Post extends React.Component {
  state = {
    comments: null,
    loaded: false
  };

  async loadComments(postId) {
    const comments = await getComments(postId);
    this.setState(prevstate => {
      return { comments: comments, loaded: !prevstate.loaded };
    });
  }

  render() {
    const post = this.props.post;
    const comments = this.state.comments;
    return (
      <li key={post.id}>
        <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <button
          className="loadComents"
          onClick={() => {
            this.loadComments(post.id);
          }}
        >
          {!this.state.loaded ? "Show comments" : "Hide comments"}
        </button>
        {this.state.loaded ? <CommentList comments={comments} /> : null}
      </li>
    );
  }
}

export default Post;
