import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./layouts/notFound";

const App = () => {
  return (
    <>
      <ul className={"nav"}>
        <li className={"nav-link"}><Link style={classes.link} to={"/"}>Main</Link></li>
        <li className={"nav-link"}><Link style={classes.link} to={"/login"}>Login</Link></li>
        <li className={"nav-link"}><Link style={classes.link} to={"/users"}>Users</Link></li>
      </ul>
      <Switch>
        <Route exact path={"/"} component={Main} />
        <Route path={"/login"} component={Login} />
        <Route path={"/users/:userId?"} component={Users} />
        <Route path={"/404"} component={NotFound} />
        <Redirect to={"/404"} />
      </Switch>
    </>
  );
};

const classes = {
  link: {
    textDecoration: "none",
    fontWeight: 500,
    fontSize: 18
  }
};

export default App;
