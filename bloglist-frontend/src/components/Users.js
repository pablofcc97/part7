import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const usersStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };
  // const tableStyle = {
  //   display:'grid',
  //   gridTemplateColumns:'1fr',
  //   maxWidth:'250px'
  // }
  // const rowStyle = {
  //   display:'grid',
  //   gridTemplateColumns:'1fr .4fr',
  //   margin: '10px 0 0'
  // }

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);
  //const hidden = { display:'none', }

  return (
    <div style={usersStyle} className="users">
      <h2>Users</h2>
      <table className="usersTable">
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => {
            return (
              <tr key={i}>
                <td>
                  <Link to={`/users/${u.id}`}>{u.name}</Link>
                </td>
                <td>{u.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
