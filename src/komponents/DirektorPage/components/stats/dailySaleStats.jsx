import React, { Component } from "react";
import axios from "axios";
import DailySaleChart from "../charts/dailySaleChart";

class DailySaleStats extends Component {
  state = {
    start_date: "",
    chartData: [],
  };
  componentDidMount = async () => {
    this._makeApiRequest(this.state.start_date);
  };

  async _makeApiRequest(start_data) {
    let cash = [];
    let credit_card = [];
    let money_transfer = [];
    let debt = [];
    const response = await axios.get(this.props.url, {
      params: {
        start_date: start_data,
      },
    });
    response.data.forEach((element) => {
      cash = [
        ...cash,
        {
          date: element.date,
          quantity: element.cash,
        },
      ];
      credit_card = [
        ...credit_card,
        {
          date: element.date,
          quantity: element.credit_card,
        },
      ];
      money_transfer = [
        ...money_transfer,
        {
          date: element.date,
          quantity: element.money_transfer,
        },
      ];
      debt = [
        ...debt,
        {
          date: element.date,
          quantity: element.debt,
        },
      ];
    });

    let dataChart = [
      { name: "cash", data: cash },
      {
        name: "credit_card",
        data: credit_card,
      },
      {
        name: "money_transfer",
        data: money_transfer,
      },
      {
        name: "debt",
        data: debt,
      },
    ];
    this.setState({ chartData: dataChart });
  }
  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this._makeApiRequest(this.props.params);
    }
  }
  render() {
    return (
      <div className="chart-box">
        <DailySaleChart
          name={this.props.name}
          title={this.props.title}
          chartData={this.state.chartData}
          axisY={this.props.axisY}
        />
      </div>
    );
  }
}

export default DailySaleStats;
