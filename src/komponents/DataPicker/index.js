import React from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class DataPicker extends React.Component {
  state = { selectedDate: this.props.date };
  handleDateChange = (selectedDate) => {
    this.props.func(selectedDate);
    this.setState({ selectedDate });
  };

  render() {
    const selectedDate = this.state.selectedDate;
    if (this.props.disabled) {
      return (
        <Datepicker
          className="red-border"
          todayButton={"Today"}
          selected={selectedDate}
          onChange={this.handleDateChange}
          placeholderText="Click to select a date"
          withPortal={false}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          disabled
          popperPlacement="bottom-start"
          popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px",
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
              boundariesElement: "viewport",
            },
          }}
        />
      );
    } else {
      return (
        <Datepicker
          className="red-border"
          todayButton={"Today"}
          selected={selectedDate}
          onChange={this.handleDateChange}
          placeholderText="Click to select a date"
          withPortal={false}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          popperPlacement="bottom-start"
          popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px",
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
              boundariesElement: "viewport",
            },
          }}
        />
      );
    }
  }
}
