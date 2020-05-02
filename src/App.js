import React from 'react';
// import Homepage from './homepage/homepage'
// import Collar from './Collarpage/collarpage'
import Main from './signinpage/mainpage'
import Vendorpage from './signinpage/vendorpage/vendorpage';
import Userpage from './signinpage/userpage/userpage';
import Adminpage from './signinpage/adminpage/adminpage';
import {Switch,Route,Redirect} from 'react-router-dom';
import Collar from './signinpage/userpage/Collarpage/collarpage';
import Homepage from './signinpage/userpage/homepage/homepage';
import Profilepage from './signinpage/userpage/homepage/profilepage'
    

export default class App extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path = "/" component ={Main}/>
                <Route exact path = "/Vendorlogin" component ={Vendorpage}/>
                <Route exact path = "/Userlogin" component ={Userpage}/>
                <Route exact path = "/Adminlogin" component ={Adminpage}/>
                <Route exact path = "/user/home/collar" component ={Collar}/>
                <Route exact path = "/user/home" component ={Homepage}/>
                <Route exact path = "/profile" component ={Profilepage}/>
            </Switch>
        )
    }
}
