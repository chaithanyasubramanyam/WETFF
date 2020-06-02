import React from 'react';
import './homepage.css';
import PieChart from './piechart';
import Linear from './lineargraph';
import fire from '../../../firebase/config'
import {Link} from 'react-router-dom'



export default class Homepage extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            useremail : this.props.useremail
        }
    }

    homelogout=()=>{
        fire.auth().signOut()
    }



    render(){
        return(
            <div>
                <nav className='nav1'>
                <div className='homelogout' onClick={this.homelogout}>Logout</div>
                <Link to='/profile'><div className='toggle'><i class="fa fa-bars fa-2x"></i></div></Link>
                <Link to='/profile'><div className='togglebtn'><i class="fa fa-bars"></i></div></Link>
                    <ul className='honavul'>
                        <li><a href='#' className='homeactive'>Home</a></li>
                        <li><a href='#'>Market</a></li>
                        <li><a href='#'>Value</a></li>
                    </ul>
                    
                </nav>
            <div className='nav2'>
                <div className='nav2img'>
                <Link to = {{ pathname:  '/user/home/collar', state: {useremail:this.state.useremail }}} 
                className="nav2logo">
                    +</Link>
                </div>
                <div className='nav2srch'>
                    <input className='searchtxt' type='txt' placeholder='search here'/>
                    <a href='#' className='searchBtn'><i class="fa fa-search"></i></a>

                </div>
                <div className='nav2drop'>
                <select id="location" >
                <option value="location">Location</option>
                <option value="location">India</option>
                <option value="location">US</option>
                <option value="location">UK</option>
                <option value="location">Canada</option>
                <option value="location">Germany</option>
                <option value="location">Europe</option>
                </select>
                </div>
        
                </div>
                <div className='totalpagecontent'>

                <div className='pagecontent'>
                    <div className='valuebox'>
                    <div className='value'>
                        Value
                    </div>
                    <div className='valuemoney'>
                    ₹10000
                    </div>
                </div>
                </div>
                
                <div className='piechartback'>
                <PieChart/>
                </div>

                <div className='cashflow'>
                    cashflow <br/> ₹1000
                </div>
                <div className='linearback'>

                
                <h1 className='linearchartheading'>Interactive Graph </h1>
                <div className='lineargraph'>
                <Linear/>
                </div>
                </div>
                </div>


               

        </div>
        )
    }
}
