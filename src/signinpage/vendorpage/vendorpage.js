import React from 'react';
import Vendorlogin from './vendorlogin';
import Vendorhome from './vendorhomepage';
import {Link} from 'react-router-dom';
import fire from '../../firebase/config'




export default class Vendorpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null
    }    
  }

  componentDidMount(){
    this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if (user){
        this.setState({user});
    }else{
      this.setState({user:null});
    }
    })

  }
  render(){
      return (
          <div>
            {this.state.user ? (<Vendorhome vendoremail={this.state.user.email}/>) : (<Vendorlogin/>)}
          </div>
      )}
}




