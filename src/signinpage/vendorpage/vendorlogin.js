import React, {Component} from 'react';
import fire from '../../firebase/config';
import './vendorlogin.css'

class Vendorlogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            typeuser:this.props.typeuser,
            email : '',
            password : '',
            fireErrors : '',
            formtitle : 'Vendor Login',
            loginbtn : true,
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
        
        
    }

        
    


    register = async e =>{
        e.preventDefault();
        await fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch((error)=>{
            this.setState({fireErrors: error.message})
        }).then((user)=>{
            const adduserrole = fire.functions().httpsCallable('userrole');
            adduserrole({uid: user.user.uid , role: 'vendor' })
        }).then(()=>{
            fire.auth().signOut();
        })
    }

    googlelog = async e =>{
        e.preventDefault();
        var provider = new fire.auth.GoogleAuthProvider();
        await fire.auth().signInWithPopup(provider).then((result)=>{
            var token = result.credential.accessToken;
            var user = result.user;
            user.getIdTokenResult().then(idtokenresult=>{
                if(idtokenresult.claims.role){
                    console.log(idtokenresult.claims.role)
                    window.location.reload(true);
                }else{
                    console.log(user)
                    this.setState({fireErrors: 'Please wait'})
                    const adduserrole = fire.functions().httpsCallable('userrole');
                    adduserrole({uid: user.uid , role: 'vendor' })
                    this.setState({fireErrors: 'You are a vendor now. Please login again'})
                }
              })
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
            (<input type = 'submit' className="loginBtn" onClick={this.register} value='register'/>)

        let login_register = this.state.loginbtn?
        (<button className='registerBtn' onClick ={()=> this.getAction('reg')}>Register</button>) :
        (<button className='registerBtn' onClick ={()=> this.getAction('log')}>login</button>)  

        return(
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
        )
    }

}


  




export default Vendorlogin;
