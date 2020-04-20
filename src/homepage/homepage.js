import React from 'react';
import './homepage.css';
import Apple from './download.png';
import PieChart from './piechart';
import Linear from './lineargraph';
import Collar from '../Collarpage/collarpage'
import {Link} from 'react-router-dom'



export default class Homepage extends React.Component{
    render(){
        return(
            <div>
                <nav className='nav1'>
                <a href='#' className='toggle'><i class="fa fa-bars"></i></a>
                    <ul className='honavul'>
                        <li><a href='#' className='homeactive'>Home</a></li>
                        <li><a href='#'>bcdef</a></li>
                        <li><a href='#'>cdefg</a></li>
                    </ul>
                </nav>
            <div className='nav2'>
                <div className='nav2img'>
                <Link to = '/collar' className="nav2logo">+</Link>
                </div>
                {/* <div className='medialoc'>Location</div> */}
                <div className='nav2search'>
                    
                    <input className='searchtxt'type="text" placeholder="search here"/>
                        <a href='#' className='searchbtn'><i class="fa fa-search"></i></a>
                </div>
                <div className='nav2drop'>
                <select id="location">
                <option value="location">Location</option>
                <option value="location">America</option>
                <option value="location">England</option>
                <option value="location">Dubai</option>
                </select>
                </div>
                <div className='nav2join'>
                    <a href='#'>join now</a>
                </div>
                <div className='nav2sign'>
                    <a href='#'>sign in</a>
                </div>
                </div>

                {/* <div className='nav2searchmedia'>
                    
                    <input className='searchtxtmedia'type="text" placeholder="search here"/>
                        <a href='#' className='searchbtnmedia'><i class="fa fa-search" ></i></a>
                </div> */}
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

                
                <h1 className='linearchartheading'>INT Graph </h1>
                <div className='lineargraph'>
                <Linear/>
                </div>
                </div>
                </div>
               

        </div>
        )
    }
}
