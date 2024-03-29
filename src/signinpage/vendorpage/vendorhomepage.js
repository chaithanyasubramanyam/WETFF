import React, { Component } from "react";
import fire from "../../firebase/config";
import "./vendorhomepage.css";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Media from "react-bootstrap/Media";
import { Container, Col, Row } from "react-bootstrap";
import web3 from "../../ethereum/web3";
import instance from "../../ethereum/wetff";
import _ from "lodash";
import Table_header from './components/table_header';


class Vendorhome extends Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection("vendordetails");
    this.unsubscribe = null;
    this.state = {
      result: [],
      vendoremail: this.props.vendoremail,
      userdata: [],
      vendordata: {},
      vinp1: "",
      vinp2: "",
      vinp3: "",
      updateduserdata: [],
      vendorclass: "",
      vendormetamask: "",
    };
  }
  quering = () => {
    this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          if (doc.id == this.state.vendoremail) {
            console.log(doc.id)
            const { email,metamask, name,
              phone,
              role,
              vendorclass } = doc.data()
            this.setState({ vendorclass: vendorclass});
            this.setState({ vendormetamask: metamask });
            console.log("log from firebase",this.state.vendorclass);
          }
        })
      })
  }

  blockchainquering = async() => {
     
    console.log("Log from blockchain query",this.state.vendorclass);
    const _class = parseInt(this.state.vendorclass);
    console.log(_class)
    

    const length = await instance.methods.getUserValuesLength(_class).call();

    const result = await Promise.all(
      Array(parseInt(length))
        .fill()
        .map((element, index) => {
          return instance.methods.userdataMap(_class, index).call();
        })
    );

    this.setState({ result });
    
    console.log(this.state.result);
  }

  

  componentDidMount=()=>{
    // fetch class varible form firebase of this perticular user
    this.quering();
    // var bounce = _.debounce(() => {
    //   this.blockchainquering()
    // }, 10);
    // bounce();
    
  }

  componentDidUpdate = async()=>{
    var a = this.state.result
    if (a.length == 0){
     this.blockchainquering();
    } 
  }

  //   const requests = await Promise.all(
  //     Array(parseInt(requestCount)).fill().map((element,index)=>{
  //         return campaign.methods.requests(index).call()
  //     })
  // )

  handleChange = (e, id, inp) => {
    let st = this.state.vendordata;
    if (st[id]) {
      st[id][inp] = e.target.value;
    } else {
      st[id] = { [inp]: e.target.value };
    }

    this.setState({ vendordata: st });
  };

  vendorsubmit = (e, id, index) => {
    e.preventDefault();

    let updateduserdata = this.state.updateduserdata;
    let removed = this.state.userdata.splice(index, 1);
    updateduserdata.push(removed[0]);

    this.setState({
      userdata: this.state.userdata,
      updateduserdata: updateduserdata,
    });

    const vendorsub = this.state.vendordata[id];

    fire.firestore().collection("vendor").doc(id).set({
      vinp1: vendorsub.vinp1,
      vinp2: vendorsub.vinp2,
      vinp3: vendorsub.vinp3,
    });
  };

  changesubmit = async (e, id) => {
    e.preventDefault();

    const vendorsub = this.state.vendordata[id];
    const accounts = await web3.eth.getAccounts();

    await instance.methods
      .addVendorData(0, vendorsub.vinp1, vendorsub.vinp2, vendorsub.vinp3)
      .send({ from: accounts[0] });
    fire.firestore().collection("vendor").doc(id).set({
      vinp1: vendorsub.vinp1,
      vinp2: vendorsub.vinp2,
      vinp3: vendorsub.vinp3,
    });
  };
  
  vendorlogout = () => {
    fire.auth().signOut();
  };

  render(props) {
    return (
      <div>
        
        {/* {this.state.result.map((data, index) => (
          <div>{data.model}
          <br/>
          {data.date}
          <br/>
          {data.brand}
          <hr/>
          </div>
          
        ))} */}

        {/* <div onClick={this.vendorlogout}>
          <Button>LOGOUT</Button>  
        </div> */}


        
      <nav className="nav1">
          <div className="homelogout" onClick={this.vendorlogout}>
            Logout
          </div>
          <Link to="#">
            <div className="toggle">
              <i class="fa fa-bars fa-2x"></i>
            </div>
          </Link>
          <Link to="#">
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
        <div className="nav2">
          <div className="nav2img">
            <Link to="#" className="nav2logo">
              +
            </Link>
          </div>
          <div className="nav2srch">
            <input className="searchtxt" type="txt" placeholder="search here" />
            <a href="#" className="searchBtn">
              <i class="fa fa-search"></i>
            </a>
          </div>
          <div className="nav2drop">
            <select id="location">
              <option value="location">Location</option>
              <option value="location">America</option>
              <option value="location">England</option>
              <option value="location">Dubai</option>
            </select>
          </div>
        </div>
        
          {/* This is the table header */}
          <Table className='vendortable'>
          <Table_header ClassValue={this.state.vendorclass} />
          
          <tbody>
            {this.state.result.map((data,index)=>{
              return (<tr>
                <td>{data.userAddress}</td>
                <td>{data.model}</td>
                <td>{data.brand}</td>
                <td>{data.date}</td>
                <td>image</td>
                <td>image</td>
                <td><input
                      type="number"
                      className="vendorinp"
                      // value={this.state.vendordata[data.id]["vinp1"]}
                      // onChange={(e) => this.handleChange(e, data.id, "vinp1")}
                      name="vendorinp1"
                    /></td>

              <td>
              <input
                      type="number"
                      className="vendorinp"
                      // value={this.state.vendordata[data.id]["vinp1"]}
                      // onChange={(e) => this.handleChange(e, data.id, "vinp1")}
                      name="vendorinp1"
                    />
              </td>
              <td>
              <input
                      type="number"
                      className="vendorinp"
                      // value={this.state.vendordata[data.id]["vinp1"]}
                      // onChange={(e) => this.handleChange(e, data.id, "vinp1")}
                      name="vendorinp1"
                    />
              </td>
              <td>
              <input
                      type="submit"
                      // className="vendorsubmit"
                      // onClick={(e) => this.vendorsubmit(e, data.id, index)}
                      // value={data.sub}
                    />
              </td>
              </tr>);
            })}
             </tbody>
          </Table>
            
        </div>
                    
    )}}    
                    


export default Vendorhome;



