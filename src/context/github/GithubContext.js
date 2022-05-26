import React, { createContext, useReducer } from "react";
import githubReducer from "./GithubReducers";
import seeds from "../../seeds";

const GithubContext = createContext();

// cuz github token gives me hard time rn
// only using seeds.js file
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_SEEDS = seeds;

export const GithubProvider = ({ children }) => {
  // const [users, useUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  // using useReducer instead useState
  const initialState = {
    users: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  console.log("reducer state", state);

  // fetch users from github
  const fetchUsers = async () => {
    try {
      // had some problem with github TOKEN limit
      // const res = await fetch(`${GITHUB_URL}/users`, {
      //   headers: {
      //     Authorization: `Token ${GITHUB_TOKEN}`,
      //   },
      // });
      //
      // const data = await res.json();
      // useUsers(data);

      // using useReducer instead useState
      // useUsers(GITHUB_SEEDS);
      // setLoading(false);

      dispatch({
        type: "GET_USERS",
        payload: GITHUB_SEEDS,
        // payload: data      // if fetch() works
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
