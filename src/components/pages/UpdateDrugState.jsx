import React from "react"
import { useState, useEffect } from "react";
import { Form,Button, Container } from "react-bootstrap";

/*
TODO: 
1. Check company id entered owner is the one
2. If owner and operator matches than proceed
*/ 


export default function UpdateDrugState(props) {

  const[UPID,setUPID] = useState(null)
  const[dName,setDName] = useState(null)
  const[dImgUrl,setDImgUrl] = useState(null)
  const[companyId,setCompanyId] = useState(0)
  const[dTemp,setDTemp] = useState(null)
  const[dLocation,setDLocation] = useState(null)
  const[dHumidity,setDHumidity] = useState(null)
  const[dID,setDID] = useState(null)
  const[dPID,setDPID] = useState(null)
  

  function handleUPIDChange(event) {
    setUPID(event.target.value);
  }
  function handleDTempChange(event) {
    setDTemp(event.target.value);
  }
  function handleDHumidityChange(event) {
    setDHumidity(event.target.value);
  }
  function handleDLocationChange(event) {
    setDLocation(event.target.value);
  }

  function updateProductState(){
    console.log(props.webProps)
    let contract = props.webProps.contract
    //getting owner of entered cMFID
    var temp = UPID.split("a")
    setCompanyId(temp[0])
    setDID(temp[1])
    setDPID(temp[2])
    console.log("UPID")
    console.log(temp)
    console.log(contract)
    if(contract!=null){
      contract.methods.updateProductState(companyId,dID,dPID,dTemp,dHumidity,dLocation).send({from:props.webProps.accounts[0]})
          .then((tx)=>{
            console.log(tx)
          let events = tx.events
          console.log("+++++++++++++++")
          console.log(events)
          alert("Updated successfully")
          }).catch((err)=>{
            console.log("err "+err)
          })
    }else{
      return<h2>Something is not good  </h2>
    }


  }
  useEffect(() => {
    // Update the document title using the browser API
    props.setName("Drug State")
  },[]);

  return (
    
    <div className="outerDiv">
    
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Unique Product Id</Form.Label>
          <Form.Control type="text" onChange={handleUPIDChange} value={UPID} placeholder="" />
        </Form.Group> 
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Temperature</Form.Label>
          <Form.Control type="text" onChange={handleDTempChange} value={dTemp} placeholder="" />
        </Form.Group>  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Humidity</Form.Label>
          <Form.Control type="text" onChange={handleDHumidityChange} value={dHumidity } placeholder="" />
        </Form.Group>  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" onChange={handleDLocationChange} value={dLocation } placeholder="" />
        </Form.Group>  

              
        
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={updateProductState}>
            UPDATE
          </Button>
        
        </div>
      </Form>
      
    </div>

  )
}
