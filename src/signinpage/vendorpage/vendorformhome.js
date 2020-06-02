import React from "react";
import fire from '../../firebase/config';
import Form from './vendorform';
import Vendorhome from "./vendorhomepage";





export default class Vendorformhome extends React.Component{
  constructor(props){
    super(props);
    this.ref = fire.firestore().collection('vendordetails');
    this.unsubscribe = null
    this.state = {
      vendorcheck : false,
      vendoremail : this.props.vendoremail
    }    
  }
  onCollectionUpdate = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const id = doc.id
      console.log(id)
     
      if (this.state.vendoremail===id){
          this.setState({vendorcheck: true})
      }
      console.log(this.state.vendorcheck)

    });
    
  }

  componentDidMount(){
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  
  render(){
    var openuserpage = ()=>{
      if (this.state.vendorcheck == true){
        return (
          <div>
            <Vendorhome vendoremail={this.state.vendoremail}/>
          </div>
        )
      }else{
        return (
          <div>
            <Form vendoremail = {this.state.vendoremail}/>
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




