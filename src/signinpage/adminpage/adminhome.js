import React, {Component} from 'react';
import fire from '../../firebase/config';
import './adminhomepage.css';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap';




class Adminhome extends Component {
  constructor(props){
    super(props);
    this.msge = 'hello Admin';
    this.ref1 = fire.firestore().collection('user');
    this.ref2 = fire.firestore().collection('vendor');
    this.unsubscribe1 = null;
    this.unsubscribe2 = null;
    this.state = {
      userdata : {},
      vendordata : {}
    };
    
   
  }

  onCollectionUpdate1 = (querySnapshot) => {
    const userdata = {};
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
      
    });
    this.setState({userdata});
    console.log(this.state.userdata);
    console.log(Object.keys(this.state.userdata))
    
  }

  onCollectionUpdate2 = (querySnapshot) => {
    const vendordata = {};
    querySnapshot.forEach((doc) => {
      const { vinp1, vinp2, vinp3 } = doc.data();
      const id = doc.id
      vendordata[id] = {vinp1,vinp2,vinp3}

    });
    this.setState({vendordata});
    console.log(Object.keys(this.state.vendordata))
  }

  componentDidMount() {
    this.unsubscribe1 = this.ref1.onSnapshot(this.onCollectionUpdate1);
    this.unsubscribe2 = this.ref2.onSnapshot(this.onCollectionUpdate2);
    
  }

  

  

  

  logout = () => {
    fire.auth().signOut();
  }
    
  render(props){
   
      return (
          
          <div>
            <nav className='nav1'>
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
                {Object.keys(this.state.vendordata).map((key) =>
                  <tr>
                    <td>{this.state.userdata[key].Brand}</td>
                    <td>{this.state.userdata[key].Class}</td>
                    <td>{this.state.userdata[key].Model}</td>
                    <td>{this.state.userdata[key].Monthyear}</td>
                    <td><a href={this.state.userdata[key].Uploadimgurl}>image1</a></td>
                    <td><a href={this.state.userdata[key].Billimgurl}>image2</a></td>

                    <td>{this.state.vendordata[key].vinp1}</td>
                    <td>{this.state.vendordata[key].vinp2}</td>
                    <td>{this.state.vendordata[key].vinp3}</td> 
                    <td><div><input type='number' className='vendorinp' 
                    name='vendorinp1' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' 
                    name='vendorinp1' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' 
                    name='vendorinp1' />
                    </div></td>
                    
                    <td><div><input type='submit' className='vendorsubmit' />
                    </div></td>
                  </tr>
                )}
                
          
              </tbody>
              </Table>
            

            
          
              
            <button onClick={this.logout}>logout</button>
            
          </div>
      )}
}





export default Adminhome;