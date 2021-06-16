import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
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
      backgroundColor: "transparent",
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
        fontColor: "#a8b2bc",
        cursor: "pointer",
        itemclick: this.toggleDataSeries,
      },
      data: this.props.chartData.map((data) => {
        return {
          type: "spline",
          visible: true,
          showInLegend: true,
          yValueFormatString: "",
          name: data[this.props.name],
          dataPoints: data.data.map((stat) => {
            let dataPoints = {
              label: new Date(stat.date).toDateString(),
              y: stat[this.props.axisY],
            };
            return dataPoints;
          }),
        };
      }),
    };
    return (
      <div>
        <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />
      </div>
    );
  }
}

export default LineChart;
