import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

function UserSearch(props) {
  const [input, setInput] = useState("");

  const { users, searchUsers } = useContext(GithubContext);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (input === "") {
      alert("enter something");
    } else {
      searchUsers(input);

      setInput("");
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-2 gap-8">
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={input}
                onChange={handleInputChange}
              />
              <button
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
                type="submit"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn-ghost btn-lg">Clear</button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
