import React from 'react';
import './collarpage.css';
import {Link} from 'react-router-dom';
import {Container, Row, Col, Button} from 'react-bootstrap';
// import { MonthSelector } from 'react-bootstrap-month-selector';



export default class Collar extends React.Component{
    render(){
        return (
            <div>
                <div className='collarpage'>
                <nav className='cnav1'>
                    <ul className='cnav1ul'>
                        <li><Link to = '/' className="headback">Back</Link></li>
                        <li className='headcollar'>Collar</li>
                        <li className='headsecure'>secure</li>
                    </ul>
                </nav>


                <Container className='collarcontent'>
                <Row>
                <Col className='class'>Class</Col>
                <Col className='classdropdown'>
                <select id = 'classdrop'>
                <option value="class">     </option>
                <option value="class">adfasd</option>
                <option value="class">aaddad</option>
                <option value="class">asfsdf</option>
                </select>
                </Col>
                </Row>
                </Container>


                <Container className='collarcontent'>
                <Row>
                <Col className='class'>Brand</Col>
                <Col className='classdropdown'>
                <select id = 'classdrop'>
                <option value="class">     </option>
                <option value="class">adfasd</option>
                <option value="class">aaddad</option>
                <option value="class">asfsdf</option>
                </select>
                </Col>
                </Row>
                </Container>



                <Container className='collarcontent'>
                <Row>
                <Col className='class'>Model</Col>
                <Col className='classdropdown'>
                <select id = 'classdrop'>
                <option value="class">     </option>
                <option value="class">adfasd</option>
                <option value="class">aaddad</option>
                <option value="class">asfsdf</option>
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
                    <form>

                    <input type="month" name="purchase" className='monthyear'/>

                    </form>
                    </Col>
                    </Row>
                </Container>

                <Container className='collarcontent'>
                    <Row>
                    <Col className='collarupload'>
                    Upload img
                    </Col>
                    <Col >
                    <form>

                    <input type="file"
                     id="uploadimg" name="avatar"
                        accept="image/png, image/jpeg"/>

                    </form>
                    </Col>
                    </Row>
                </Container>

                <Container className='collarcontent'>
                    <Row>
                    <Col className='collarBill'>
                    Bill
                    </Col>
                    <Col >
                    <form>

                    <input type="file"
                     id="uploadBill" name="avatar"
                        accept="image/png, image/jpeg"/>

                    </form>
                    </Col>
                    </Row>
                </Container>
                <div className='retrivebtn'>
                <Button variant="primary"><div  className='retrive'>Retrive</div></Button>
                </div>
                </div>
            </div>
        )
    }
}