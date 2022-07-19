import type { NextPage } from "next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { me, logout, checkAuth } from "../store/user/user.action";

const Home: NextPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(me());
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     dispatch(checkAuth());
  //   }
  // }, []);
  if (error) {
    return <h1>error {error}</h1>;
  }
  if (user) {
    return (
      <>
        <div>Hello {user && user.email}</div>
        <button onClick={() => dispatch(logout())}>logout</button>
      </>
    );
  }
  return <div>Hello</div>;
};

export default Home;
