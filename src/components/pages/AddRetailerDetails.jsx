import React from "react"
import { useState, useEffect } from "react";
import { Form,Button } from "react-bootstrap";

/*
TODO: 
1. Check company id entered owner is the one
2. If owner and operator matches than proceed
*/ 


export default function AddRetailerDetails(props) {

  const[cOwner,setCOwner] = useState(null)
  const[dName,setDName] = useState(null)
  const[sellerID,setSellerID] = useState(null)
  const[companyId,setCompanyId] = useState(null)
  const[sellerAddress,setSellerAddress] = useState(null)

  
  function handleCOwnerChange(event) {
    setCOwner(event.target.value);
  }
  function handleDNameChange(event) {
    setDName(event.target.value);
  }
  function handleCompanyIdChange(event) {
    setCompanyId(event.target.value);
  }
  function handleSellerIDChange(event) {
    setSellerID(event.target.value);
  }
  function handleSellerAddressChange(event) {
    setSellerAddress(event.target.value);
  }


  function registerRetailer(){
    console.log(props.webProps)
    let contract = props.webProps.contract
    //getting owner of entered cMFID
    contract.methods.ownerToCompanyId(props.webProps.accounts[0]).call().then((cid)=>{
      console.log("CompanyID "+companyId)
      console.log("CID "+cid)
      if(companyId!=0){
        if(companyId==cid){
          console.log("Corect owner")
          contract.methods.addRetailerDetails(companyId,sellerAddress,dName,sellerID).send({from:props.webProps.accounts[0]})
          .then((tx)=>{
            console.log(tx)
          let events = tx.events
          console.log("+++++++++++++++")
          console.log(events)
          alert("Retailer added successfully")
        
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
    props.setName("Add Retailer Details")
  },[]);


  return (
    
    <div className="outerDiv">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Company Id</Form.Label>
          <Form.Control type="text" onChange={handleCompanyIdChange} value={companyId} placeholder="" />
        </Form.Group> 
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" onChange={handleDNameChange} value={dName} placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" onChange={handleSellerAddressChange} value={sellerAddress} placeholder="" />
        </Form.Group>  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Seller Id</Form.Label>
          <Form.Control type="text" onChange={handleSellerIDChange} value={sellerID } placeholder="" />
        </Form.Group>  

              
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={registerRetailer}>
            ADD
          </Button>
        
        </div>
       
        
      </Form>
      
    </div>

  )
}
