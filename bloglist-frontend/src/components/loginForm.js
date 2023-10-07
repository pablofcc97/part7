import { useState } from "react";
import { TextField, Button } from "@mui/material";
//
import { useDispatch } from "react-redux";
import { handleLogin } from "../reducers/loginReducer";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();
    dispatch(handleLogin({ username: userName, password }));
    setUserName("");
    setPassword("");
  };
  return (
    <form onSubmit={login} className="form--login">
      <div>
        <TextField 
          type="text"
          value={userName}
          name="Username"
          onChange={({ target }) => setUserName(target.value)}
          label="username"
          />
      </div>
      <div>
        <TextField 
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          label="password"
          />
      </div>
      <Button type="submit" variant="contained" className="loginInput--submit">
        login
      </Button>
    </form>
  );
};

export default LoginForm;
