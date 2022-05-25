import React from "react";
import UserResults from "../users/UserResults";

function Home(props) {
  return (
    <div>
      <h1 className="text-6xl">
        {/*  Serach Component  */}
        <UserResults />
      </h1>
    </div>
  );
}

export default Home;
