import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./layouts/notFound";
import NavBar from "./components/ui/navBar";
import EditForm from "./components/ui/editForm";
import ProfessionProvider from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";

const App = () => {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <QualitiesProvider>
          <Switch>
            <Route exact path={"/"} component={Main} />
            <Route path={"/login/:type?"} component={Login} />
            <Route path={"/users/:userId/edit"} component={EditForm} />
            <Route path={"/users/:userId?"} component={Users} />
            <Route path={"/404"} component={NotFound} />
            <Redirect to={"/404"} />
          </Switch>
        </QualitiesProvider>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
};

export default App;
