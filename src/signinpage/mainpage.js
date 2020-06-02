import React from 'react';
import './mainpage.css';
import ReactTypingEffect from 'react-typing-effect';
import {Link} from 'react-router-dom';



export default class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            textheading : 'Welcome...'
        }
    }

    
            


    
    
    

    render(){
        return(
            <div>
                <div className='mainpagecontent'>
        <h1 className="h11"><ReactTypingEffect
                       typingDelay='2000' text={this.state.textheading} eraseDelay='100000'/></h1>
                <div className="mainpage">
                
                <div className="userlog">
                <Link to = {{ pathname:  '/Userlogin', state: {typeuser: 'user' }}} className="userlog1"><div >Login as USER</div> </Link>
                </div> 
                </div> 
                


                <div className="admin">
                <Link to = {{ pathname:  '/Adminlogin', state: {typeuser: 'admin' }}} className="adminlog"><div >Login as ADMIN</div> </Link>
                
                </div>
                <div className="vendor">
                <Link to = {{ pathname:  '/Vendorlogin', state: {typeuser: 'vendor' }}} className="vendorlog"><div >Login as VENDOR</div> </Link>
                
                </div>


                </div>

                </div>
        )
    }
}
