import React, { Component } from "react";
import LineChart from "../charts/lineChart";
import axios from "axios";

class DailySaleAgent extends Component {
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

export default DailySaleAgent;
