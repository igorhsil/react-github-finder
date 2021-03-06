import React, { createContext, useReducer } from "react";
import githubReducer from "./GithubReducers";
import { useParams } from "react-router-dom";
// import seeds from "../../seeds";

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
    user: {},
    repos: [],
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

  // get single user
  const getUser = async (user) => {
    setLoading();

    try {
      const res = await fetch(`${GITHUB_URL}/users/${user}`, {
        // headers: {
        //   Authorization: `Token ${GITHUB_TOKEN}`,
        // },
      });

      if (res.status === 404) {
        window.location = "/notfound";
      } else {
        const data = await res.json();

        dispatch({
          type: "GET_USER",
          payload: data,
        });
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  // get user repos
  const getUserRepos = async (user) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    try {
      const res = await fetch(`${GITHUB_URL}/users/${user}/repos?${params}`, {
        // headers: {
        //   Authorization: `Token ${GITHUB_TOKEN}`,
        // },
      });

      if (res.status === 404) {
        window.location = "/notfound";
      } else {
        const data = await res.json();

        dispatch({
          type: "GET_REPOS",
          payload: data,
        });
      }
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
        user: state.user,
        repos: state.repos,
        searchUsers,
        getUser,
        getUserRepos,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
