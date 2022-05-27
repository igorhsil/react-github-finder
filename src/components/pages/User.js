import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import GithubContext from "../../context/github/GithubContext";

function User(props) {
  const { getUser, user, loading } = useContext(GithubContext);

  const params = useParams();

  useEffect(() => {
    getUser(params.userLogin);
  }, []);

  return <div>{user.login}</div>;
}

export default User;
