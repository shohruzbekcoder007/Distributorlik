import React, { Component } from "react";
import axios from "axios";

import BarChart from "../charts/barChart";

class DateQuantityStats extends Component {
  state = {
    start_date: "",
    end_date: "",
    groupedDateProductOrders: [],
  };

  componentDidMount = async () => {
    let response = await axios.get(this.props.url, {
      params: {
        start_date: this.state.start_date,
        end_date: this.state.end_date,
      },
    });
    this.setState({
      groupedDateProductOrders: response.data,
    });
  };

  handleDate = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.get(this.props.url, {
      params: {
        start_date: this.state.start_date,
        end_date: this.state.end_date,
      },
    });
    this.setState({
      groupedDateProductOrders: response.data,
    });
  };
  render() {
    return (
      <div className="chart-box">
        {/* <form onSubmit={this.handleSubmit} className="chart-header">
          <div className="main-section">
            <div className="input-box">
              <div className="custom-input">
                <label>Boshlanish sanasi</label>
                <input
                  className="form-control"
                  type="date"
                  name="start_date"
                  onChange={this.handleDate}
                  value={this.state.start_date}
                  placeholder="...dan"
                ></input>
              </div>
              <div className="custom-input">
                <label>Tugash sanasi</label>
                <input
                  className="form-control"
                  type="date"
                  name="end_date"
                  onChange={this.handleDate}
                  value={this.state.end_date}
                  placeholder="...gacha"
                ></input>
              </div>
              <button className="btn btn-primary custom-button" type="submit">
                Tasdiqlash
              </button>
            </div>
          </div>
        </form> */}
        <BarChart
          label={this.props.label}
          title={this.props.title}
          groupedDateProductOrders={this.state.groupedDateProductOrders}
          axisY={this.props.axisY}
        />
      </div>
    );
  }
}

export default DateQuantityStats;
