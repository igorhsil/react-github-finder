import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import seeds from "../../seeds";
import UserItem from "./UserItem";

function UserResults(props) {
  const [users, useUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // fetch users from github
  const fetchUsers = async () => {
    try {
      // had some problem with github TOKEN limit
      // const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      //   headers: {
      //     Authorization: `Token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      //   },
      // });
      //
      // const data = await res.json();
      // useUsers(data);
      useUsers(seeds);
      setLoading(false);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

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
