import React from "react";
import ReactDOM from "react-dom";
import Login from "./views/Login/Login";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import indexRoutes from "routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

var ExpireDate = localStorage.Skut_expires_at;
var CurrentDate = new Date();
ExpireDate = new Date(ExpireDate);

if (CurrentDate > ExpireDate) {
  localStorage.removeItem("Skut_access_token");
  localStorage.removeItem("Skut_expires_at"); 
}


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      
      {indexRoutes.map((prop, key) => {
          return localStorage.Skut_access_token 
          ? <Route path={prop.path} key={key} component={prop.component} /> : <Redirect to='/login' key={key}/>
           
        
      })}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
