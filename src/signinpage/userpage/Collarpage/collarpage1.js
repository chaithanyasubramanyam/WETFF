import React from "react";
import { Link } from "react-router-dom";
import "./collarpage.css";
import { Container, Row, Col } from "react-bootstrap";
import Wheelers from "./wheelers";
import Phones from "./Phones";
import Electronics from "./electronics";
import Income from "./Income";
import Gold from "./Gold";
import FDandBonds from "./FD_and_Bonds";
import Stocks from "./Stocks";
import Realestate from "./RealEstate";
import Others from "./Other";
import web3 from "../../../ethereum/web3";
import instance from "../../../ethereum/wetff";

export default class Collartrail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Class: "",
      useremail: this.props.location.state.useremail,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const collarcontentpage = () => {
      if (this.state.Class === "") {
        return <div></div>;
      } else if (this.state.Class === "2 and 4 wheelers") {
        return (
          <div>
            <Wheelers useremail={this.state.useremail} />
          </div>
        );
      } else if (this.state.Class === "Phones and laptops") {
        return (
          <div>
            <Phones useremail={this.state.useremail} />
          </div>
        );
      } else if (this.state.Class === "Other electronics") {
        return (
          <div>
            <Electronics useremail={this.state.useremail} />
          </div>
        );
      } else if (this.state.Class === "Income") {
        return (
          <div>
            <Income useremail={this.state.useremail} />
          </div>
        );
      } else if (this.state.Class === "Gold/Silver") {
        return (
          <div>
            <Gold useremail={this.state.useremail} />
          </div>
        );
      } else if (this.state.Class === "FD and Bonds") {
        return (
          <div>
            <FDandBonds useremail={this.state.useremail} />
          </div>
        );
      } else if (this.state.Class === "Stocks") {
        return (
          <div>
            <Stocks useremail={this.state.useremail} />
          </div>
        );
      } else if (this.state.Class === "Real Estate") {
        return (
          <div>
            <Realestate useremail={this.state.useremail} />
          </div>
        );
      } else if (this.state.Class === "Other") {
        return (
          <div>
            <Others useremail={this.state.useremail} />
          </div>
        );
      }
    };

    return (
      <div>
        <nav className="nav1">
          <Link to="/profile">
            <div className="toggle">
              <i class="fa fa-bars fa-2x"></i>
            </div>
          </Link>
          <Link to="/profile">
            <div className="togglebtn">
              <i class="fa fa-bars"></i>
            </div>
          </Link>
          <ul className="honavul">
            <li>
              <a href="#" className="homeactive">
                Home
              </a>
            </li>
            <li>
              <a href="#">bcdef</a>
            </li>
            <li>
              <a href="#">cdefg</a>
            </li>
          </ul>
        </nav>

        <nav className="cnav1">
          <ul className="cnav1ul">
            <li>
              <Link to="/user/home" className="headback">
                Back
              </Link>
            </li>
            <li className="headcollar">Collar</li>
            <li className="headsecure">
              <a>Secure</a>
            </li>
          </ul>
        </nav>

        <form>
          <Container className="collarcontent">
            <Row>
              <Col className="class">Class</Col>
              <Col className="classdropdown">
                <select
                  id="classdrop"
                  onChange={this.handleChange}
                  name="Class"
                  required
                >
                  <option value=""></option>
                  <option value="2 and 4 wheelers">2 and 4 wheelers</option>
                  <option value="Phones and laptops">Phones and laptops</option>
                  <option value="Other electronics">Other electronics</option>
                  <option value="Income">Income</option>
                  <option value="Gold/Silver">Gold/Silver</option>
                  <option value="FD and Bonds">FD and Bonds</option>
                  <option value="Stocks">Stocks</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Other">Other</option>
                </select>
              </Col>
            </Row>
            <Row></Row>
          </Container>
        </form>

        {collarcontentpage()}
      </div>
    );
  }
}
