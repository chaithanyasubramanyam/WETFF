import React, {Component} from 'react';
import fire from '../../firebase/config';
import './adminhomepage.css';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import {Container,Col,Row} from 'react-bootstrap';





class Adminhome extends Component {
  constructor(props){
    super(props);
    this.msge = 'hello Admin';
    this.ref1 = fire.firestore().collection('user');
    this.ref2 = fire.firestore().collection('vendor');
    this.ref3 = fire.firestore().collection('admin');
    this.unsubscribe1 = null;
    this.unsubscribe2 = null;
    this.unsubscribe3 = null;
    this.state = {
      userdata : {},
      admindata : {},
      upadmindata : {}
    };
  }

  onCollectionUpdate1 = (querySnapshot) => {
    const userdata = {};
    const admindata = this.state.admindata
    querySnapshot.forEach((doc) => {
      const { Billimgurl,Brand, Class,
        Model,
        Monthyear,
        Uploadimgurl } = doc.data();
      const id = doc.id;
      userdata[id] = {Billimgurl,Brand, Class,
        Model,
        Monthyear,
        Uploadimgurl}
      admindata[id] = {vinp1:'', vinp2:'',vinp3:''} 
    });
    
    this.setState({userdata:userdata});
    this.setState({admindata:admindata})
    console.log(this.state.userdata)
  }

  onCollectionUpdate2 = (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const { vinp1, vinp2, vinp3 } = doc.data();
      const id = doc.id
      this.state.userdata[id]['vinp1'] = vinp1
      this.state.userdata[id]['vinp2'] = vinp2
      this.state.userdata[id]['vinp3'] = vinp3
    });
    this.setState({userdata:this.state.userdata});
    console.log(this.state.userdata)
  }

  onCollectionUpdate3 = (querySnapshot) => {
    let upadmindata = this.state.upadmindata
    querySnapshot.forEach((doc) => {
      console.log(this.state.userdata[doc.id])
      upadmindata[doc.id] = JSON.parse(JSON.stringify(this.state.userdata[doc.id]))
      delete this.state.userdata[doc.id]
      console.log(upadmindata)
    });
    
    this.setState({userdata:this.state.userdata})
    this.setState({upadmindata: upadmindata})
    this.unsubscribe3() 
  }

  handleChange=(e,id,inp)=>{

    let st = this.state.admindata
    if(st[id]){
      st[id][inp] = e.target.value
    }else{
      st[id] = {[inp]:e.target.value}
    }

    this.setState({admindata:st})
 
  }

  componentDidMount() {
    this.unsubscribe1 = this.ref1.onSnapshot(this.onCollectionUpdate1);
    this.unsubscribe2 = this.ref2.onSnapshot(this.onCollectionUpdate2);  
    this.unsubscribe3 = this.ref3.onSnapshot(this.onCollectionUpdate3); 
    
  }

  

  adminsubmit=(e,id,index)=>{
    e.preventDefault();
    
    let upadmindata = this.state.upadmindata
    upadmindata[id] = JSON.parse(JSON.stringify(this.state.userdata[id]))
    delete this.state.userdata[id]
    this.setState({userdata:this.state.userdata})
    this.setState({upadmindata: upadmindata})
    console.log(this.state.upadmindata)
    const adminsub = this.state.admindata[id]
      
    fire.firestore().collection('admin').doc(id).set({
              vinp1 : adminsub.vinp1,
              vinp2 : adminsub.vinp2,
              vinp3 : adminsub.vinp3

  })
  }
  changesubmit=(e,id,index)=>{
    e.preventDefault();
    const adminsub = this.state.admindata[id]
      
    fire.firestore().collection('admin').doc(id).set({
              vinp1 : adminsub.vinp1,
              vinp2 : adminsub.vinp2,
              vinp3 : adminsub.vinp3
  })
  }

  

  

  adminlogout = () => {
    fire.auth().signOut();
  }
    
  render(props){
   
      return (
          
          <div>
            <nav className='nav1'>
                <div className='homelogout' onClick={this.adminlogout}>Logout</div>
                <Link to='#'><div className='toggle'><i class="fa fa-bars fa-2x"></i></div></Link>
                <Link to='#'><div className='togglebtn'><i class="fa fa-bars"></i></div></Link>
                    <ul className='honavul'>
                        <li><a href='#' className='homeactive'>Home</a></li>
                        <li><a href='#'>bcdef</a></li>
                        <li><a href='#'>cdefg</a></li>
                    </ul>
                </nav>
            <div className='nav2'>
                <div className='nav2img'>
                <Link to = '#'
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
                <option value="location">America</option>
                <option value="location">England</option>
                <option value="location">Dubai</option>
                </select>
                </div>
                </div>
            
            <Table responsive className="admintable">
            <thead>
            <tr>
          
            <th>Brand</th>
            <th>Class</th>
            <th>Model</th>
            <th>Monthyear</th>
            <th colSpan="2">Images</th>
            <th>value</th>
            <th>depr</th>
            <th>salvage</th>
            <th>value</th>
            <th>depr</th>
            <th>salvage</th>
            <th>submit</th>
            </tr>
              </thead>
              
              <tbody>
                {Object.keys(this.state.userdata).map((key,index) =>
                  <tr>
                    <td>{this.state.userdata[key].Brand}</td>
                    <td>{this.state.userdata[key].Class}</td>
                    <td>{this.state.userdata[key].Model}</td>
                    <td>{this.state.userdata[key].Monthyear}</td>
                    <td><a href={this.state.userdata[key].Uploadimgurl}>image1</a></td>
                    <td><a href={this.state.userdata[key].Billimgurl}>image2</a></td>
                    <td>{this.state.userdata[key].vinp1}</td>
                    <td>{this.state.userdata[key].vinp2}</td>
                    <td>{this.state.userdata[key].vinp3}</td>

                    
                    <td><div><input type='number' className='vendorinp'  onChange={e=>this.handleChange(e,key,'vinp1')}
                    value = {this.state.admindata[key]['vinp1']}
                    name='vendorinp1' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,key,'vinp2')}
                     value = {this.state.admindata[key]['vinp2']}
                    name='vendorinp2' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,key,'vinp3')}
                     value = {this.state.admindata[key]['vinp3']}
                     name='vendorinp3' />
                    </div></td>
                    <td><div><input type='submit' className='vendorsubmit' onClick={e=>this.adminsubmit(e,key,index)}/>
                    </div></td>
                  </tr>
                )}
                
          
              </tbody>
              </Table>

              <Table responsive className="vendortable">
              <thead>
                <tr>
          
                <th>Brand</th>
                <th>Class</th>
                <th>Model</th>
                <th>Monthyear</th>
                <th colSpan="2">Images</th>
                <th>value</th>
                <th>depr</th>
                <th>salvage</th>
                <th>value</th>
                <th>depr</th>
                <th>salvage</th>
            <th>submit</th>
            </tr>
              </thead>

              <tbody>
                {Object.keys(this.state.upadmindata).map((key,index) =>
                  <tr>
                    <td>{this.state.upadmindata[key].Brand}</td>
                    <td>{this.state.upadmindata[key].Class}</td>
                    <td>{this.state.upadmindata[key].Model}</td>
                    <td>{this.state.upadmindata[key].Monthyear}</td>
                    <td><a href={this.state.upadmindata[key].Uploadimgurl}>image1</a></td>
                    <td><a href={this.state.upadmindata[key].Billimgurl}>image2</a></td>
                    <td>{this.state.upadmindata[key].vinp1}</td>
                    <td>{this.state.upadmindata[key].vinp2}</td>
                    <td>{this.state.upadmindata[key].vinp3}</td>

                    
                    <td><div><input type='number' className='vendorinp'  onChange={e=>this.handleChange(e,key,'vinp1')}
                    name='vendorinp1' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,key,'vinp2')}
                    name='vendorinp2' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,key,'vinp3')}
                     name='vendorinp3' />
                    </div></td>
                    <td><div><input type='submit' className='vendorsubmit' onClick={e=>this.changesubmit(e,key,index)} value='change'/>
                    </div></td>
                  </tr>
                )}
                
          
              </tbody>

              

              </Table>
                              
              <button className='' onClick={this.adminlogout}>Logout</button>
              
              {/* Mobile Version */}

              {Object.keys(this.state.userdata).map((key,index)=>
                    <div className='mobtable'>
                
              <Container className='mobcontainer'>
                    <Row className='mobtablerow'>
                    <Col>{this.state.userdata[key].Brand}</Col>
                    <Col>{this.state.userdata[key].Class}</Col>
                    <Col>{this.state.userdata[key].Model}</Col>
                    </Row>
                    <Row className='mobtablerow'>
                    <Col>{this.state.userdata[key].Monthyear}</Col>
                    <Col><a href={this.state.userdata[key].Uploadimgurl}>image1</a></Col>
                    <Col><a href={this.state.userdata[key].Billimgurl}>image2</a></Col>
                    </Row>
                    <Row className='mobtablerow'>
                        <Col>{this.state.userdata[key].vinp1}</Col>
                        <Col>{this.state.userdata[key].vinp2}</Col>
                        <Col>{this.state.userdata[key].vinp3}</Col>
                    </Row>

                    <Row className='mobtablerow'>
                    <Col><input type='number' className='vendorinp'  onChange={e=>this.handleChange(e,key,'vinp1')}
                    value = {this.state.admindata[key]['vinp1']}
                    name='vendorinp1' /></Col>
                    <Col><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,key,'vinp2')}
                     value = {this.state.admindata[key]['vinp2']}
                    name='vendorinp2' /></Col>
                    <Col><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,key,'vinp3')}
                     value = {this.state.admindata[key]['vinp3']}
                     name='vendorinp3' /></Col>
                    </Row>
                    <Row className='mobtablerow'>
                    <Col></Col>
                    <Col><input type='submit' className='vendorsubmit' onClick={e=>this.adminsubmit(e,key,index)}/></Col>
                    <Col></Col>
                   
                    </Row>
      
                    </Container>
                  
                    </div>
                     )}

                    <div className='mobvalued'><div className='mobvalue'>VALUED</div></div>

                    {Object.keys(this.state.upadmindata).map((key,index)=>
                    <div className='mobtable'>
                
                    <Container className='mobcontainer'>
                    <Row className='mobtablerow'>
                    <Col>{this.state.upadmindata[key].Brand}</Col>
                    <Col>{this.state.upadmindata[key].Class}</Col>
                    <Col>{this.state.upadmindata[key].Model}</Col>
                    </Row>
                    <Row className='mobtablerow'>
                    <Col>{this.state.upadmindata[key].Monthyear}</Col>
                    <Col><a href={this.state.upadmindata[key].Uploadimgurl}>image1</a></Col>
                    <Col><a href={this.state.upadmindata[key].Billimgurl}>image2</a></Col>
                    </Row>
                    <Row className='mobtablerow'>
                        <Col>{this.state.upadmindata[key].vinp1}</Col>
                        <Col>{this.state.upadmindata[key].vinp2}</Col>
                        <Col>{this.state.upadmindata[key].vinp3}</Col>
                    </Row>

                    <Row className='mobtablerow'>
                    <Col><input type='number' className='vendorinp'  onChange={e=>this.handleChange(e,key,'vinp1')}
                    name='vendorinp1' /></Col>
                    <Col><input type='number' className='vendorinp'  onChange={e=>this.handleChange(e,key,'vinp2')}
                    name='vendorinp2' /></Col>
                    <Col><input type='number' className='vendorinp'  onChange={e=>this.handleChange(e,key,'vinp3')}
                    name='vendorinp3' /></Col>
                    </Row>
                    <Row className='mobtablerow'>
                    <Col></Col>
                    <Col><input type='submit' className='vendorsubmit' onClick={e=>this.changesubmit(e,key,index)} value='change'/></Col>
                    <Col></Col>
                   
                    </Row>
      
                    </Container>
                  
                    </div>
                     )}

            
          
              

            
          </div>
      )}
}





export default Adminhome;