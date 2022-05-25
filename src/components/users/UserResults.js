import React, { useEffect } from 'react';

function UserResults(props) {
  // const [users, useUsers] = useState();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      mode: 'no-cors',
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    });

    const data = await res.json();
    console.log('data', data);
  };

  return <div>user results</div>;
}

export default UserResults;
