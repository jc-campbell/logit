import React from "react";
import { Link } from "react-router-dom";

const AppBar = () => {
  return <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" href="/" >Logit</Link>
    </div>
  </nav>
}

export default AppBar;