import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./layouts/notFound";
import NavBar from "./components/ui/navBar";
import EditForm from "./components/ui/editForm";

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={"/"} component={Main} />
        <Route path={"/login/:type?"} component={Login} />
        <Route path={"/users/:userId/edit"} component={EditForm} />
        <Route path={"/users/:userId?"} component={Users} />
        <Route path={"/404"} component={NotFound} />
        <Redirect to={"/404"} />
      </Switch>
    </>
  );
};

export default App;
