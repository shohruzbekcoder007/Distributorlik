import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./style/kassir-sm-sidebar.css";

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
        <div className="sm-sidebar-box kassir-sidebar">
          <div className="nav_plus"></div>
          <div className="sm-sidebar-link">
            <ul>
              <li
                className={this.state.active === "/role" ? "active-link" : ""}
              >
                <i class="fas fa-list-ul"></i>
                <span>Mijozlar ro'yxati</span>

                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role"
                    onClick={this.AddActiveClass.bind(this, "/role")}
                  >
                    Mijozlar ro'yxati
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/sell_order_list"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-money-bill-wave"></i>
                <span>To'lovlar ro'yxati</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/sell_order_list"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/role/sell_order_list"
                    )}
                  >
                    To'lovlar ro'yxati
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/provider_list"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-list"></i>
                <span>Taminotchilar ro'yxati</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/provider_list"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/role/provider_list"
                    )}
                  >
                    Taminotchilar ro'yxati
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/buy_order_list"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-money-check-alt"></i>
                <span>To'langanlar ro'yxati</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/buy_order_list"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/role/buy_order_list"
                    )}
                  >
                    To'langanlar ro'yxati
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/add_clinet" ? "active-link" : ""
                }
              >
                <i class="fas fa-user-plus"></i>
                <span>Mijozlar qo'shish</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/add_clinet"
                    onClick={this.AddActiveClass.bind(this, "/role/add_clinet")}
                  >
                    Mijoz qo'shish
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/add_provider"
                    ? "active-link"
                    : ""
                }
              >
                <i class="fas fa-user-plus"></i>
                <span>Taminotchi qo'shish</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/add_provider"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/role/add_provider"
                    )}
                  >
                    Taminotchi qo'shish
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/new_clients" ? "active-link" : ""
                }
              >
                <i class="fas fa-users"></i>
                <span>Yangi Mijozlar</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/new_clients"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/role/new_clients"
                    )}
                  >
                    Yangi Mijozlar
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/add_expence" ? "active-link" : ""
                }
              >
                <i class="fas fa-cart-plus"></i>
                <span>Xarajatlar qo'shish</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/add_expence"
                    onClick={this.AddActiveClass.bind(
                      this,
                      "/role/add_expence"
                    )}
                  >
                    Xarajatlar qo'shish
                  </NavLink>
                </div>
              </li>
              <li
                className={
                  this.state.active === "/role/add_salary" ? "active-link" : ""
                }
              >
                <i class="fas fa-shopping-cart"></i>
                <span>Oyliklar qo'shish</span>
                <div className="sub-menu">
                  <NavLink
                    exact
                    to="/role/add_salary"
                    onClick={this.AddActiveClass.bind(this, "/role/add_salary")}
                  >
                    Oyliklar qo'shish
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
