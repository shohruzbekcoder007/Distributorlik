import React from "react";
import Login from "./komponents/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Roles from "./komponents/Roles";
import "./komponents/DirektorPage/styles/salary-style.css";
import "./komponents/DirektorPage/styles/table-style.css";
import "./komponents/DirektorPage/styles/expense.css";
import "./komponents/DirektorPage/styles/chart.css";
import TasdiqlashOynasi from "./komponents/TasdiqlashOynasi";
import PrintThisComponent from "./komponents/PrintThisComponent";
import Omborchi from "./komponents/Omborchi";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/role">
          <Roles />
        </Route>
      </Switch>
    </Router>
  );
}
