import React from 'react';
import Userlogin from './userlogin';
import Userformhome from './userformhome'
import fire from '../../firebase/config'




export default class Userpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null,
      typeuser : this.props.location.state.typeuser,
      role: ''
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
          this.setState({user})
        })
        ;
    }else{
      this.setState({user:null});
    }
    })
  }
  render(){
    var openpage = ()=>{
      if (this.state.role==='user' && this.state.user != null){
        return (
          <div>
            <Userformhome useremail={this.state.user.email}/>
          </div>
        )
      }else{
        return (
          <div>
            <Userlogin typeuser={this.state.typeuser}/>
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




