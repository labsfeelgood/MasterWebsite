import Header from '../components/Header'
import Meta from '../components/Meta'
import { Routes, Route } from "react-router-dom";
import { Card,Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchProduct from '../components/pages/SearchProduct';
import { propTypes } from 'react-bootstrap/esm/Image';
import "../App.css"

const Home = (props) => {
  // page content
  const pageTitle = 'Home'
  const pageDescription = 'welcome to react bootstrap template'
  function handleChange(event) {
    props.setFunc(event.target.value);
  }
  return (
    <div>
          
      <div className='row'>
      <div className="container">
      <div className="row ">
        <div className="col-md-6"  id='searchDiv'>
          <h2 className='headText'>A patient centric, trustless and easy to use solution.</h2>
          <div className="container">
            <div className="row">
              <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">

                <Form.Control text={props.text} id='searchTextId' onChange={handleChange}
                value={props.searchText} type="text" />
              </Form.Group>
              </Form>
        
                              
              <div className="col-md-4">
              <Link to="/searchproduct">
                <Button variant="primary" onClick={()=>{
                  console.log(props.searchText)
                  }}>Search</Button>
              </Link>  
                </div>
            </div>
          </div>
        </div>
        <div className='col-md-2'>

        </div>
        <div className="col-md-4 homeImage">
        <img src="https://i.ibb.co/0XbgnLD/supply-home.jpg" alt="supply-home" border="0" width="400" height="400"/>
        </div>
      </div>
    </div>
      </div>
      {
        props.isConnected?
        <div>
          <div className='row'>
          <div className='col-md-5'>
          <hr style={{
            color: "red",
            height: 2
          }}/>
          </div>
          <div className='col-md-2'>
            <h3><b>Our Services</b></h3>
          </div>
          <div className='col-md-5'>
          <hr style={{
            color: "red",
            height: 2
          }}/>
          </div>
          </div>
          <div className="row cardRow">
	
				<div className="col-md-4">
        <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title><b>Issue Product</b></Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Link to="/issueproduct">
            <Button variant="outline-success">Go</Button>
            </Link>
          </Card.Body>
        </Card>
				</div>
        <div className="col-md-4">
        <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title><b>Register Drug</b></Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Link to="/registerdrug">
            <Button variant="outline-success">Go</Button>
            </Link>
          </Card.Body>
        </Card>
				</div>
        <div className="col-md-4">
        <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title><b>Update Product</b></Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Link to="/updateproduct">
            <Button variant="outline-success">Go</Button>
            </Link>
          </Card.Body>
        </Card>
				</div>
			</div>
			<div className="row cardRow">
        <div className="col-md-4">
        <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title><b>Update Drug State</b></Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Link to="/updatedrugstate">
            <Button variant="outline-success">Go</Button>
            </Link>
          </Card.Body>
        </Card>
				</div>
        <div className="col-md-4">
            <Card style={{ width: '18rem' }}>
              
              <Card.Body>
                <Card.Title><b>Add Retailer Details</b></Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Link to="/addretailerdetails">
                <Button variant="outline-success">Go</Button>
                </Link>
              </Card.Body>
            </Card>
				  </div>
          {
          (props.acc==props.owner)?
          
            <div className="col-md-4">
            <Card style={{ width: '18rem' }}>
              
              <Card.Body>
                <Card.Title><b>Create Company</b></Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Link to="/createcompany">
                <Button variant="outline-success">Go</Button>
                </Link>
              </Card.Body>
            </Card>
				  </div>
          :<div></div>
        }
			</div>
      
          
      </div> 
        :
      <div>Please Connect to proceed</div>
      }
    </div>
  )
}

export default Home