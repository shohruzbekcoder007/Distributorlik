import React from "react"; //kassir
import NewClients from "./Cashier/Clients/AddClient/NewClients";
import AddClient from "./Cashier/Clients/AddClient/AddClients";
import AddProvider from "../AddProvider/AddProvider";
import ClientsList from "./Cashier/Clients/ClientsList";
import ProvidersList from "./Cashier/Providers/ProvidersList";
import SellOrderPaymentList from "./Cashier/Clients/SellOrderPaymentList";
import BuyOrderPaymentList from "./Cashier/Providers/BuyOrderPaymentList";
import { BrowserRouter, Switch, Route, useRouteMatch } from "react-router-dom";
import Sm_Sidebar from "./sidebar/sm-sidebar/sm-sidebar";
import Expense from "./Cashier/Moliyaviy_Resurslar/expense";
import Salary from "./Cashier/Moliyaviy_Resurslar/salary";
import "./Cashier/main.css";
import "../DirektorPage/styles/table-style.css";
import Header from "../Header"

function CashierPage() {
  let { path, url } = useRouteMatch();

  return (
    <>
      <React.StrictMode>
        <BrowserRouter>
          <Sm_Sidebar url={url} />
          <div className="main-content-box" style={{ padding: "20px" }}> 
            <Switch>
              <Route exact path={`${path}/`}> 
                  <Header search={true} rolName="Kassir"/> <ClientsList/>
              </Route>
              <Route path={`${path}/provider_list`}>
                  <Header search={true} rolName="Kassir"/> <ProvidersList/> 
              </Route>
              <Route path={`${path}/add_clinet`}> 
                  <Header search={true} plus={true} rolName="Kassir"/><AddClient/>
              </Route>
              <Route path={`${path}/add_provider`}> 
                  <Header search={true} plus={true} rolName="Kassir"/> <AddProvider/> 
              </Route>
              <Route path={`${path}/new_clients`}> 
                  <Header search={true} rolName="Kassir"/> <NewClients/>
              </Route>
              <Route path={`${path}/sell_order_list`}>
                  <Header search={true} rolName="Kassir"/> <SellOrderPaymentList/> 
              </Route>
              <Route path={`${path}/buy_order_list`}> 
                  <Header search={true} rolName="Kassir"/> <BuyOrderPaymentList/> 
              </Route>
              <Route path={`${path}/add_expence`}> 
                  <Header search={true} rolName="Kassir"/> <Expense/> 
              </Route>
              <Route path={`${path}/add_salary`}> 
                  <Header search={true} rolName="Kassir"/> <Salary/>
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}

export default CashierPage;
