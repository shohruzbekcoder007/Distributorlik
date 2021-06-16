import React, { Component } from "react";
import DailySaleStats from "../stats/dailySaleStats";
import axios from "axios";
import "./dashboard.css";
import PageMap from "../page-road-map/page-map";
import FilterByTime from "../CalendarFilter/filterByTime";
import ABCStats from "../stats/abcStats";
import MonthlyTurnOver from "../stats/monthlyTurnoverStats";

class Dashboard extends Component {
  state = {
    infos: [],
    start_date:
      new Date().getFullYear() +
      "-" +
      parseInt(new Date().getMonth() + 1) +
      "-" +
      new Date().getDate(),
    current_date: "Bugun",
    chart_date: "Haftalik savdo",
  };

  componentDidMount() {
    this.getSaleInfo();
  }

  getSaleInfo = async () => {
    const url = "/api/report/sale-info/";
    axios(url, {
      params: {
        start_date: this.state.start_date,
      },
    }).then((info) => this.setState({ infos: info.data }));
  };

  onSetDay = async () => {
    await this.setState({
      start_date:
        new Date().getFullYear() +
        "-" +
        parseInt(new Date().getMonth() + 1) +
        "-" +
        parseInt(new Date().getDate()),
      current_date: "Bugun",
      chart_date: "Bugungi Savdo",
    });
    await this.getSaleInfo();
  };

  onSetWeek = async () => {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const lastWeekMonth = lastWeek.getMonth() + 1;
    const lastWeekDay = lastWeek.getDate();
    const lastWeekYear = lastWeek.getFullYear();
    const start_date = lastWeekYear + "-" + lastWeekMonth + "-" + lastWeekDay;
    await this.setState({
      start_date,
      current_date: "O'tgan Hafta",
      chart_date: "O'tgan Haftalik Savdo",
    });
    await this.getSaleInfo();
  };
  onSetMonth = async () => {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate()
    );
    const lastWeekMonth = lastWeek.getMonth() + 1;
    const lastWeekDay = lastWeek.getDate();
    const lastWeekYear = lastWeek.getFullYear();
    const start_date = lastWeekYear + "-" + lastWeekMonth + "-" + lastWeekDay;
    await this.setState({
      start_date,
      current_date: "O'tgan Oy",
      chart_date: "O'tgan Oylik Savdo",
    });
    await this.getSaleInfo();
  };
  onFilterDateSubmit = async (startDate) => {
    await this.setState({
      start_date: startDate,
      current_date: startDate + " dan Bugungacha",
      chart_date: startDate + " dan Bugungacha Savdo",
    });
    await this.getSaleInfo();
  };

  render() {
    // console.log(this.state.start_date);
    const {
      total_income_cash,
      total_income_credit,
      total_income_bank,
      credit,
    } = this.state.infos;
    const total_sale =
      total_income_bank + total_income_cash + total_income_credit + credit;
    return (
      <>
        <div className="page-header">
          <PageMap page_name={"Dashboard"} />
          <FilterByTime
            onFilterDateSubmit={this.onFilterDateSubmit}
            onSetDay={this.onSetDay}
            onSetWeek={this.onSetWeek}
            onSetMonth={this.onSetMonth}
          />
        </div>
        <div className="dashboard-top">
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-cart-arrow-down"></i>
            </div>
            <div className="card-title">Umumiy Savdo</div>
            <div className="count">{total_sale + " so'm"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="card-title">Naqd pul</div>
            <div className="count">{total_income_cash + " so'm"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="far fa-credit-card"></i>
            </div>
            <div className="card-title">Plastik</div>
            <div className="count">{total_income_credit + " so'm"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="fas fa-university"></i>
            </div>
            <div className="card-title">Bank orqali</div>
            <div className="count">{total_income_bank + " so'm"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
          <div className="top-card">
            <div className="card-icon">
              <i className="  fas fa-money-check-alt"></i>
            </div>
            <div className="card-title">Nasiya</div>
            <div className="count">{credit + " so'm"}</div>
            <div className="date">{this.state.current_date}</div>
          </div>
        </div>

        <div className="graphics-box">
          <div className="graphics">
            <DailySaleStats
              title={{
                title: `${this.state.chart_date}`,
                titleAxisY: "Pul miqdori",
                suffix: "so'm",
              }}
              axisY={"quantity"}
              name={"name"}
              url={"/api/report/data-daily-sale"}
              params={this.state.start_date}
            />
          </div>
        </div>
        <div className="graphics-box">
          <div className="graphics">
            <MonthlyTurnOver
              name={"Oylik pul aylanma"}
              nameAxisY={"summa"}
              url={"/api/report/monthly-turnover/"}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
