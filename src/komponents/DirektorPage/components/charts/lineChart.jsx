import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

//var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
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
      backgroundColor: "#2a3142",
      animationEnabled: true,
      title: {
        text: this.props.title.title,
        fontColor: "#a8b2bc",
        fontSize: 24,
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
      data: this.props.productGroupList.map((data) => {
        return {
          type: "spline",
          visible: true,
          showInLegend: true,
          yValueFormatString: "",
          name: data[this.props.name],
          dataPoints: data.product_list.map((product) => {
            let dataPoints = {
              label: new Date(product.date).toDateString(),
              y: product[this.props.axisY],
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
