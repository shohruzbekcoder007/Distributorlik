import React, { Component } from "react";
import DailyQuantityStats from "../stats/dailyQuantityStats";
import DateQuantityStats from "../stats/dateQuantityStats";
import DailyProfitStats from "../stats/dailyProfitStats";
import PageMap from "../page-road-map/page-map";
import axios from "axios";

class Profit extends Component {
  state = { profit: null };
  componentDidMount = async () => {
    let response = await axios.get("/api/report/profit-report/");
    this.setState({
      profit: response.data,
    });
  };
  handleProfit = () => {
    if (this.state.profit === null) {
      return <h1 className="loading">Loading...</h1>;
    } else {
      return (
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            paddingTop: "20px",
            color: "#fff",
          }}
        >
          <h4>Jami Foyda: {this.state.profit.total_profit}</h4>
          <h4>Jami Xarajat: {this.state.profit.total_expense}</h4>
          <h4>Yalpi Foyda: {this.state.profit.net_profit}</h4>
        </div>
      );
    }
  };
  render() {
    const profit = this.state.profit;
    return (
      <React.StrictMode>
        <PageMap
          page_name={"Foyda"}
          text={"Ferzu Foyda Sahifasiga Xushkelibsiz!"}
        />
        <div>{this.handleProfit()}</div>
        <DailyQuantityStats
          title={{
            title: "Kundalik mahsulotlar bo'yicha foyda statistikasi",
            titleAxisY: "Foyda",
            suffix: "so'm",
          }}
          axisY={"product_profit"}
          name={"product_name"}
          url={"/api/order/profit-report/"}
        />
        <DateQuantityStats
          title={{
            title: "Berilgan sana bo'yicha foyda statistikasi",
            titleAxisY: "Foyda",
            suffix: "so'm",
          }}
          axisY={"total_profit"}
          label={"product_name"}
          url={"/api/order/grouped-profit-report/"}
        />
        <DailyProfitStats
          title={{
            title: "Kundalik foyda statistikasi",
            titleAxisY: "Foyda",
            suffix: "so'm",
          }}
          url={"/api/order/daily-profit/"}
        />
      </React.StrictMode>
    );
  }
}

export default Profit;
