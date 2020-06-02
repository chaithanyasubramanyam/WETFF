import React from 'react';
import Vendorlogin from './vendorlogin';
import Vendorformhome from './vendorformhome';
import {Link} from 'react-router-dom';
import fire from '../../firebase/config'




export default class Vendorpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null,
      typeuser : this.props.location.state.typeuser,
      role : ''
    }    
  }

  componentDidMount(){
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if (user){
        user.getIdTokenResult().then(idtokenresult=>{
          console.log(idtokenresult.claims.role)
          this.setState({role:idtokenresult.claims.role})
        })
        this.setState({user});
    }else{
      this.setState({user:null});
    }
    })

  }
  render(){
    var openpage = ()=>{
      if (this.state.role==='vendor'&&this.state.user != null){
        return (
          <div>
            <Vendorformhome vendoremail = {this.state.user.email} />
          </div>
        )
      }else{
        return (
          <div>
            <Vendorlogin typeuser={this.state.typeuser}/>
          </div>
        )

      }
    }
      return (
          <div>
            {openpage()}
          </div>
      )}
}




