import axios from "axios";
import React, { Component } from "react";
import ColumnChart from "../charts/columnChart";
import ColumnProfitChart from "../charts/columnProfitChart";

class ABCStats extends Component {
  state = {
    start_date: "",
    data: [],
  };
  async componentDidMount() {
    this._makeApiRequest(this.state.start_date);
  }
  async _makeApiRequest(start_date) {
    let response = await axios.get(this.props.url, {
      params: {
        start_date: start_date,
      },
    });
    this.setState({ data: response.data });
  }
  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this._makeApiRequest(this.props.params);
    }
  }
  renderChart() {
    if (this.props.code === "sale") {
      return <ColumnChart name={this.props.name} abcData={this.state.data} />;
    } else if (this.props.code === "net-profit") {
      return (
        <ColumnProfitChart name={this.props.name} abcData={this.state.data} />
      );
    }
  }
  render() {
    return this.renderChart();
  }
}

export default ABCStats;
