import React, { useContext, useEffect } from "react";
import Loader from "../layout/Loader";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  const { users, loading, fetchUsers } = useContext(GithubContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (!loading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users && users.map((user) => <UserItem user={user} key={user.id} />)}{" "}
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default UserResults;
