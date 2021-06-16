import React, { Component } from "react";
import axios from "axios";
import PageMap from "../page-road-map/page-map";
import DataTable from "../tables/dataTable";
import StatisticsDataTable from "../tables/statistics_data_table";

class Statistics extends Component {
  state = {
    statisticsData: [],
  };
  async componentDidMount() {
    this.getStatisticsData();
  }
  getStatisticsData = async () => {
    const url = "/api/report/statistics/";
    await axios(url).then((response) => {
      this.setState({ statisticsData: response.data.total });
    });
  };

  render() {
    const headers = [
      "T/R",
      "Mahsulot",
      "Qoldiq",
      "Kirim Narxi",
      "Sotish Narxi",
      "O'rtacha Kunlik Savdo",
      "Normativ, kun",
      "Umimiy Qoldiq, so'm",
      "Qoldiq, kun",
      "Yalpi daromad, kunlik",
      "Yalpi Daromadda ulushlar",
      "Marja",
      "Ustama",
      "OOS sababli yo'qotish",
      "Muzlatilgan pul",
      "Muzlatilgan pul qoldiqqa nisbatan foizda",
      "Kerakli Mahsulot",
      "Kerakli pul",
    ];
    const name = "statistics";
    return (
      <>
        <div className="page-header mt-5">
          <PageMap page_name={"Overstock /Out of Stock Tahlili"} />
          <div className="total-datas">
            <div className="total-item">
              <span>OOS sababli yo'qotish: </span>
              {this.state.statisticsData.OOS !== undefined
                ? this.state.statisticsData.OOS.toFixed(2) + " So'm"
                : ""}
            </div>
            <div className="total-item">
              <span>Kunlik Yalpi Daromad: </span>
              {this.state.statisticsData.daily_total_income !== undefined
                ? this.state.statisticsData.daily_total_income.toFixed(2) +
                  " So'm"
                : "" + " So'm"}
            </div>
            <div className="total-item">
              <span>Muzlatilgan Pul: </span>
              {this.state.statisticsData.frozen_money !== undefined
                ? this.state.statisticsData.frozen_money.toFixed(2) + " So'm"
                : "" + " So'm"}
            </div>
            <div className="total-item">
              <span>Umumiy Qoldiq: </span>
              {this.state.statisticsData.total_residue + " ta"}
            </div>
          </div>
        </div>
        <StatisticsDataTable
          headers={headers}
          name={name}
          url={"/api/report/statistics/"}
        />
      </>
    );
  }
}

export default Statistics;
