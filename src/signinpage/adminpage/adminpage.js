import React from 'react';
import Adminlogin from './adminlogin';
import Adminhome from './adminhome';
import fire from '../../firebase/config'




export default class Adminpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: null,
      typeuser : this.props.location.state.typeuser,
      role: '',
    }    
  }

  componentDidMount(){
    this.authListener();
  }

  

  authListener (){
    fire.auth().onAuthStateChanged((user) => {
      console.log(user)
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
        if (this.state.role==='owner' && this.state.user != null){
          return (
            <div>
              <Adminhome />
            </div>
          )
        }else{
          return (
            <div>
              <Adminlogin typeuser={this.state.typeuser}/>
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




