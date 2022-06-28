import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import NotFound from "./layouts/notFound";
import NavBar from "./components/ui/navBar";
import ProfessionProvider from "./hooks/useProfession";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualitiesList());
  }, []);

  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <Switch>
            <ProtectedRoute path={"/users/:userId?/:edit?"} component={Users} />
            <Route path={"/login/:type?"} component={Login} />
            <Route path={"/logout"} component={LogOut} />
            <Route exact path={"/"} component={Main} />
            <Route path={"/404"} component={NotFound} />
            <Redirect to={"/404"} />
          </Switch>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};

export default App;
