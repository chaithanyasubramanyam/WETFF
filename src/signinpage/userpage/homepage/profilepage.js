import React from 'react';
import './profilepage.css';
import fire from '../../../firebase/config';
import {Link} from 'react-router-dom';




export default class Profilepage extends React.Component{
    constructor(props){
        super(props);
       
    }

    logout = () => {
        fire.auth().signOut();
    }
    render(){
        return(
            <div><div className='profiletitle'>
            <span class="material-icons"><img  class="imgicon"
             src="https://ak7.picdn.net/shutterstock/videos/1034288927/thumb/6.jpg" 
             height="30%" width="30%"/></span>
             <h4>MRIDUL MANHAS </h4> 
             </div>
        <a href="#" class="navbar__link">
            <span class="material-icons">account_box</span>Profiles and IDs
        </a>
        <a href="#" class="navbar__link">
            <span class="material-icons">verified_user</span>Verification/validation status
        </a>
        <a href="#" class="navbar__link">
            <span class="material-icons">feedback</span>Help & Feedback
        </a>
        <a href="#" class="navbar__link">
            <span class="material-icons">bookmark</span>Prospective Wishlist
        </a>
        <a href="#" class="navbar__link">
            <span class="material-icons">settings</span>Settings
        </a>
        <a href="#" class="navbar__link">
            <span class="material-icons">info</span>Theory/Market info
        </a>
        <a href="#" class="navbar__link">
            <span class="material-icons">track_changes</span>Credit score
        </a>
        <button className='usersignout' onClick={this.logout}><Link to='/'>Signout</Link></button>


            </div>
        )
    }
}
