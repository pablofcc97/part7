//import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
//import { initializeUsers } from '../reducers/userReducer'
import { useParams } from "react-router-dom";

const User = () => {
  //const dispatch = useDispatch()

  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));
  if (!user) {
    return null;
  }

  const usersStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  return (
    <div style={usersStyle} className="users">
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((b, i) => (
          <li key={i}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
