import React, { Component } from "react";
import PageMap from "../page-road-map/page-map";
import ClientDataTable from "../tables/clientDataTable";
import "./crm-style.css";
class ClientStats extends Component {
  state = {};
  render() {
    const name = "clientStat";
    const headers = [
      "T/R",
      "Mijoz",
      "Sotish Agenti",
      "Mas'ul agent",
      "Telefon raqam",
      "Manzil",
      "Qarzdorlik",
    ];
    return (
      <React.StrictMode>
        <PageMap page_name={"Mijozlar Ro'yxati"} />
        <div className="crm-page-header">
          <div className="crm-box">
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="count">1250000</div>
            <div className="card-title">Aloqa Markazi</div>
          </div>
          <div className="crm-box">
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="count">1250000</div>
            <div className="card-title">Sotuv Menejment</div>
          </div>
          <div className="crm-box">
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="count">1250000</div>
            <div className="card-title">Boshqa Reklama turlari</div>
          </div>
          <div className="crm-box">
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="count">1250000</div>
            <div className="card-title">SMM</div>
          </div>
        </div>
        <div style={{ marginTop: "70px" }}>
          <ClientDataTable
            name={name}
            headers={headers}
            url={"/api/report/client-debt-list/"}
          />
        </div>
      </React.StrictMode>
    );
  }
}

export default ClientStats;
