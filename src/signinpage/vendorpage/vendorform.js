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
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  name="vendorclass"
                  onChange={this.handleChange}
                />
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
