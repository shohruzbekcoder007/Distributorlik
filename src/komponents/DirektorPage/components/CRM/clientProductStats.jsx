import React, { Component } from "react";

import DataTable from "../tables/dataTable";
import DailyQuantityStats from "../stats/dailyQuantityStats";
import DateQuantityStats from "../stats/dateQuantityStats";
import PageMap from "../page-road-map/page-map";

class ClientProductStats extends Component {
  state = {};
  render() {
    const headers = [
      "T/R",
      "Xaridor",
      "Agent",
      "Kategoriya",
      "Mahsulot",
      "Xolati",
      "Og'irligi",
      "Narxi",
      "Jami Narxi",
      "Qarzdorlik",
      "Qo'shilgan sana",
    ];
    const name = "sellProduct";
    return (
      <div>
        <PageMap
          page_name={"Mijozlar Statistikasi"}
          text={"Mijozlar Statistikasi Sahifasiga Xushkelibsiz!"}
        />
        <DataTable
          name={name}
          headers={headers}
          url={"/api/order/sell-order-list/"}
        />
        <DailyQuantityStats
          title={{
            title: "Mijozlar statistikasi",
            titleAxisY: "Miqdori",
            suffix: "kg",
          }}
          axisY={"total_quantity"}
          name={"client"}
          url={"/api/report/client-report/"}
        />
        <DateQuantityStats
          title={{
            title: "Mijozlar statistikasi",
            titleAxisY: "Mahsulotlar miqdori",
            titleAxisX: "Mijozlar",
            suffix: "kg",
          }}
          axisY={"total_quantity"}
          label={"client"}
          url={"/api/report/date-client-report/"}
        />
        <DailyQuantityStats
          title={{
            title: "Mijozlar statistikasi",
            titleAxisY: "Narxi",
            suffix: "so'm",
          }}
          axisY={"total_price"}
          name={"client"}
          url={"/api/report/client-report/"}
        />
        <DateQuantityStats
          title={{
            title: "Mijozlar statistikasi",
            titleAxisY: "Mahsulotlar narxi",
            titleAxisX: "Mijozlar",
            suffix: "so'm",
          }}
          axisY={"total_price"}
          label={"client"}
          url={"/api/report/date-client-report/"}
        />
      </div>
    );
  }
}

export default ClientProductStats;
