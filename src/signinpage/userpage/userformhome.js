import React from "react";
import fire from '../../firebase/config';
import Form from './userform';
import Homepage from "./homepage/homepage"





export default class Userformhome extends React.Component{
  constructor(props){
    super(props);
    this.ref = fire.firestore().collection('userdetails');
    this.unsubscribe = null
    this.state = {
      usercheck : false,
      useremail : this.props.useremail
    }    
  }
  onCollectionUpdate = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const id = doc.id
      console.log(id)
     
      if (this.state.useremail===id){
          this.setState({usercheck: true})
      }
      console.log(this.state.usercheck)

    });
    
  }

  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  
  render(){
    var openuserpage = ()=>{
      if (this.state.usercheck == true){
        return (
          <div>
            <Homepage useremail={this.state.useremail}/>
          </div>
        )
      }else{
        return (
          <div>
            <Form useremail = {this.state.useremail}/>
          </div>
        )

      }
    }
      return (
          <div>
            {openuserpage()}
          </div>
      )}
}




