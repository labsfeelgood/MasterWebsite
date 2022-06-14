import React from "react"
import { Form,Button,ListGroup, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";


export default function IssueProduct(props) {
  const[companyname,setCompanyName] = useState("No Company Registered")
  const[cOwner,setCOwner] = useState(null)
  const[dName,setDName] = useState(null)
  const[dImgUrl,setDImgUrl] = useState(null)
  const[companyId,setCompanyId] = useState(null)
  const[dTemp,setDTemp] = useState(null)
  const[dHumidity,setDHumidity] = useState(null)
  const[dSupply,setDSupply] = useState(null)
  const[dId,setDID] = useState(null)
  const[dQty,setDQty] = useState(null)
  const[dHandlers,setDHandlers] = useState("")
  
  function handleCOwnerChange(event) {
    setCOwner(event.target.value);
  }
  function handleHandlersChange(event) {
    setDHandlers(event.target.value);
  }
  function handleQtyChange(event) {
    setDQty(event.target.value);
  }
  function handleCompanyIdChange(event) {
    setCompanyId(event.target.value);
  }

  function handleDID(event) {
    setDID(event.target.value);
  }

  function getDrugDetails(){
    console.log(props.webProps)
    let contract = props.webProps.contract
    //getting owner of entered cMFID
    contract.methods.ownerToCompanyId(props.webProps.accounts[0]).call().then((cid)=>{
      console.log("CompanyID "+companyId)
      console.log("CID "+cid)
      if(companyId!=0){
        if(companyId==cid){
          console.log("Corect owner")
          //NOW UPDATE THE DRUG DETAILS

          contract.methods.comapnyDrugs(companyId,dId).call()
          .then((details)=>{
            console.log("details")
            console.log(details)
            setDHumidity(details.humidity)
            setDTemp(details.temperature)
            setDName(details.name)
            setDImgUrl(details.imageUrl)
            setDSupply(details.supply)
          
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

  function issueDrugs(){
    console.log(props.webProps)
    let contract = props.webProps.contract
    //getting owner of entered cMFID
    contract.methods.ownerToCompanyId(props.webProps.accounts[0]).call().then((cid)=>{
      console.log("CompanyID "+companyId)
      console.log("CID "+cid)
      if(companyId!=0){
        if(companyId==cid){
          console.log("Corect owner")
          //NOW UPDATE THE DRUG DETAILS
          var data = dHandlers.split(",")

          contract.methods.issueDrugs(companyId,dId,dQty,data).send({from:props.webProps.accounts[0]})
          .then((tx)=>{
            console.log(tx)
          let events = tx.events
          console.log("+++++++++++++++")
          console.log(events)
          var from = events["DrugIssued"]["returnValues"][1]
          var to = events["DrugIssued"]["returnValues"][2]
          var retStr = "Drugs issued ids range from "+companyId+"a"+dId+"a"+from+" to "+companyId+"a"+dId+"a"+to
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
    props.setName("Issue Product")
  },[]);



  return (
    
    <div className="outerDiv">
      <Form>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Company ID</Form.Label>
          <Form.Control type="text" onChange={handleCompanyIdChange} value={companyId} placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product ID</Form.Label>
          <Form.Control type="text" onChange={handleDID} value={dId} placeholder="" />
        </Form.Group>
        <Button variant="outline-primary" onClick={getDrugDetails}>
          Fetch Details
        </Button>
        {
          dName&&    
        <ListGroup className="listIP">
          <ListGroup.Item variant="warning">Name : {dName}</ListGroup.Item>
          <ListGroup.Item>Image : {dImgUrl}</ListGroup.Item>
          <ListGroup.Item>Supply : {dSupply}</ListGroup.Item>
        </ListGroup>
        }
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="text" onChange={handleQtyChange} value={dQty} placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Retailers/Wholesaler addresses</Form.Label>
          <Form.Control type="textArea" onChange={handleHandlersChange} value={dHandlers} placeholder="" />
          <Form.Text id="passwordHelpBlock" muted>
        Note: Enter addresses separated by commas
      </Form.Text>
        </Form.Group> 
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={issueDrugs}>
            ISSUE
          </Button>
        
        </div>
       
      </Form>
    </div>

  )
}
