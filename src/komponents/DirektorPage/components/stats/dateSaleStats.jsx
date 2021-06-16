import React, { Component } from "react";
import axios from "axios";

import PieChart from "../charts/pieChart";

class DateSaleStats extends Component {
  state = {
    start_date: "",
    litr: [],
    kg: [],
    dona: [],
  };

  async componentDidMount() {
    this.getChartDataFromServer(this.state.start_date);
    // console.log(this.props.params);
  }
  async getChartDataFromServer(start_date) {
    let response = await axios.get(this.props.url, {
      params: {
        start_date: start_date,
      },
    });
    this.setState({
      litr: response.data["litr"],
      kg: response.data["kg"],
      dona: response.data["dona"],
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this.getChartDataFromServer(this.props.params);
    }
  }
  render() {
    return (
      <div className="chart-box">
        <div className="pie-chart-box">
          <PieChart
            suffix={" Litr"}
            title={"Litr"}
            saleData={this.state.litr}
          />
          <PieChart
            suffix={" Kg"}
            title={"Kilogram"}
            saleData={this.state.kg}
          />
          <PieChart suffix={" ta"} title={"Dona"} saleData={this.state.dona} />
        </div>
      </div>
    );
  }
}

export default DateSaleStats;
