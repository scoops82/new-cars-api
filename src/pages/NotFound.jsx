import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h1>Page not Found</h1>
      <Link to="/">Back to home page</Link>
    </>
  );
}

export default NotFound;
