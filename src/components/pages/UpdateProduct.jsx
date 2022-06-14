import React from "react"
import { Form,Button } from "react-bootstrap";
import { useState, useEffect   } from "react";

export default function UpdateProduct(props) {
  const[cOwner,setCOwner] = useState(null)
  const[dName,setDName] = useState(null)
  const[dImgUrl,setDImgUrl] = useState(null)
  const[companyId,setCompanyId] = useState(null)
  const[dTemp,setDTemp] = useState(null)
  const[dHumidity,setDHumidity] = useState(null)
  const[dId,setDID] = useState(null)
  
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

  function updateDrug(){
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

          contract.methods.updateDrug(companyId,dTemp,dImgUrl,dHumidity,dName,dId).send({from:props.webProps.accounts[0]})
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
          alert("You are not the owner of entered CID")
        }
      }else{
        console.log("zero owner")
      }
    })


  }
  useEffect(() => {
    // Update the document title using the browser API
    props.setName("Product Info ")
  },[]);


  return (
    
    <div className="outerDiv">
     
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Comapany ID</Form.Label>
          <Form.Control type="text"  onChange={handleCompanyIdChange} value={companyId} placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Product ID</Form.Label>
          <Form.Control type="text"  onChange={handleDID} value={dId} placeholder="" />
        </Form.Group>
        <Button variant="outline-primary" onClick={getDrugDetails}>
          Get Details
        </Button>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Temperature</Form.Label>
          <Form.Control type="text"  onChange={handleDTempChange} value={dTemp} placeholder="" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>humidity</Form.Label>
          <Form.Control type="text"  onChange={handleDHumidityChange} value={dHumidity} placeholder="" />
        </Form.Group>  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text"  onChange={handleDNameChange} value={dName} placeholder="" />
        </Form.Group>  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Image Url</Form.Label>
          <Form.Control type="text"  onChange={handleDImgUrlChange} value={dImgUrl} placeholder="" />
        </Form.Group>  
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={updateDrug}>
            UPDATE
          </Button>
        
        </div>
      </Form>
    </div>

  )
}
