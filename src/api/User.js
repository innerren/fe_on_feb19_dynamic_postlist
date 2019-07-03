import React from "react";
import { getUser } from "./api.js";

class User extends React.Component {
  state = {
    user: null
  };

  subData = user => {
    return (
      <ul className="user-list">
        <li>{user.username}</li>
        <li>{user.name}</li>
        <li>{user.email}</li>
        <li>{`${user.address.city} ${user.address.street}`}</li>
      </ul>
    );
  };

  async componentDidMount() {
    const user = await getUser(this.props.userId);

    this.setState({ user: user });
  }

  render() {
    const user = this.state.user;
    return <div>{user ? this.subData(user) : <h2> Loading... </h2>}</div>;
  }
}

export default User;
