import React, { Component } from "react";
import PageMap from "../page-road-map/page-map";
import DataTable from "../tables/dataTable";

class Warehouse extends Component {
  state = {};
  render() {
    const headers = [
      "T/R",
      "Taminotchi",
      "Kategoriya",
      "Mahsulot",
      "Miqdori",
      "Oxirgi narx",
      "So'ngi o'zgarish",
    ];
    const name = "warehouse";
    return (
      <div>
        <PageMap
          page_name={"Omborxona"}
          text={"Ferzu Omborxonaga Xushkelibsiz!"}
        />
        <DataTable
          name={name}
          headers={headers}
          url={"/api/report/warehouse-list/"}
        />
      </div>
    );
  }
}

export default Warehouse;
