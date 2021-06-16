import axios from "axios";
import React, { Component } from "react";

class ABCTable extends Component {
  state = { start_date: "", categories: [] };
  async componentDidMount() {
    this._makeApiRequest(this.state.start_date);
  }
  async _makeApiRequest(start_date) {
    let response = await axios.get(this.props.url, {
      params: {
        start_date: start_date,
      },
    });
    let a_category = response.data.a_category_data.data;
    let b_category = response.data.b_category_data.data;
    let c_category = response.data.c_category_data.data;
    let categories = this.zip(a_category, b_category, c_category);
    this.setState({
      categories: categories,
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.params !== prevProps.params) {
      this._makeApiRequest(this.props.params);
    }
  }
  zip = (arr, ...arrs) => {
    return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
  };

  render() {
    let count = 0;
    const { categories } = this.state;
    return (
      <div className="abc-table-box">
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center  mb-0">
            <thead>
              <tr>
                <td scope="col">T/R</td>
                <td scope="col">A Kategoriya</td>
                <td scope="col">B Kategoriya</td>
                <td scope="col">C Kategoriya</td>
              </tr>
            </thead>
            <tbody>
              {categories.map((data) => {
                count++;
                return (
                  <tr key={count}>
                    <td>{count}</td>
                    <td scope="col">
                      {data[0] === undefined ? "-" : data[0].product_name}
                    </td>
                    <td scope="col">
                      {data[1] === undefined ? "-" : data[1].product_name}
                    </td>
                    <td scope="col">
                      {data[2] === undefined ? "-" : data[2].product_name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ABCTable;
