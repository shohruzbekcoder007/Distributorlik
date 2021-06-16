import React, { Component } from "react";
import FilterByTime from "../CalendarFilter/filterByTime";
import PageMap from "../page-road-map/page-map";
import Statistics from "../statistics/statistics";
// import DateQuantityStats from '../stats/dateQuantityStats'
// import DailyQuantityStats from '../stats/dailyQuantityStats'
import DateSaleStats from "../stats/dateSaleStats";
import DataTable from "../tables/dataTable";

class BuyProducts extends Component {
  state = {
    infos: [],
    start_date: "",
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
    const headers = [
      "T/R",
      "Taminotchi",
      "Kategoriya",
      "Mahsulot",
      "Miqdori",
      "Kirim narxi",
      "Qiymati",
      "Debt",
      "Kirim kuni",
    ];
    const name = "buyProduct";
    return (
      <div>
        <div className="page-header">
          <PageMap page_name={"Mahsulotlar Kirimi"} />
          <FilterByTime
            onFilterDateSubmit={this.onFilterDateSubmit}
            onSetDay={this.onSetDay}
            onSetWeek={this.onSetWeek}
            onSetMonth={this.onSetMonth}
          />
        </div>
        <DataTable
          name={name}
          headers={headers}
          url={"/api/order/buy-order-list/"}
          params={this.state.start_date}
        />

        <div>
          <Statistics />
        </div>
        <div className="pie-chart">
          <DateSaleStats
            url={"/api/order/data-pie-chart/"}
            params={this.state.start_date}
          />
        </div>
      </div>
    );
  }
}

export default BuyProducts;
