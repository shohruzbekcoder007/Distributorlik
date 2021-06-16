import React, { Component } from "react";

import "../../styles/table-style.css";
import BuyTableBody from "./buyTableBody";
import SellTableBody from "./sellTableBody";
import ClientStatTableBody from "./clientStatTableBody";
import WarehouseTableBody from "./warehouseTableBody";
import StatisticsTableBody from "./statisticsTableBody";

class Table extends Component {
  state = {};
  handleTableBody = () => {
    if (this.props.name === "buyProduct") {
      return <BuyTableBody orderList={this.props.orderList} />;
    } else if (this.props.name === "sellProduct") {
      return <SellTableBody orderList={this.props.orderList} />;
    } else if (this.props.name === "clientStat") {
      return <ClientStatTableBody clientList={this.props.orderList} />;
    } else if (this.props.name === "warehouse") {
      return <WarehouseTableBody productList={this.props.orderList} />;
    } else if (this.props.name === "statistics") {
      return <StatisticsTableBody statisticsData={this.props.orderList} />;
    }
  };
  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped table-hover text-center  mb-0">
          <thead>
            <tr>
              {this.props.headers.map((header) => {
                return (
                  <td scope="col" key={header}>
                    {header}
                  </td>
                );
              })}
            </tr>
          </thead>
          {this.handleTableBody()}
        </table>
      </div>
    );
  }
}

export default Table;
