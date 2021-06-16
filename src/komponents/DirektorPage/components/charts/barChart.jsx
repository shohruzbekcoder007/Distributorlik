import React, { Component } from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BarChart extends Component {
  state = {};
  render() {
    let options = {
      animationEnabled: true,
      backgroundColor: "#2a3142",
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
        title: this.props.title.titleAxisX,
        titleFontColor: "#a8b2bc",
        labelFontColor: "#a8b2bc",
      },
      data: [
        {
          type: "column",
          yValueFormatString: "",
          dataPoints: this.props.groupedDateProductOrders.map((product) => {
            return {
              label: product[this.props.label],
              y: product[this.props.axisY],
            };
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

export default BarChart;
