import React, { Component } from "react";
import "./page-map.css";
class PageMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="road-map-box">
        <h4>{this.props.page_name}</h4>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default PageMap;
