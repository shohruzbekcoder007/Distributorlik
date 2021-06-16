import axios from "axios";
import React, { Component } from "react";
import MultSeriesColumnChart from "../charts/multiSeriesColumnChart";

class MonthlyTurnOver extends Component {
  state = {
    monthlyTurnOverData: [],
  };
  async componentDidMount() {
    let response = await axios.get(this.props.url);
    let sellOrderTotal = [];
    let buyOrderTotal = [];
    let profit = [];

    response.data.forEach((element) => {
      sellOrderTotal = [
        ...sellOrderTotal,
        {
          month: element.month,
          total: element.sell_order_total,
        },
      ];
      buyOrderTotal = [
        ...buyOrderTotal,
        {
          month: element.month,
          total: element.buy_order_total,
        },
      ];
      profit = [
        ...profit,
        {
          month: element.month,
          total: element.profit,
        },
      ];
    });
    let monthlyTurnOverData = [
      {
        name: "Harajatlar",
        data: buyOrderTotal,
      },
      {
        name: "Savdo",
        data: sellOrderTotal,
      },
      {
        name: "Yalpi daromad",
        data: profit,
      },
    ];
    this.setState({
      monthlyTurnOverData: monthlyTurnOverData,
    });
  }
  render() {
    return (
      <MultSeriesColumnChart
        name={this.props.name}
        nameAxisY={this.props.nameAxisY}
        monthlyData={this.state.monthlyTurnOverData}
      />
    );
  }
}

export default MonthlyTurnOver;
