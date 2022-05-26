import React, { Fragment } from "react";
import UserResults from "../users/UserResults";
import UserSearch from "../users/UserSearch";

function Home(props) {
  return (
    <Fragment>
      <UserSearch />
      <UserResults />
    </Fragment>
  );
}

export default Home;
