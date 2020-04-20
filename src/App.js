import React from 'react';
import Homepage from './homepage/homepage'
import Collar from './Collarpage/collarpage'
import {Switch,Route,Redirect} from 'react-router-dom'

    

export default class App extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path = "/" component ={Homepage}/>
                <Route exact path = "/collar" component ={Collar}/>
            </Switch>
        )
    }
}
