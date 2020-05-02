import React, {Component} from 'react';
import fire from '../../firebase/config';
import './adminlogin.css'

class Adminlogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            fireErrors : '',
            formtitle : 'Admin Login',
            loginbtn : true
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange (e){
        this.setState({[e.target.name]: e.target.value });
    }

    login = async e =>{
        e.preventDefault();
        await fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error)=>{
            this.setState({fireErrors: error.message})
        })
        console.log(this.state.fireErrors)
        if (this.state.fireErrors === ''){
            fire.firestore().collection('admin').add({
                name : this.state.email,
                clge : 'IITM'
            })
        }else{
            console.log('cannot add into data')
        }
        
    }

        
    


    register = async e =>{
        e.preventDefault();
        await fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error)=>{
            this.setState({fireErrors: error.message})
        })
        console.log(this.state.fireErrors)
        if (this.state.fireErrors === ''){
            fire.firestore().collection('admin').add({
                name : this.state.email,
                clge : 'IITM'
            })
        }else{
            console.log('cannot add into data')
        }
    }

    googlelog = async e =>{
        e.preventDefault();
        var provider = new fire.auth.GoogleAuthProvider();
        await fire.auth().signInWithPopup(provider).then(function(result) {
            var token = result.credential.accessToken;

            var user = result.user;
            // ...
            console.log(token)
            console.log(user.email)
          }).catch((error)=>{
            this.setState({fireErrors: error.message})
        }) 

    }

    getAction = action => {
        if(action === 'reg'){
            this.setState({formtitle: 'Register user', loginbtn:false, fireErrors:''})
        }else{
            this.setState({formtitle: 'login', loginbtn:true, fireErrors:''})
        }
    }

    render(){
        let errornotify = this.state.fireErrors ?
            (<div className='Error'>{this.state.fireErrors}</div>) : null;

        let submitbtn = this.state.loginbtn? 
            (<input type = 'submit' className='loginBtn' onClick={this.login} value='Enter'/>) :
            (<input type = 'submit' className='loginBtn' onClick={this.register} value='Register'/>)

        let login_register = this.state.loginbtn?
        (<button className='registerBtn' onClick ={()=> this.getAction('reg')}>Register</button>) :
        (<button className='registerBtn' onClick ={()=> this.getAction('log')}>login</button>)  

        return(
            <div className='loginpage'>
            <div className="form_block">
                <div id='title'>{this.state.formtitle}</div>
                <div className='body'>
                    {errornotify}
                    <form>
                        <input type = 'text' value={this.state.email} 
                        onChange={this.handleChange} name='email' placeholder='Email'/>

                        <input type = 'password' value={this.state.password} 
                        onChange={this.handleChange} name='password'placeholder='Password'/>

                        <button className='googlelogin' onClick={this.googlelog}>Login with Google</button>

                        {submitbtn}
                    </form>
                    {login_register}
                </div>

            </div>
            </div>
        )
    }

}


  




export default Adminlogin;
