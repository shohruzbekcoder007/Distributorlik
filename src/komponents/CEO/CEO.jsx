import React from "react";
import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";
import BuyProducts from "../DirektorPage/components/buyProducts/buyProducts";
import SellProducts from "../DirektorPage/components/sellProducts/sellProducts";
import ClientStats from "../DirektorPage/components/CRM/clientStats";
import SettingSalary from "../DirektorPage/components/HRM/settingSalary";
import FixedSalary from "../DirektorPage/components/HRM/fixedSalary";
import Register from "../DirektorPage/components/HRM/addingStaff";
import AgentReport from "../DirektorPage/components/HRM/agentReport";
import KPI from "../DirektorPage/components/HRM/KPI";
import Expense from "../DirektorPage/components/Moliyaviy_Resurslar/expense";
import Discount from "../DirektorPage/components/discount/discount";
import Sm_Sidebar from "./components/sidebar/sm-sidebar/sm-sidebar";
import Dashboard from "../DirektorPage/components/dashboard/dashboard";
import _Expense from "../DirektorPage/components/Expense/_expense";
import HRMDashboard from "../DirektorPage/components/HRM/hrmDashboard";
import SubmitExpense from "../DirektorPage/components/submitExpense/submitExpense";

function CEO() {
  let { path, url } = useRouteMatch();
  return (
    <React.StrictMode>
      <BrowserRouter>
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
}

export default CEO;
