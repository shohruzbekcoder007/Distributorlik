import React, { Component } from "react";

class FilterByTime extends Component {
  onSetDate = (e) => {
    this.props.onFilterDateSubmit(e.target.value);
  };
  onSetDay = () => {
    const start_date =
      new Date().getFullYear() +
      "-" +
      parseInt(new Date().getMonth() + 1) +
      "-" +
      parseInt(new Date().getDate());
    this.props.onSetDay(start_date);
  };
  onSetWeek = () => {
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
    this.props.onSetWeek(start_date);
  };
  onSetMonth = () => {
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
    this.props.onSetMonth(start_date);
  };
  render() {
    return (
      <div className="filter-box">
        <span className="today" onClick={this.onSetDay}>
          Bugun
        </span>
        <span className="weekly" onClick={this.onSetWeek}>
          Hafta
        </span>
        <span className="monthly" onClick={this.onSetMonth}>
          Oy
        </span>
        <input type="date" name="startDate" onChange={this.onSetDate} />
      </div>
    );
  }
}

export default FilterByTime;
