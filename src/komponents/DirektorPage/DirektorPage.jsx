import React, { Component } from "react";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import BuyProducts from "./components/buyProducts/buyProducts";
import SellProducts from "./components/sellProducts/sellProducts";
import ClientStats from "./components/CRM/clientStats";
import SettingSalary from "./components/HRM/settingSalary";
import FixedSalary from "./components/HRM/fixedSalary";
import Register from "./components/HRM/addingStaff";
import AgentReport from "./components/HRM/agentReport";
import KPI from "./components/HRM/KPI";
import Expense from "./components/Moliyaviy_Resurslar/expense";
import Discount from "./components/discount/discount";
import Sm_Sidebar from "./components/sidebar/sm-sidebar/sm-sidebar";
import Dashboard from "./components/dashboard/dashboard";
import _Expense from "./components/Expense/_expense";
import HRMDashboard from "./components/HRM/hrmDashboard";
import SubmitExpense from "./components/submitExpense/submitExpense";

function DirektorPage() {
  let { path, url } = useRouteMatch();

  return (
    <React.StrictMode>
      <BrowserRouter>
        {/* <Sidebar url={url} /> */}
        <Sm_Sidebar url={url} />
        <div className="main-content-box">
          <Switch>
            <Route exact path={`${path}/`} component={Dashboard} />
            <Route path={`${path}/dashboard`} component={Dashboard} />
            <Route path={`${path}/buy_products`} component={BuyProducts} />
            <Route path={`${path}/sell_products`} component={SellProducts} />
            <Route path={`${path}/hrm_dashboard`} component={HRMDashboard} />
            <Route path={`${path}/cilent_stats`} component={ClientStats} />
            <Route path={`${path}/_expense`} component={_Expense} />
            <Route path={`${path}/expense`} component={Expense} />
            <Route path={`${path}/discount`} component={Discount} />
            <Route path={`${path}/kpi`} component={KPI} />
            <Route path={`${path}/staff`} component={Register} />
            <Route path={`${path}/monthly`} component={SettingSalary} />
            <Route path={`${path}/fixed_monthly`} component={FixedSalary} />
            <Route path={`${path}/image_report`} component={AgentReport} />
            <Route path={`${path}/submite_expense`} component={SubmitExpense} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
  // }
}

export default DirektorPage;
