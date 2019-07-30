import React from "react";
import { getPosts } from "./api.js";
import User from "./User";
import Post from "./Post";

class PostList extends React.Component {
  state = {
    posts: [],
    filtredPosts: [],
  };

  async componentDidMount() {
    const posts = await getPosts(this.props.userId);

    this.setState({ posts: posts,
                    filtredPosts: posts});
  }

  handleSubmit = event => {
    let filtr = event.target.value;
    if (event.key === "Enter") {
      event.target.value = "";
    }
    let newPosts = this.filtred(this.state.posts, filtr);
      this.setState((prevstate) => {
        if (prevstate.filtredPosts.length !== newPosts.length){
          return {filtredPosts: newPosts}
        }
      }) 
  };

  filtred = (posts,filtr) => {
    return posts.filter(
      post =>
        post.title.toLowerCase().includes(filtr) ||
        post.body.toLowerCase().includes(filtr)
    ).map((post) => {
        const newTitle = post.title.replace(`${filtr}`,`<span style="background-color: yellow">${filtr}</span>`);
        const newBody = post.body.replace(`${filtr}`,`<span style="background-color: yellow">${filtr}</span>`);
        return{...post,
              title: newTitle,
              body: newBody}
    })
  }

  list = posts =>
    posts.map(post => (
      <Post key={post.id} post={post} />
    ));

  render() {
    const {filtredPosts} = this.state;
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
