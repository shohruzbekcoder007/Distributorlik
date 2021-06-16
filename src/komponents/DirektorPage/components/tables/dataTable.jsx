import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Table from "./table";

class DataTable extends Component {
  state = {
    start_date: "",
    orderList: [],
    limit: 10,
    offset: 0,
    count: 0,
    next: null,
    previous: null,
    term: "",
  };
  componentDidMount = async () => {
    this.getDateFromServer(this.state.start_date);
    // console.log(this.props.params);
  };
  async getDateFromServer(start_date) {
    let response = await axios.get(this.props.url, {
      params: {
        limit: this.state.limit,
        offset: this.state.offset,
        start_date: start_date,
      },
    });
    this.setState({
      orderList: response.data,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this.getDateFromServer(this.props.params);
    }
  }
  handlePagination = async (count) => {
    let offset = this.state.limit * (count - 1);
    let response = await axios.get(this.props.url, {
      params: {
        limit: this.state.limit,
        offset: offset,
      },
    });
    this.setState({
      orderList: response.data,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  handlePages = () => {
    let count = Math.ceil(this.state.count / this.state.limit);
    return Array.from(Array(count), (e, i) => {
      return (
        <li key={i} className="page-item">
          <Link
            className="page-link"
            onClick={() => this.handlePagination(i + 1)}
            to="#"
          >
            {i + 1}
          </Link>
        </li>
      );
    });
  };
  handleNext = async () => {
    let response = await axios.get(this.state.next);
    this.setState({
      orderList: response.data,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  handlePrevious = async () => {
    let response = await axios.get(this.state.previous);
    this.setState({
      orderList: response.data,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  handleSelect = async (e) => {
    let limit = e.target.value;
    this.setState({ limit: limit });
    let response = await axios.get(this.props.url, {
      params: {
        limit: limit,
        offset: this.state.offset,
      },
    });
    this.setState({
      orderList: response.data,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  handleSearch = (e) => {
    let term = e.target.value;
    this.setState({ term: term });
  };
  onSearchSubmit = async (e) => {
    e.preventDefault();
    let response = await axios.get(this.props.url, {
      params: {
        term: this.state.term,
      },
    });
    this.setState({
      orderList: response.data,
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    });
  };
  render() {
    return (
      <div>
        <Table
          name={this.props.name}
          headers={this.props.headers}
          orderList={this.state.orderList}
        />
        <div className="search">
          <select
            name="pagination-limit"
            value={this.state.limit}
            onChange={this.handleSelect}
          >
            <option value={11}>-----</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <form onSubmit={this.onSearchSubmit}>
            <input
              type="search"
              placeholder="Qidirish"
              onChange={this.handleSearch}
            />
          </form>
          <i className="fas fa-search"></i>
        </div>
        <div className="pagination-container">
          <ul className="pagination">
            {this.state.previous === null ? (
              <div></div>
            ) : (
              <li className="page-item">
                <Link
                  className="page-link"
                  to="#"
                  onClick={this.handlePrevious}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
            )}

            {this.handlePages()}
            {this.state.next === null ? (
              <div></div>
            ) : (
              <li className="page-item">
                <Link
                  className="page-link"
                  to="#"
                  onClick={this.handleNext}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default DataTable;
