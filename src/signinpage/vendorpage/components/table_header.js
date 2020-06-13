import React from "react";
import { Component } from "react";
// import { Table, Button } from "react-bootstrap";

export default class TableHeader extends Component{
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  
  render(){
    console.log("table header value", this.props);
  const _class = this.props.ClassValue;
  
  if (_class == 0 || _class == 1 || _class == 2) {
    //   2 and 4 wheelers and phones, laptops and other electronics
    return (
        
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Month/Year</th>
            <th colSpan="2">Images</th>
            <th>value</th>
            <th>depr</th>
            <th>salvage</th>
            <th>submit</th>
          </tr>
        </thead>

    );
  } else if (_class == 3) {
    // Income
    return (
      <div>
        <thead>
          <tr>
            <th>ID</th>
            <th>Income</th>
            <th>Last year income</th>
            <th>Co-Industry</th>
            <th colSpan="2">Images</th>
            <th>value</th>
            <th>depr</th>
            <th>salvage</th>
            <th>submit</th>
          </tr>
        </thead>
      </div>
    );
  } else if (_class == 4) {
    // Gold/silver
    return (
      <div>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Form</th>
            <th>Grams</th>
            <th colSpan="2">Images</th>
            <th>value</th>
            <th>depr</th>
            <th>salvage</th>
            <th>submit</th>
          </tr>
        </thead>
      </div>
    );
  } else if (_class == 5) {
    // FD and BONDS
    return (
      <div>
        <thead>
          <tr>
            <th>Class</th>
            <th>Amount</th>
            <th>Interest rate</th>
            <th>Maturity date</th>
            <th colSpan="2">Images</th>
            <th>value</th>
            <th>depr</th>
            <th>salvage</th>
            <th>submit</th>
          </tr>
        </thead>
      </div>
    );
  } else if (_class == 6) {
    // Stocks
    return (
      <div>
        <thead>
          <tr>
            <th>Class</th>
            <th>Account Type</th>
            <th>Investment Time</th>
            <th>Investment Horizon</th>
            <th colSpan="2">Images</th>
            <th>value</th>
            <th>depr</th>
            <th>salvage</th>
            <th>submit</th>
          </tr>
        </thead>
      </div>
    );
  } else if (_class == 7) {
    // Real estate
    return (
      <div>
        <thead>
          <tr>
            <th>Class</th>
            <th>Type</th>
            <th>Size (sqft/acre)</th>
            <th>Area</th>
            <th colSpan="2">Images</th>
            <th>value</th>
            <th>depr</th>
            <th>salvage</th>
            <th>submit</th>
          </tr>
        </thead>
      </div>
    );
  } else if (_class == 8) {
    // other
    return (
      <div>
        <thead>
          <tr>
            <th>Class</th>
            <th>Type</th>
            <th>Scrap value</th>
            <th>Self access value</th>
            <th colSpan="2">Images</th>
            <th>value</th>
            <th>depr</th>
            <th>salvage</th>
            <th>submit</th>
          </tr>
        </thead>
      </div>
    );
  } 
}
};
