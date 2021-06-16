import React, { Component } from "react";

class StatisticsTableBody extends Component {
  state = {};
  render() {
    let count = 0;
    return (
      <tbody>
        {this.props.statisticsData.data === undefined ? (
          <h1>Loading...</h1>
        ) : (
          this.props.statisticsData.data.map((data) => {
            count++;
            let total_average = data.rest_quantity * data.average_cost;
            let residue_day = data.rest_quantity / data.average_sell_quantity;
            let daily_income =
              (data.average_price - data.average_cost) *
              data.average_sell_quantity;

            let margin = 0;
            if (data.average_price === 0) {
              margin = "Sotish narxi 0";
            } else {
              margin =
                (data.average_price - data.average_cost) / data.average_price;
            }

            let ustama = 0;

            if (data.average_cost === 0) {
              ustama = "Sotish narxi 0";
            } else {
              ustama =
                (data.average_price - data.average_cost) / data.average_cost;
            }

            let OOS =
              (residue_day - data.estimated_delivery_days) * daily_income;
            let frozen_money =
              (residue_day - data.estimated_delivery_days) *
              data.average_cost *
              data.average_sell_quantity;

            let frozen_money_prasent = frozen_money / total_average;

            if (residue_day === Infinity) {
              residue_day = 0;
            } else if (residue_day === -Infinity) {
              residue_day = 0;
            } else {
              residue_day = residue_day;
            }
            if (margin === Infinity) {
              margin = 0;
            } else if (margin === -Infinity) {
              margin = 0;
            } else {
              margin = margin;
            }
            if (data.average_sell_quantity === 0) {
              residue_day = 0;
            } else {
              residue_day = residue_day;
            }

            let desired_product =
              (residue_day - data.estimated_delivery_days) *
              data.average_sell_quantity;
            let need_money = desired_product * data.average_cost;
            return (
              <tr key={count}>
                <td>{count}</td>
                <td>{data.product_name}</td>
                <td>{data.rest_quantity.toFixed(2)}</td>
                <td>{data.average_cost.toFixed(2)}</td>
                <td>{data.average_price.toFixed(2)}</td>
                <td>{data.average_sell_quantity.toFixed(2)}</td>
                <td>{data.estimated_delivery_days.toFixed(2)}</td>
                <td>{total_average.toFixed(2)}</td>
                <td>{residue_day.toFixed(2)}</td>
                <td>{daily_income.toFixed(2)}</td>
                <td>
                  {(
                    daily_income /
                    this.props.statisticsData.total.daily_total_income
                  ).toFixed(2)}
                </td>
                <td>
                  {margin === "Sotish narxi 0"
                    ? "Sotish narxi 0"
                    : margin.toFixed(2) + " %"}
                </td>
                <td>{ustama.toFixed(2) + " %"}</td>
                <td>{OOS.toFixed(2)}</td>
                <td>{frozen_money.toFixed(2)}</td>
                <td>{frozen_money_prasent.toFixed(2)}</td>
                <td>{desired_product.toFixed(2)}</td>
                <td>{need_money.toFixed(2)}</td>
              </tr>
            );
          })
        )}
      </tbody>
    );
  }
}

export default StatisticsTableBody;
