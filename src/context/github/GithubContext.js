import React, { createContext, useReducer } from "react";
import githubReducer from "./GithubReducers";
import seeds from "../../seeds";

const GithubContext = createContext();

// cuz github token gives me hard time rn
// only using seeds.js file
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
// const GITHUB_SEEDS = seeds;

export const GithubProvider = ({ children }) => {
  // const [users, useUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  // using useReducer instead useState
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // get search results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });
    try {
      // had some problem with github TOKEN limit
      const res = await fetch(`${GITHUB_URL}/search/users?${params}`, {
        // headers: {
        //   Authorization: `Token ${GITHUB_TOKEN}`,
        // },
      });

      const { items } = await res.json();

      dispatch({
        type: "GET_USERS",
        payload: items,
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  // clear users from state
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  // set loading funk
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
