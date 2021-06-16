import React, { Component } from "react";
import axios from "axios";
import SettingSalary from "./settingSalary";
import FixedSalary from "./fixedSalary";

class CreatePlan extends Component {
  state = {
    planName: "",
    deadline: "",
    plans: [],
    products: [],
    agents: [],
    product: 0,
    quantity: 0,
    plan: 0,
    agentPlan: 0,
    agent: 0,
    creditial: "",
    creditial1: "",
    creditial2: "",
  };

  componentDidMount() {
    this.getPlans();
    this.getProducts();
    this.getAgent();
  }

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  createPlansUser = (event) => {
    event.preventDefault();
    const url = "/api/plan/plan-list/";
    const { planName, deadline } = this.state;
    axios
      .post(url, {
        name: planName,
        deadline: deadline,
      })
      .then((data) =>
        this.setState((prevState) => ({
          plans: [
            ...prevState.plans,
            {
              ...data.data,
            },
          ],
        }))
      );
    this.setState(
      {
        creditial: "Reja muaffaqiyatli yaratildi!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial: "",
          });
        }, 3000)
    );
  };
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
  handlePlanItem = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCreatingPlanItem = (e) => {
    e.preventDefault();
    let data = [
      {
        product: parseInt(this.state.product),
        quantity: parseInt(this.state.quantity),
        plan: parseInt(this.state.plan),
      },
    ];
    axios.post("/api/plan/plan-item-create/", data);
    this.setState(
      {
        creditial2: "Reja element muaffaqiyatli yaratildi!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial2: "",
          });
        }, 3000)
    );
  };

  createPlans = () => {
    return (
      <>
        <input
          type="text"
          name="planName"
          placeholder="Reja nomi"
          onChange={this.handleInput}
        />
        <span>
          <label htmlFor="">Tugash Sanasi:</label>
          <input type="date" name="deadline" onChange={this.handleInput} />
        </span>
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </>
    );
  };
  createPlanItem = ({ products, plans }) => {
    return (
      <div className="form-item">
        <select
          name="product"
          value={this.state.product}
          onChange={this.handlePlanItem}
        >
          <option value={0}>Mahsulot Tanlang</option>
          {products.map((product) => {
            return <option value={product.id}>{product.name}</option>;
          })}
        </select>
        <input
          name="quantity"
          onChange={this.handlePlanItem}
          value={this.state.quantity}
          type="number"
          placeholder="miqdorini kiriting"
        />
        <select
          onChange={this.handlePlanItem}
          name="plan"
          value={this.state.plan}
        >
          <option value={0}>Reja nomini tanlang</option>
          {plans.map((plan) => {
            return <option value={plan.id}>{plan.name}</option>;
          })}
        </select>
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    );
  };
  handleAgentPlan = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCreatingAgentPlan = (e) => {
    e.preventDefault();
    let data = [
      {
        agent: this.state.agent,
        plan: this.state.agentPlan,
      },
    ];
    axios.post("/api/plan/agent-plan-list/", data);
    this.setState(
      {
        creditial1: "Reja agentga muaffaqiyatli biriktirildi!",
      },
      () =>
        setTimeout(() => {
          this.setState({
            creditial1: "",
          });
        }, 3000)
    );
  };
  setPlansToAgent = ({ plans, agents }) => {
    return (
      <>
        <span>
          <label htmlFor="">Reja:</label>
          <select
            name="agentPlan"
            value={this.state.agentPlan}
            onChange={this.handleAgentPlan}
          >
            <option value={0}>Reja tanlang</option>
            {plans.map((plan) => {
              return <option value={plan.id}>{plan.name}</option>;
            })}
          </select>
        </span>
        <span>
          <label htmlFor="">Agent:</label>
          <select
            name="agent"
            value={this.state.agent}
            onChange={this.handleAgentPlan}
          >
            <option value={0}>Agent tanlang</option>
            {agents.map((agent) => {
              return (
                <option value={agent.id}>
                  {agent.first_name + " " + agent.last_name}
                </option>
              );
            })}
          </select>
        </span>
        <button className="btn btn-primary" type="submit">
          <i className="fas fa-plus"></i>
        </button>
      </>
    );
  };
  render() {
    const { plans, products, agents } = this.state;
    return (
      <>
        <h4 className="hrm-title">KPI Qo’yish</h4>
        <div className="form-box">
          <div className="title">
            <span>Reja Yaratish</span>
            <label className="notification">
              {this.state.planName.length !== 0 ? this.state.creditial : ""}
            </label>
          </div>
          <form onSubmit={this.createPlansUser}>
            <div className="form-item">
              <this.createPlans />
            </div>
            <hr />
          </form>
          <form onSubmit={this.handleCreatingPlanItem}>
            <div className="title">
              <span>Reja elementini yaratish</span>
              <label className="notification">{this.state.creditial2}</label>
            </div>
            <div className="form-item">
              <div className="create-plan-item">
                <this.createPlanItem products={products} plans={plans} />
              </div>
            </div>
          </form>
          <form onSubmit={this.handleCreatingAgentPlan}>
            <hr />
            <div className="title">
              <span>Agentga Reja qo'shish</span>
              <label className="notification">{this.state.creditial1}</label>
            </div>
            <div className="form-item">
              <this.setPlansToAgent plans={plans} agents={agents} />
            </div>
          </form>
        </div>
        <h4 className="hrm-title">Oylik Belgilash</h4>
        <SettingSalary />
        <h4 className="hrm-title">KPI Statusi</h4>
        <FixedSalary />
      </>
    );
  }
}

export default CreatePlan;
