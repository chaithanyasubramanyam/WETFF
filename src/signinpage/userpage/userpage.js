import React from 'react';
import Userlogin from './userlogin';
import Homepage from './homepage/homepage'
import fire from '../../firebase/config'




export default class Userpage extends React.Component{
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
        this.setState({user})
    }else{
      this.setState({user:null});
    }
    })

  }
  render(){
      return (
          <div>
            {this.state.user ? (<Homepage useremail={this.state.user.email}/>) : (<Userlogin/>)}
          </div>
      )}
}




