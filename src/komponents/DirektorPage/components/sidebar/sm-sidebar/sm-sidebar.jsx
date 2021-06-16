import React, { Component } from "react";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import Logo from "../../../image/logo.png";
import "./style/sm-sidebar.css";

class Sm_Sidebar extends Component {
  state = {
    active: "",
  };
  AddActiveClass = (e) => {
    this.setState({ active: e });
  };

  render() {
    return (
      <>
        <div className="nav-top nav">
          <div className="logo">
            <span>
              <img src={Logo} alt="Logo" />
            </span>
          </div>
          <div className="log-out">
            <a exact href="/">
              <i className="fas fa-sign-out-alt"></i>
            </a>
          </div>
        </div>
        <div className="sm-sidebar-box">
          <div className="sm-sidebar-link">
            <ul>
              <li
                className={
                  this.state.active === "/role/dashboard" ? "active-link" : ""
                }
              >
                <i className="fas fa-home"></i>
                <span>Dashboard</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/dashboard"
                    onClick={this.AddActiveClass.bind(this, "/role/dashboard")}
                  >
                    Dashboard
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/buy_products"
                    ? "active-link"
                    : ""
                }
              >
                <i className="fas fa-warehouse"></i>
                <span>Omborxona</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/buy_products"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/role/buy_products"
                    )}
                  >
                    Ombor Menejment
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/sell_products"
                    ? "active-link"
                    : ""
                }
              >
                <i className="fas fa-poll"></i>
                <span>Mahsulotlarni Boshqarish</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/sell_products"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/role/sell_products"
                    )}
                  >
                    Mahsulotlar Boshqarish
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/cilent_stats"
                    ? "active-link"
                    : ""
                }
              >
                <i className="far fa-user"></i>
                <span>CRM</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/cilent_stats"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/role/cilent_stats"
                    )}
                  >
                    CRM
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/moliya" ? "active-link" : ""
                }
              >
                <i className="fas fa-hand-holding-usd"></i>
                <span> Moliya</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/_expense"
                    onClick={this.AddActiveClass.bind(this, "/role/moliya")}
                  >
                    Xarajatlar
                  </NavLink>
                  <NavLink
                    exact
                    to="/role/submite_expense"
                    onClick={this.AddActiveClass.bind(this, "/role/moliya")}
                  >
                    Tasdiqlash
                  </NavLink>
                  <NavLink
                    exact
                    to="/role/discount"
                    onClick={this.AddActiveClass.bind(this, "/role/moliya")}
                  >
                    Chegirmalar
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/hrm" ? "active-link" : ""
                }
              >
                <i className="fas fa-list"></i>
                <span> HRM</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/hrm_dashboard"
                    onClick={this.AddActiveClass.bind(this, "/role/hrm")}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                    exact
                    to="/role/kpi"
                    onClick={this.AddActiveClass.bind(this, "/role/hrm")}
                  >
                    KPI
                  </NavLink>
                  <NavLink
                    exact
                    to="/role/staff"
                    onClick={this.AddActiveClass.bind(this, "/role/hrm")}
                  >
                    Xodimlar
                  </NavLink>
                  <NavLink
                    exact
                    to="/role/image_report"
                    onClick={this.AddActiveClass.bind(this, "/role/hrm")}
                  >
                    Agentlar hisoboti
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Sm_Sidebar;
