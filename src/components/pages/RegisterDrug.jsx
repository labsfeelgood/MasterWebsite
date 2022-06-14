import React from "react"
import { useState, useEffect } from "react";
import { Form,Button } from "react-bootstrap";

/*
TODO: 
1. Check company id entered owner is the one
2. If owner and operator matches than proceed
*/ 


export default function RegisterDrug(props) {

  const[cOwner,setCOwner] = useState(null)
  const[dName,setDName] = useState(null)
  const[dImgUrl,setDImgUrl] = useState(null)
  const[companyId,setCompanyId] = useState(null)
  const[dTemp,setDTemp] = useState(null)
  const[dHumidity,setDHumidity] = useState(null)
  
  function handleCOwnerChange(event) {
    setCOwner(event.target.value);
  }
  function handleDNameChange(event) {
    setDName(event.target.value);
  }
  function handleDImgUrlChange(event) {
    setDImgUrl(event.target.value);
  }
  function handleCompanyIdChange(event) {
    setCompanyId(event.target.value);
  }
  function handleDTempChange(event) {
    setDTemp(event.target.value);
  }
  function handleDHumidityChange(event) {
    setDHumidity(event.target.value);
  }

  function registerDrug(){
    console.log(props.webProps)
    let contract = props.webProps.contract
    //getting owner of entered cMFID
    contract.methods.ownerToCompanyId(props.webProps.accounts[0]).call().then((cid)=>{
      console.log("CompanyID "+companyId)
      console.log("CID "+cid)
      if(companyId!=0){
        if(companyId==cid){
          console.log("Corect owner")
          contract.methods.registerDrug(companyId,dTemp,dImgUrl,dHumidity,dName).send({from:props.webProps.accounts[0]})
          .then((tx)=>{
            console.log(tx)
          let events = tx.events
          console.log("+++++++++++++++")
          console.log(events)
          var retStr = "Drug registered successfully \n"+"Drug Id : "+events["DrugRegistered"]["returnValues"][0] 
            alert(retStr)
        }).catch((err)=>{
            console.log("err "+err)
          })
        }else{
          alert("You are not the owner of entered CID")
        }
      }else{
        console.log("zero owner")
      }
    })


  }
  useEffect(() => {
    // Update the document title using the browser API
    props.setName("Register Drug")
  },[]);
  return (
    
    <div className="outerDiv">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" onChange={handleDNameChange} value={dName} placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Company Id</Form.Label>
          <Form.Control type="text" onChange={handleCompanyIdChange} value={companyId} placeholder="" />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image Url</Form.Label>
          <Form.Control type="text" onChange={handleDImgUrlChange} value={dImgUrl} placeholder="" />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Temperature</Form.Label>
          <Form.Control type="text" onChange={handleDTempChange} value={dTemp} placeholder="" />
        </Form.Group>  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Humidity</Form.Label>
          <Form.Control type="text" onChange={handleDHumidityChange} value={dHumidity } placeholder="" />
        </Form.Group>  

              
        
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={registerDrug}>
            REGISTER
          </Button>
        
        </div>
      </Form>
      
    </div>

  )
}
