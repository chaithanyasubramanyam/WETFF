import React from 'react';
import './collarpage.css';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
import fire from '../../../firebase/config'
// import { MonthSelector } from 'react-bootstrap-month-selector';



export default class Collar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            useremail : this.props.location.state.useremail,
            Class : '',
            Brand : '',
            Model : '',
            Monthyear: '',
            Uploadimg: '',
            Billimg : '',
            Uploadimgurl: '',
            progressupload: 0,
            Billimgurl : '',
            progressbill: 0,
        }
    }

    handleChange= e=>{
        this.setState({[e.target.name]: e.target.value });
    }

    handleChange2 = e =>{
        if (e.target.files[0]){
            this.setState({Uploadimg : e.target.files[0]})
        }      
    }
    handleChange1 = e =>{
        if (e.target.files[0]){
            this.setState({Billimg : e.target.files[0]})
        }
    }
    retrive = (e) => {
        e.preventDefault();
        
        const uploadimg = this.state.Uploadimg
        const uploadimgtask =  fire.storage().ref(`uploadimg/${uploadimg.name}`).put(uploadimg);
        uploadimgtask.on('state_changed',
        (snapshot) => {
            const progressupload = (snapshot.bytesTransferred/snapshot.totalBytes)*100;           
            this.setState({progressupload})
        },
        (error) => {
            console.log(error)
        }
        ,()=>{
            fire.storage().ref('uploadimg').child(uploadimg.name).getDownloadURL().then(url =>{
                this.setState({Uploadimgurl:url})
                console.log(this.state.Uploadimgurl)
           })
        })

        const Billimg = this.state.Billimg
        const Billtask =  fire.storage().ref(`Billimg/${Billimg.name}`).put(Billimg);
        Billtask.on('state_changed',
        (snapshot) => {
            const progressbill = (snapshot.bytesTransferred/snapshot.totalBytes)*100;           
            this.setState({progressbill})
        },
        (error) => {
            console.log(error)
        }
        ,()=>{
            fire.storage().ref('Billimg').child(Billimg.name).getDownloadURL().then(url =>{
               
                this.setState({Billimgurl:url})
                console.log(this.state.Billimgurl)
           })
        })

    }

    submitcollar = (e) => {
        e.preventDefault()
        fire.firestore().collection('user').doc(this.state.useremail).set({
            Class : this.state.Class,
            Brand : this.state.Brand,
            Model : this.state.Model,
            Monthyear: this.state.Monthyear,
            Billimgurl: this.state.Billimgurl,
            Uploadimgurl: this.state.Uploadimgurl
        })


    }


    render(){
        return (
            <div>
                <nav className='nav1'>
                <Link to='/profile'><div className='toggle'><i class="fa fa-bars fa-2x"></i></div></Link>
                <Link to='/profile'><div className='togglebtn'><i class="fa fa-bars"></i></div></Link>
                    <ul className='honavul'>
                        <li><a href='#' className='homeactive'>Home</a></li>
                        <li><a href='#'>bcdef</a></li>
                        <li><a href='#'>cdefg</a></li>
                    </ul>
                </nav>
                <div className='collarpage'>
                <nav className='cnav1'>
                    <ul className='cnav1ul'>
                        <li><Link to = '/user/home' className="headback">Back</Link></li>
                        <li className='headcollar'>Collar</li>
                        <li className='headsecure'>secure</li>
                    </ul>
                </nav>

                <form>
                <Container className='collarcontent'>
                <Row>
        <Col className='class'>Class</Col>
                <Col className='classdropdown'>
                <select id = 'classdrop' onChange={this.handleChange} name='Class' required>
        <option value="">{this.state.Class}</option>
                <option value="adfasd">adfasd</option>
                <option value="aaddad">aaddad</option>
                <option value="asfsdf">asfsdf</option>
                </select>
                </Col>
                </Row>
                </Container>


                <Container className='collarcontent'>
                <Row>
                <Col className='class'>Brand</Col>
                <Col className='classdropdown'>
                <select id = 'classdrop'onChange={this.handleChange} name='Brand' required>
                <option value="">{this.state.Brand}</option>
                <option value="adfasd">adfasd</option>
                <option value="aaddad">aaddad</option>
                <option value="asfsdf">asfsdf</option>
                </select>
                </Col>
                </Row>
                </Container>



                <Container className='collarcontent'>
                <Row>
                <Col className='class'>Model</Col>
                <Col className='classdropdown' >
                <select id = 'classdrop' onChange={this.handleChange} name='Model' required>
                <option value="">{this.state.Model}</option>
                <option value="adfasd">adfasd</option>
                <option value="aaddad">aaddad</option>
                <option value="asfsdf">asfsdf</option>
                </select>
                </Col>
                </Row>
                </Container>

                <Container className='collarcontent'>
                    <Row>
                    <Col className='Purchase'>
                    Purchase MM/YYYY
                    </Col>
                    <Col >
    

                    <input type="month" name="Monthyear" className='monthyear'
                    onChange={this.handleChange} value={this.state.Monthyear}
                    required/>

        
                    </Col>
                    </Row>
                </Container>

                <Container className='collarcontent'>
                    <Row>
                    <Col className='collarupload'>
                    Upload img
                    </Col>
                    <Col >

                    <progress value={this.state.progressupload}/>
                    <input type="file"
                     id="uploadimg" name="Uploadimg"
                        accept="image/png, image/jpeg" onChange={this.handleChange2} required/>

            
                    </Col>
                    </Row>
                </Container>

                <Container className='collarcontent'>
                    <Row>
                    <Col className='collarBill'>
                    Bill
                    </Col>
                    <Col >

                    <progress value={this.state.progressbill}/>
                    <input type="file"
                     id="uploadBill" name="Billimg"
                        accept="image/png, image/jpeg" onChange={this.handleChange1} required/>

                    </Col>
                    </Row>
                </Container>
                
                <div className='retrive'>
                <input type="submit" className='retrivebtn' onClick={this.retrive} value='Retrive'/>
                </div>
                <div className='retrive'>
                <input type="submit" className='retrivebtn' onClick={this.submitcollar} value='submit'/>
                
                </div>
                </form>
                </div>
                
            </div>
        )
    }
}