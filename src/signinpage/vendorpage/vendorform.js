import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import fire from "../../firebase/config";

export default class Formpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      metamask: "",
      phone: "",
      email: this.props.vendoremail,
      role: "vendor",
      vendoremail: this.props.vendoremail,
      vendorclass: "",
    };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  Submit = (e) => {
    e.preventDefault();
    fire
      .firestore()
      .collection("vendordetails")
      .doc(this.state.vendoremail)
      .set({
        name: this.state.name,
        metamask: this.state.metamask,
        phone: this.state.phone,
        email: this.state.email,
        role: this.state.role,
        vendorclass: this.state.vendorclass,
      })
      .catch((err) => {
        console.log(err.message);
      })
      .then(() => {
        console.log("successfull");
      });
  };

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBRow>
            <MDBCol md="6">
              <form>
                <p className="h4 text-center mb-4">About me</p>

                <label htmlFor="name" className="grey-text">
                  Name
                </label>
                <input
                  type="name"
                  id="defaultFormLoginEmailEx"
                  name="name"
                  className="form-control"
                  onChange={this.handleChange}
                />
                <br />

                <label htmlFor="metamask" className="grey-text">
                  Metamask Address
                </label>
                <input
                  type="text"
                  id="metamask"
                  className="form-control"
                  name="metamask"
                  onChange={this.handleChange}
                />
                <br />

                <label htmlFor="phone" className="grey-text">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  name="phone"
                  onChange={this.handleChange}
                />
                <br />

                <label htmlFor="email" className="grey-text">
                  Email ID
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  name="email"
                  value={this.state.vendoremail}
                />
                <br />

                <label htmlFor="class" className="grey-text">
                  Class
                </label>
                <select
                id="classdrop"
                name="vendorclass"
                className="form-control"
                onChange={this.handleChange}
                required
              >
                  <option value=""></option>
                  <option value="0">2 and 4 wheelers</option>
                  <option value="1">Phones and laptops</option>
                  <option value="2">Other electronics</option>
                  <option value="3">Income</option>
                  <option value="4">Gold/Silver</option>
                  <option value="5">FD and Bonds</option>
                  <option value="6">Stocks</option>
                  <option value="7">Real Estate</option>
                  <option value="8">Other</option>
              </select>
                <br />

                <div className="text-center mt-4">
                  <MDBBtn color="indigo" type="submit" onClick={this.Submit}>
                    SUBMIT
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}
