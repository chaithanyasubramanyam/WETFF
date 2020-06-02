import React, {Component} from 'react';
import fire from '../../firebase/config';
import './vendorhomepage.css';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import {Container,Col,Row} from 'react-bootstrap';



class Vendorhome extends Component {
  constructor(props){
    super(props);
    this.ref = fire.firestore().collection('user');
    this.refven = fire.firestore().collection('vendor');
    this.unsubscribe = null;
    this.unsubscribeven = null;
    this.state = {
      vendoremail : this.props.vendoremail,
      userdata : [],
      vendordata: {},
      vinp1 : '',
      vinp2 : '',
      vinp3 : '',
      updateduserdata: [],
     
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const userdata = [];
    const vendordata = this.state.vendordata;
    querySnapshot.forEach((doc) => {
      const {
        Billimgurl,Brand, Class,
      Model,
      Monthyear,
      Uploadimgurl,
      } = doc.data();
      userdata.push({Billimgurl,Brand, Class,
        Model,
        Monthyear,
        Uploadimgurl,
        id : doc.id,
      });
      vendordata[doc.id] = {vinp1:'',vinp2:'',vinp3:''}
    });

    this.setState({vendordata:vendordata});
    this.setState({userdata:userdata});
  }
  onCollectionUpdateven = (querySnapshot) =>{
    querySnapshot.forEach((doc) => {
      this.state.userdata.map((data,index)=>{
        if (data.id === doc.id){
          let remove = this.state.userdata.splice(index,1)
          this.state.updateduserdata.push(remove[0])
        }
      })
      });
    this.setState({userdata: this.state.userdata});
    this.setState({updateduserdata: this.state.updateduserdata})
  }




  handleChange=(e,id,inp)=>{
    
    let st = this.state.vendordata
    if(st[id]){
      st[id][inp] = e.target.value
    }else{
      st[id] = {[inp]:e.target.value}
    }

    this.setState({vendordata:st})
 
  }
  

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.unsubscribeven =  this.refven.onSnapshot(this.onCollectionUpdateven)
    
  }


  vendorsubmit=(e,id,index)=>{
    e.preventDefault();
    
    let updateduserdata = this.state.updateduserdata
    let removed = this.state.userdata.splice(index,1)
    updateduserdata.push(removed[0])
    
    this.setState({userdata:this.state.userdata,updateduserdata:updateduserdata})

    const vendorsub = this.state.vendordata[id]
      
    fire.firestore().collection('vendor').doc(id).set({
              vinp1 : vendorsub.vinp1,
              vinp2 : vendorsub.vinp2,
              vinp3 : vendorsub.vinp3

  })
  }

  changesubmit=(e,id)=>{
    e.preventDefault();
    

    const vendorsub = this.state.vendordata[id]
      
    fire.firestore().collection('vendor').doc(id).set({
              vinp1 : vendorsub.vinp1,
              vinp2 : vendorsub.vinp2,
              vinp3 : vendorsub.vinp3

  })
  }

  

  

  

  vendorlogout = () => {
    fire.auth().signOut();
  }
    
  render(props){
      return (
          
          <div>
            <nav className='nav1'>
                <div className='homelogout' onClick={this.vendorlogout}>Logout</div>
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
            <th>sort</th>
            </tr>
              </thead>
              
              <tbody>
                {this.state.userdata.map((data,index) =>
                  <tr key={index}>
                   <td>{data.Brand}</td>
                    <td>{data.Class}</td>
                    <td>{data.Model}</td>
                    <td>{data.Monthyear}</td>
                    <td><a href={data.Billimgurl}>image1</a></td>
                    <td><a href={data.Uploadimgurl}>image2</a></td>
                    <td><div><input type='number' className='vendorinp' value={this.state.vendordata[data.id]['vinp1']} onChange={e=>this.handleChange(e,data.id,'vinp1')}
                    name='vendorinp1' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' value={this.state.vendordata[data.id]['vinp2']} onChange={e=>this.handleChange(e,data.id,'vinp2')}
                    name='vendorinp2' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' value={this.state.vendordata[data.id]['vinp3']} onChange={e=>this.handleChange(e,data.id,'vinp3')}
                     name='vendorinp3' />
                    </div></td>
                    <td><div><input type='submit' className='vendorsubmit' onClick={e=>this.vendorsubmit(e,data.id,index)} value={data.sub}/>
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
            <th>submit</th>
            </tr>
              </thead>

              <tbody>
                {this.state.updateduserdata.map((data,index) =>
                  <tr key={index}>
                    
                    <td>{data.Brand}</td>
                    <td>{data.Class}</td>
                    <td>{data.Model}</td>
                    <td>{data.Monthyear}</td>
                    <td><a href={data.Billimgurl}>image1</a></td>
                    <td><a href={data.Uploadimgurl}>image2</a></td>
                    <td><div><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,data.id,'vinp1')}
                    name='vendorinp1' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,data.id,'vinp2')}
                    name='vendorinp2' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp'onChange={e=>this.handleChange(e,data.id,'vinp3')}
                    name='vendorinp3' />
                    </div></td>
                    <td><div><input type='submit' className='vendorsubmit' onClick={e=>this.changesubmit(e,data.id,index)} value='Change'/>
                    </div></td>

                 </tr>
                  )}
                  </tbody>

              </Table>

              

              {/* MOBILEVERSION */}

              
              {this.state.userdata.map((data,index) => 
              <div className='mobtable'>
                
              <Container className='mobcontainer'>
              <Row className='mobtablerow'>
              <Col>{data.Brand}</Col>
              <Col>{data.Class}</Col>
              <Col>{data.Model}</Col>
              </Row>
              <Row className='mobtablerow'>
              <Col>{data.Monthyear}</Col>
              <Col><a href={data.Billimgurl}>image1</a></Col>
              <Col><a href={data.Uploadimgurl}>image2</a></Col>
              </Row>
              <Row className='mobtablerow'>
              <Col><input type='number' className='vendorinp' value={this.state.vendordata[data.id]['vinp1']} onChange={e=>this.handleChange(e,data.id,'vinp1')}
                    name='vendorinp1' /></Col>
              <Col><input type='number' className='vendorinp' value={this.state.vendordata[data.id]['vinp2']} onChange={e=>this.handleChange(e,data.id,'vinp2')}
                    name='vendorinp2' /></Col>
              <Col><input type='number' className='vendorinp' value={this.state.vendordata[data.id]['vinp3']} onChange={e=>this.handleChange(e,data.id,'vinp3')}
                     name='vendorinp3' /></Col>
              </Row>
              <Row className='mobtablerow'>
              <Col></Col>
              <Col><input type='submit' className='vendorsubmit' onClick={e=>this.vendorsubmit(e,data.id,index)} value={data.sub}/></Col>
              <Col></Col>
             
              </Row>

              </Container>
            
              </div>
              )}
              

              <div className='mobvalued'><div className='mobvalue'>VALUED</div></div>









              {this.state.updateduserdata.map((data,index) => 
              <div className='mobtable'>
                
              <Container className='mobcontainer'>
              <Row className='mobtablerow'>
              <Col>{data.Brand}</Col>
              <Col>{data.Class}</Col>
              <Col>{data.Model}</Col>
              </Row>
              <Row className='mobtablerow'>
              <Col>{data.Monthyear}</Col>
              <Col><a href={data.Billimgurl}>image1</a></Col>
              <Col><a href={data.Uploadimgurl}>image2</a></Col>
              </Row>
              <Row className='mobtablerow'>
              <Col><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,data.id,'vinp1')}
                    name='vendorinp1' /></Col>
              <Col><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,data.id,'vinp2')}
                    name='vendorinp2' /></Col>
              <Col><input type='number' className='vendorinp'onChange={e=>this.handleChange(e,data.id,'vinp3')}
                    name='vendorinp3' /></Col>
              </Row>
              <Row className='mobtablerow'>
              <Col></Col>
              <Col><input type='submit' className='vendorsubmit' onClick={e=>this.changesubmit(e,data.id,index)} value='Change'/></Col>
              <Col></Col>
             
              </Row>

              </Container>
            
              </div>
              )}
              
              
              <button className='' onClick={this.vendorlogout}>Logout</button>
            

            
          </div>
      )}
}





export default Vendorhome;