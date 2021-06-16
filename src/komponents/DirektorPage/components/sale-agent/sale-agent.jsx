import React, { Component } from "react";
import PageMap from "../page-road-map/page-map";
import DailyQuantityStats from "./daily-sale-agent";
import DateQuantityStats from "../stats/dateQuantityStats";

class Sale_Agent extends Component {
  state = {};
  render() {
    return (
      <div>
        <PageMap
          page_name={"Sotish Bo'yicha Agent"}
          text={"Sotish Bo'yicha Agent Sahifasiga Xushkelibsiz!"}
        />
        <DailyQuantityStats
          title={{
            title: "Sotish bo'yicha agent",
            titleAxisY: "Miqdori",
            suffix: "kg",
          }}
          axisY={"total_quantity"}
          name={"agent"}
          url={"/api/report/grouped-date-agent-report/"}
        />
        <DateQuantityStats
          title={{
            title: "Sotish bo'yicha agent",
            titleAxisY: "Mahsulotlar miqdori",
            titleAxisX: "Agent",
            suffix: "kg",
          }}
          axisY={"total_quantity"}
          label={"agent"}
          url={"/api/report/grouped-agent-report/"}
        />
        <DailyQuantityStats
          title={{
            title: "Sotish bo'yicha agent",
            titleAxisY: "Narxi",
            suffix: "so'm",
          }}
          axisY={"total_price"}
          name={"agent"}
          url={"/api/report/grouped-date-agent-report/"}
        />
        <DateQuantityStats
          title={{
            title: "Sotish bo'yicha agent",
            titleAxisY: "Mahsulotlar narxi",
            titleAxisX: "Agent",
            suffix: "so'm",
          }}
          axisY={"total_price"}
          label={"agent"}
          url={"/api/report/grouped-agent-report/"}
        />
      </div>
    );
  }
}

export default Sale_Agent;
