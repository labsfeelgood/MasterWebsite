import React, { useState, useEffect } from "react"
import { Form,Button } from "react-bootstrap";
import { createRoutesFromChildren } from "react-router-dom";


export default function CreateCompany(props) {
  const[cOwner,setCOwner] = useState(null)
  const[cName,setCName] = useState(null)
  const[cMFID,setCMFID] = useState(null)
  function handleCOwnerChange(event) {
    setCOwner(event.target.value);
  }
  function handleCNameChange(event) {
    setCName(event.target.value);
  }
  function handleCMFIDChange(event) {
    setCMFID(event.target.value);
  }

  function createCompany(){
    console.log(cName+" "+cMFID+" "+cOwner)
    console.log(props.webProps)
    const contract = props.webProps.contract
    contract.methods.registerCompany(cOwner,cMFID,cName).send({from:props.webProps.accounts[0]})
    .then((tx)=>{
      console.log(tx)
    let events = tx.events
    console.log("+++++++++++++++")
    console.log(events["CompanyRegistered"]["returnValues"][1])
    var retStr="Created Company \n"+"Company ID : "+events["CompanyRegistered"]["returnValues"][0]+"\nName : "+events["CompanyRegistered"]["returnValues"][1][2]
    alert(retStr)

    }).catch((err)=>{
      console.log("err "+err)
    })
  }
  useEffect(() => {
    // Update the document title using the browser API
    props.setName("Create Company")
  },[]);
  
  return (
    
    <div className="outerDiv">
      
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Owner Wallet Address</Form.Label>
          <Form.Control type="text" onChange={handleCOwnerChange} value={cOwner} placeholder="0x........" />
          <Form.Text className="text-muted">
            Please enter ethereum address of company owner
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" onChange={handleCNameChange} value={cName} placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Manufacturer ID</Form.Label>
          <Form.Control type="text" onChange={handleCMFIDChange} value={cMFID} placeholder="Name" />
        </Form.Group>  

              
        
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={createCompany}>
            CREATE
          </Button>
        
        </div>
      </Form>
      
    </div>

  )
}
