import { NextPage } from "next";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../hooks";
import { IData, login, register } from "../store/user/user.action";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    const obj: IData = { email, password };
    dispatch(login(obj));
  };
  const handleRegister = () => {
    const obj: IData = { email, password };
    dispatch(register(obj));
  };
  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Регистрация</button>
      <button onClick={handleLogin}>Логин</button>
    </div>
  );
};

export default Login;
