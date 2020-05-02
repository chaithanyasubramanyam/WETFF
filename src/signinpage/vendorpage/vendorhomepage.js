import React, {Component} from 'react';
import fire from '../../firebase/config';
import './vendorhomepage.css';
import {Link} from 'react-router-dom';
import {Table} from 'react-bootstrap'


class Vendorhome extends Component {
  constructor(props){
    super(props);
    this.ref = fire.firestore().collection('user');
    this.unsubscribe = null;
    
    this.state = {
      vendoremail : this.props.vendoremail,
      userdata : [],
      vendordata: {},
      vinp1 : '',
      vinp2 : '',
      vinp3 : '',
     
    };
    
   
  }

  onCollectionUpdate = (querySnapshot) => {
    const userdata = [];

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
        sub : 'submit'
      });
    });
    this.setState({userdata:userdata});
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
  }


  vendorsubmit=(e,id,sub)=>{

    e.preventDefault();
    
    const vendorsub = this.state.vendordata[id]
    console.log(vendorsub)
    console.log(this.state.userdata.map((data)=>{
      if(data.id === id){
        return data.sub
      }
    }))
    fire.firestore().collection('vendor').doc(id).set({
              vinp1 : vendorsub.vinp1,
              vinp2 : vendorsub.vinp2,
              vinp3 : vendorsub.vinp3

  })
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
                    <td><div><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,data.id,'vinp1')}
                    name='vendorinp1' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp' onChange={e=>this.handleChange(e,data.id,'vinp2')}
                    name='vendorinp2' />
                    </div></td>
                    <td><div><input type='number' className='vendorinp'onChange={e=>this.handleChange(e,data.id,'vinp3')}
                     name='vendorinp3' />
                    </div></td>
                    <td><div><input type='submit' className='vendorsubmit' onClick={e=>this.vendorsubmit(e,data.id,'sub')} value={data.sub}/>
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

              </Table>


            
            <button onClick={this.logout}>logout</button>
            
          </div>
      )}
}





export default Vendorhome;