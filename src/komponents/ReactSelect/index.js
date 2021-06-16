import React, { Component } from "react";
import Select from "react-select";

export default function ReactSelect(props) {
  if (props.defoult != null) {
  }
  return (
    <div style={{ width: "100%", color: "black" }}>
      <Select
        options={props.options}
        onChange={(value) => {
          props.func(value.value);
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
}

// https://reactdatepicker.com/
