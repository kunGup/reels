import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
function Feed() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <h1>welcome</h1>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Feed;
