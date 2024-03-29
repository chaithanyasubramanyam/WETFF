import React from "react";
import "./collarpage.css";
import { Container, Row, Col } from "react-bootstrap";
import fire from "../../../firebase/config";
import web3 from "../../../ethereum/web3";
import ipfs from "../../../ethereum/ipfs";
import instance from "../../../ethereum/wetff";

export default class Wheelers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useremail: this.props.useremail,
      Class: "2 and 4 wheelers",
      Brand: "",
      Model: "",
      Monthyear: "",
      Uploadimg: [],
      Billimg: [],
      Uploadimgurl: [],
      progressupload: 0,
      Billimgurl: [],
      progressbill: 0,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChange1 = (e) => {
    const uploadimg = this.state.Uploadimg;
    if (e.target.files[0]) {
      uploadimg.push(e.target.files[0]);
      this.setState({ Uploadimg: uploadimg });
    }
  };

  handleChange2 = (e) => {
    const billimg = this.state.Billimg;
    if (e.target.files[0]) {
      billimg.push(e.target.files[0]);
      this.setState({ Billimg: billimg });
    }
    console.log(this.state.Billimg);
  };

  retrive1 = (e) => {
    e.preventDefault();
    const uploadimg = this.state.Uploadimg;
    var i;
    for (i = 0; i < uploadimg.length; i++) {
      var uploadimgindex = uploadimg[i];
      const uploadimgtask = fire
        .storage()
        .ref(`Uploadimg/${this.state.useremail}/${uploadimgindex.name}`)
        .put(uploadimgindex);
      uploadimgtask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          const uploadimgurl = this.state.Uploadimgurl;
          fire
            .storage()
            .ref(`Uploadimg/${this.state.useremail}`)
            .child(uploadimgindex.name)
            .getDownloadURL()
            .then((url) => {
              uploadimgurl.push(url);
              this.setState({ Uploadimgurl: uploadimgurl });
              console.log(this.state.Uploadimgurl);
            });
        }
      );
    }
  };

  retrive2 = (e) => {
    e.preventDefault();
    const billimg = this.state.Billimg;
    var j;
    for (j = 0; j < billimg.length; j++) {
      var billimgindex = billimg[j];
      const billimgtask = fire
        .storage()
        .ref(`Billimg/${this.state.useremail}/${billimgindex.name}`)
        .put(billimgindex);
      billimgtask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          const billimgurl = this.state.Billimgurl;
          fire
            .storage()
            .ref(`Billimg/${this.state.useremail}`)
            .child(billimgindex.name)
            .getDownloadURL()
            .then((url) => {
              billimgurl.push(url);
              this.setState({ Billimgurl: billimgurl });
              console.log(this.state.Billimgurl);
            });
        }
      );
    }
  };

  submitcollar = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();
    //upload both set of images
    await instance.methods
      .addUserData(this.state.Brand, 0, this.state.Model, this.state.Monthyear)
      .send({
        from: accounts[0],
      });

    // const itemimg = this.state.uploadimg;
    // console.log(itemimg);

    fire.firestore().collection("check").doc(this.state.useremail).set({
      Class: this.state.Class,
      Brand: this.state.Brand,
      Model: this.state.Model,
      Monthyear: this.state.Monthyear,
      Billimgurl: this.state.Billimgurl,
      Uploadimgurl: this.state.Uploadimgurl,
    });
  };
  render() {
    return (
      <div>
        <Container className="collarcontent">
          <Row>
            <Col className="class">Brand</Col>
            <Col className="classdropdown">
              <select
                id="classdrop"
                name="Brand"
                onChange={this.handleChange}
                required
              >
                <option value=""></option>
                <option value="adfasd">adfasd</option>
                <option value="aaddad">aaddad</option>
                <option value="asfsdf">asfsdf</option>
              </select>
            </Col>
          </Row>
        </Container>

        <Container className="collarcontent">
          <Row>
            <Col className="class">Model</Col>
            <Col className="classdropdown">
              <select
                id="classdrop"
                name="Model"
                onChange={this.handleChange}
                required
              >
                <option value=""></option>
                <option value="adfasd">adfasd</option>
                <option value="aaddad">aaddad</option>
                <option value="asfsdf">asfsdf</option>
              </select>
            </Col>
          </Row>
        </Container>

        <Container className="collarcontent">
          <Row>
            <Col className="Purchase">Purchase MM/YYYY</Col>
            <Col>
              <input
                type="month"
                name="Monthyear"
                className="monthyear"
                onChange={this.handleChange}
                required
              />
            </Col>
          </Row>
        </Container>

        <Container className="collarcontent">
          <Row>
            <Col className="collarupload">Upload img</Col>
            <Col>
              <input
                type="file"
                id="uploadimg"
                name="Uploadimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange1}
                required
              />

              <input
                type="file"
                id="uploadimg"
                name="Uploadimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange1}
              />

              <input
                type="file"
                id="uploadimg"
                name="Uploadimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange1}
              />

              <input
                type="file"
                id="uploadimg"
                name="Uploadimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange1}
              />

              <input
                type="file"
                id="uploadimg"
                name="Uploadimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange1}
              />

              <input
                type="submit"
                className="retrivebtn"
                onClick={this.retrive1}
                value="Upload"
              />
            </Col>
          </Row>
        </Container>

        <Container className="collarcontent">
          <Row>
            <Col className="collarBill">Bill</Col>
            <Col>
              <input
                type="file"
                id="uploadBill"
                name="Billimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange2}
                required
              />

              <input
                type="file"
                id="uploadBill"
                name="Billimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange2}
              />

              <input
                type="file"
                id="uploadBill"
                name="Billimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange2}
              />

              <input
                type="file"
                id="uploadBill"
                name="Billimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange2}
              />

              <input
                type="file"
                id="uploadBill"
                name="Billimg"
                accept="image/png, image/jpeg"
                onChange={this.handleChange2}
              />

              <input
                type="submit"
                className="retrivebtn"
                onClick={this.retrive2}
                value="Upload"
              />
            </Col>
          </Row>
        </Container>

        <div className="retrive">
          <input
            type="submit"
            className="retrivebtn"
            value="submit"
            onClick={this.submitcollar}
          />
        </div>
      </div>
    );
  }
}
