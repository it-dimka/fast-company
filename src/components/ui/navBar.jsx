import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className={"nav"}>
      <li className={"nav-link"}><Link style={classes.link} to={"/"}>Main</Link></li>
      <li className={"nav-link"}><Link style={classes.link} to={"/login"}>Login</Link></li>
      <li className={"nav-link"}><Link style={classes.link} to={"/users"}>Users</Link></li>
    </ul>
  );
};

const classes = {
  link: {
    textDecoration: "none",
    fontWeight: 500,
    fontSize: 18
  }
};

export default NavBar;
