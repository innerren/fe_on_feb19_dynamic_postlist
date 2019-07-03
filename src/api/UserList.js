import React from "react";
import { getUsers } from "./api.js";


class UserList extends React.Component {
  state = {
    users: null,
  };

  async componentDidMount() {
    const users = await getUsers();

    this.setState({ users: users });
  }

 list = users =>
    users.map(user => (
      <li className="" id={user.id} key={user.id}>
        <div>
          {user.username}
        </div>
        <div>
          <button
            className="loadPosts"
            onClick={() => {
              this.props.loadPosts(user.id);
            }}
          >
            Load User Posts
          </button>
        </div>
      </li>
    ));

  render() {
    const users = this.state.users;
    return (
      <div>
        <ul className="Userlist">
          {users ? this.list(users) : <h2> Loading... </h2>}
        </ul>
      </div>
    );
  }
}

export default UserList;
