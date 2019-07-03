import React from "react";
import { getPosts } from "./api.js";
import User from "./User";
import Post from "./Post";

class PostList extends React.Component {
  state = {
    posts: [],
    filtr: ""
  };

  async componentDidMount() {
    const posts = await getPosts(this.props.userId);

    this.setState({ posts: posts });
  }

  handleSubmit = event => {
    let task = this.refs.textFilter.value;
    this.setState({ filtr: task });
    this.refs.textFilter.value = "";
    event.preventDefault();
  };

  setFilter = event => {
    if (event.key === "Enter") {
      let task = event.target.value;
      event.target.value = "";
      this.setState({ filtr: task });
    }
  };

  list = posts =>
    posts.map(post => (
      <Post key={post.id} post={post} filtr={this.state.filtr} />
    ));

  render() {
    const posts = this.state.posts;
    const filtred = posts.filter(
      post =>
        post.title.indexOf(this.state.filtr) !== -1 ||
        post.body.indexOf(this.state.filtr) !== -1
    );
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Input filter text"
            name="inputFilter"
            autoFocus=""
            autoComplete="off"
            ref={"textFilter"}
          />
        </form>
        {this.state.filtr !== "" ? (
          <div>{`You find posts with: ${this.state.filtr} `}</div>
        ) : null}
        <div className="main">
          <User userId={this.props.userId} />
          <ul className="post-list">
            {posts ? this.list(filtred) : <h2> Loading... </h2>}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostList;
