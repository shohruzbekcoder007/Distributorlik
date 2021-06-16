import React, { Component } from "react";
import LineChart from "../charts/lineChart";
import axios from "axios";

class DailyQuantityStats extends Component {
  state = {
    start_date: "",
    end_date: "",
    productGroupList: [],
  };
  componentDidMount = async () => {
    const response = await axios.get(this.props.url, {
      params: {
        start_date: this.state.start_date,
        end_date: this.state.end_date,
      },
    });
    this.setState({ productGroupList: response.data });
  };
  handleDate = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(this.props.url, {
      params: {
        start_date: this.state.start_date,
        end_date: this.state.end_date,
      },
    });
    this.setState({ productGroupList: response.data });
  };

  render() {
    return (
      <div className="chart-box">
        <LineChart
          name={this.props.name}
          title={this.props.title}
          productGroupList={this.state.productGroupList}
          axisY={this.props.axisY}
        />
      </div>
    );
  }
}

export default DailyQuantityStats;
