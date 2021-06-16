import React, { Component } from "react";
import axios from "axios";
import DataTable from "../tables/dataTable";
import PageMap from "../page-road-map/page-map";
import FilterByTime from "../CalendarFilter/filterByTime";
import ABCStats from "../stats/abcStats";
import ABCTable from "./abcTable";

class SellProducts extends Component {
  state = {
    ABCProfit: [],
    ABCSale: [],
    start_date:
      new Date().getFullYear() +
      "-" +
      parseInt(new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
  };
  headers = [
    "T/R",
    "Mijoz",
    "Agent",
    "Kategoriya",
    "Mahsulot",
    "Xolati",
    "Miqdori",
    "Narxi",
    "Qiymati",
    "Debt",
    "Kirim kuni",
  ];
  async componentDidMount() {
    this.getNetProfitABC();
    this.getSaleABC();
  }
  getNetProfitABC = async () => {
    const url = "/api/report/net-profit-abc-analysis/";
    await axios(url).then((response) =>
      this.setState({ ABCProfit: response.data })
    );
  };
  getSaleABC = async () => {
    const url = "/api/report/sale-abc-analysis/";
    await axios(url).then((response) =>
      this.setState({ ABCSale: response.data })
    );
  };

  onSetDay = async (start_date) => {
    await this.setState({
      start_date,
    });
  };

  onSetWeek = async (start_date) => {
    await this.setState({
      start_date,
    });
  };
  onSetMonth = async (start_date) => {
    await this.setState({
      start_date,
    });
  };
  onFilterDateSubmit = async (startDate) => {
    await this.setState({
      start_date: startDate,
    });
  };

  render() {
    const name = "sellProduct";
    if (typeof this.state.ABCSale && this.state.ABCProfit !== undefined) {
      return (
        <div>
          <div className="page-header">
            <PageMap page_name={"Mahsulotlarni boshqarish"} />
            <FilterByTime
              onFilterDateSubmit={this.onFilterDateSubmit}
              onSetDay={this.onSetDay}
              onSetWeek={this.onSetWeek}
              onSetMonth={this.onSetMonth}
            />
          </div>
          <DataTable
            name={name}
            headers={this.headers}
            url={"/api/order/sell-order-list/"}
            params={this.state.start_date}
          />
          <div className="graphics-box">
            <div className="graphics">
              <div className="column-graphics">
                <div className="graphics-item">
                  <ABCStats
                    name={"ABC Savdo Tahlili"}
                    code={"sale"}
                    url={"/api/report/sale-abc-analysis/"}
                    params={this.state.start_date}
                  />
                </div>
                <div className="graphics-item">
                  <ABCStats
                    name={"ABC Yalpi Daromad Tahlili"}
                    code={"net-profit"}
                    url={"/api/report/net-profit-abc-analysis/"}
                    params={this.state.start_date}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="total-datas control-product">
            <div className="control-product-item">
              <div className="total-item">
                <span>A Umumiy Savdo: </span>
                {this.state.ABCSale.a_category_data === undefined
                  ? ""
                  : this.state.ABCSale.a_category_data.total_price.toFixed(2) +
                    " So'm"}
              </div>
              <div className="total-item">
                <span>B Umumiy Savdo: </span>
                {this.state.ABCSale.b_category_data === undefined
                  ? ""
                  : this.state.ABCSale.b_category_data.total_price.toFixed(2) +
                    " So'm"}
              </div>
              <div className="total-item">
                <span>C Umumiy Savdo: </span>
                {this.state.ABCSale.c_category_data === undefined
                  ? ""
                  : this.state.ABCSale.c_category_data.total_price.toFixed(2) +
                    " So'm"}
              </div>
            </div>
            <div className="control-product-item">
              <div className="total-item">
                <span>A Yalpi daromad: </span>
                {this.state.ABCProfit.a_category_data === undefined
                  ? ""
                  : this.state.ABCProfit.a_category_data.total_profit.toFixed(
                      2
                    ) + " So'm"}
              </div>
              <div className="total-item">
                <span>B Yalpi daromad: </span>
                {this.state.ABCProfit.b_category_data === undefined
                  ? ""
                  : this.state.ABCProfit.b_category_data.total_profit.toFixed(
                      2
                    ) + " So'm"}
              </div>
              <div className="total-item">
                <span>C Yalpi daromad: </span>
                {this.state.ABCProfit.c_category_data === undefined
                  ? ""
                  : this.state.ABCProfit.c_category_data.total_profit.toFixed(
                      2
                    ) + " So'm"}
              </div>
            </div>
          </div>

          <div className="abc-table">
            <div className="box">
              <ABCTable
                url={"/api/report/sale-abc-analysis/"}
                params={this.state.start_date}
              />
            </div>
            <div className="box">
              <ABCTable
                url={"/api/report/net-profit-abc-analysis/"}
                params={this.state.start_date}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

export default SellProducts;
