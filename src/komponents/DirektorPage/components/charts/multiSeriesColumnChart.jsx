import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MultiSeriesColumnChart extends Component {
  state = {};
  render() {
    let monthlyData = this.props.monthlyData;
    if (monthlyData.length === 0) {
      return <h1>Loading ...</h1>;
    } else {
      const options = {
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
          text: this.props.name,
          fontColor: "#a8b2bc",
          fontSize: 24,
        },
        axisY: {
          title: this.props.nameAxisY,
          titleFontColor: "#a8b2bc",
          labelFontColor: "#a8b2bc",
        },
        axisX: {
          titleFontColor: "#a8b2bc",
          labelFontColor: "#a8b2bc",
        },
        toolTip: {
          shared: true,
        },
        legend: {
          fontColor: "#a8b2bc",
          cursor: "pointer",
        },
        data: monthlyData.map((data) => {
          return {
            type: "column",
            name: data.name,
            showInLegend: true,
            dataPoints: data.data.map((obj) => {
              return {
                y: obj.total,
                label: new Date(obj.month).toDateString(),
              };
            }),
            //   { y: 155, label: "Jan" },
            //   { y: 150, label: "Feb" },
          };
        }),
      };

      return (
        <div>
          <CanvasJSChart
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
        </div>
      );
    }
  }
}

export default MultiSeriesColumnChart;
