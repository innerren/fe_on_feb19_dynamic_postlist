import React from "react";
import "./App.css";
import UserList from "./api/UserList";
import PostList from "./api/PostList";

class App extends React.Component {
  state = {
    userId: null
  };

  loadPosts = id => this.setState({ userId: id });

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <UserList loadPosts={this.loadPosts} />
        </header>
        <div className="main">
          {this.state.userId ? (
            <PostList key={this.state.userId} userId={this.state.userId} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
