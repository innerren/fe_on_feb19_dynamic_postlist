import React from "react";
import { getPosts } from "./api.js";
import User from "./User";
import Post from "./Post";

class PostList extends React.Component {
  state = {
    posts: [],
    filtredPosts: [],
    filtr: ""
  };

  async componentDidMount() {
    const posts = await getPosts(this.props.userId);

    this.setState({ posts: posts, filtredPosts: posts });
  }

  handleSubmit = event => {
    const filtr = event.target.value;
    if (event.key === "Enter") {
      event.target.value = "";
    }
    const newPosts = this.filtred(this.state.posts, filtr);
    this.setState(() => {
      return { filtredPosts: newPosts, filtr: filtr };
    });
  };

  filtred = (posts, filtr) => {
    return posts.filter(
      post =>
        post.title.toLowerCase().includes(filtr) ||
        post.body.toLowerCase().includes(filtr)
    );
  };

  list = posts =>
    posts.map(post => {
      const newTitle = post.title.replace(
        new RegExp(this.state.filtr, "g"),
        `<span style="background-color: yellow">${this.state.filtr}</span>`
      );
      const newBody = post.body.replace(
        new RegExp(this.state.filtr, "g"),
        `<span style="background-color: yellow">${this.state.filtr}</span>`
      );
      return (
        <Post
          key={post.id}
          post={{ ...post, title: newTitle, body: newBody }}
        />
      );
    });

  render() {
    const { filtredPosts } = this.state;
    return (
      <div>
        <input
          type="text"
          placeholder="Input filter text"
          name="inputFilter"
          autoFocus=""
          autoComplete="off"
          onChange={this.handleSubmit}
        />
        <div className="main">
          <User userId={this.props.userId} />
          <ul className="post-list">
            {filtredPosts ? this.list(filtredPosts) : <h2> Loading... </h2>}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostList;
