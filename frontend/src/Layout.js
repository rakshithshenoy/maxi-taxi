import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
// import "Layout.css";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router";
import Passenger from "./Passenger";
import Driver from "./Driver";

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // activeName = "passenger",
    };
    // this.handleItemClick = this.handleItemClick.bind(this);
  }
  //   handleItemClick(e) {
  //     e.preventDefault();
  //     this.setState({ activeItem: e.target.value });
  //     (this.state.activeName == 'passenger') ? (<Route path='/' />): (<Route path='/'/>)
  // }
  render() {
    return (
      <div>
     
      </div>
    );
  }
}

export default Layout;
