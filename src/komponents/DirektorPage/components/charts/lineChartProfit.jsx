import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChartProfit extends Component {
  toggleDataSeries = (e) => {
    {
      if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }

      this.chart.render();
    }
  };
  render() {
    const options = {
      backgroundColor: "#2a3142",
      animationEnabled: true,
      title: {
        text: this.props.title.title,
        fontColor: "#a8b2bc",
        fontSize: 30,
      },
      axisY: {
        title: this.props.title.titleAxisY,
        suffix: this.props.title.suffix,
        titleFontColor: "#a8b2bc",
        labelFontColor: "#a8b2bc",
      },
      axisX: {
        titleFontColor: "#a8b2bc",
        labelFontColor: "#a8b2bc",
      },
      toolTip: {
        shared: "true",
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
      },
      data: [
        {
          type: "spline",
          visible: true,
          showInLegend: true,
          yValueFormatString: "##.00so'm",
          name: "Jami foyda",
          dataPoints: this.props.profitList.map((profit) => {
            let dataPoints = {
              label: new Date(profit.date).toDateString(),
              y: profit.total_profit,
            };
            return dataPoints;
          }),
        },
      ],
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}

export default LineChartProfit;
