import React from "react";


import { Route, Switch } from "react-router-dom";

import App from './App';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import ExcelPage from "./components/ExcelPage";
import Userslist from "./components/Userslist";
import Home from './Home';
export default function Routelist() {
 
  return (
    <div >
  
      <Switch>
      <Route exact from="/" render={() => <App/>} />
        <Route exact from="/home" render={() => <Home />} /> 
        <Route exact from="/login" render={() => <Login />} /> 
        <Route exact from="/reg" render={() => <Register />} /> 
        <Route exact from="/updateprofil" render={() => <ExcelPage/>} /> 
        <Route exact from="/userslist" render={() => <Userslist/>} /> 
      </Switch>
    </div>
  );
}