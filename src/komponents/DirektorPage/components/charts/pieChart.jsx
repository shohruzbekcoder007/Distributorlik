import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class PieChart extends Component {
  state = {};

  render() {
    if (this.props.saleData === "undefined") {
      return <h1>Loading...</h1>;
    } else {
      const saleData = this.props.saleData;
      const options = {
        exportEnabled: true,
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
          text: this.props.title,
          fontColor: "#a8b2bc",
          fontSize: 30,
        },
        legend: {
          fontColor: "#a8b2bc",
        },
        data: [
          {
            type: "pie",
            startAngle: 75,
            toolTipContent: `<b>{label}</b>: {y} ${this.props.suffix}`,
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontColor: "#a8b2bc",
            indexLabelFontSize: 16,
            indexLabel: `{label} - {y}${this.props.suffix}`,
            dataPoints: saleData.map((product) => {
              let dataPoints = {
                y: product.total_quantity,
                label: product.name,
              };
              return dataPoints;
            }),
          },
        ],
      };
      return (
        <div className="pie-chart-item">
          <CanvasJSChart
            options={options}
            onRef={(ref) => (this.chart = ref)}
          />
        </div>
      );
    }
  }
}
export default PieChart;
