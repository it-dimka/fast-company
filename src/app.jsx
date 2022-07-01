import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./layouts/notFound";
import NavBar from "./components/ui/navBar";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

const App = () => {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <ProtectedRoute path={"/users/:userId?/:edit?"} component={Users} />
          <Route path={"/login/:type?"} component={Login} />
          <Route path={"/logout"} component={LogOut} />
          <Route exact path={"/"} component={Main} />
          <Route path={"/404"} component={NotFound} />
          <Redirect to={"/404"} />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  );
};

export default App;
