import React, { Component } from "react";
import axios from "axios";
import FixedSalary from "./fixedSalary";
import PageMap from "../page-road-map/page-map";

class HRMDashboard extends Component {
  state = {
    agents: [],
    product: 0,
    quantity: 0,
    plan: 0,
    agentPlan: 0,
    agent: 0,
    creditial: "",
    creditial1: "",
    start_date: "",
  };

  componentDidMount() {
    this.getAgent();
  }
  getPlans = () => {
    const url = "/api/plan/plan-list/";
    axios(url).then((res) => this.setState({ plans: res.data }));
  };

  getProducts = () => {
    const url = "/api/product/product-list/";
    axios(url).then((res) => this.setState({ products: res.data.products }));
  };
  getAgent = () => {
    const url = "/api/user/agent-list/";
    axios(url).then((res) => this.setState({ agents: res.data }));
  };
  render() {
    return (
      <>
        <h3>Dashboard</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        ></div>
        <FixedSalary params={this.state.start_date} />
      </>
    );
  }
}

export default HRMDashboard;
