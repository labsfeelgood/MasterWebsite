import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Card,Button, Form, Row } from "react-bootstrap";
import SearchResultCard from "../SearchResultCard";

export default function SearchProduct(props) {
  const[companyId,setCompanyId] = useState(0)
  const[dID,setDID] = useState(0)
  const[dPID,setDPID] = useState(0)
  const[searchResult,setSearchResult] = useState(null)

  const[dName,setDName] = useState(null)
  const[dImgUrl,setDImgUrl] = useState(null)
  const[dTemp,setDTemp] = useState(null)
  const[dHumidity,setDHumidity] = useState(null)
  const[dSupply,setDSupply] = useState(null)
  const[drugOrigin,setDrugOrigin] = useState({companyOwner:null,MFID:null,name:null,totalDrugs:null})



  useEffect(() => {
    // Update the document title using the browser API
    console.log(props.searchText);
    var temp = props.searchText.split("a")
    setCompanyId(temp[0])
    setDID(temp[1])
    setDPID(temp[2])
    console.log(temp)
    
    
      getDrugDetails()
      getDrugTrial()
      
    
  },[dName]);

  function getDrugTrial(){
    console.log(props.webProps)
    let contract = props.webProps.contract
    //getting owner of entered cMFID
    
    
    console.log("UPID")

    contract.methods.getDrugTrail(companyId,dID,dPID).call()
          .then((_res)=>{
            setSearchResult(_res)
            console.log("TYPE")
            console.log(_res)
   
          }).catch((err)=>{
            console.log("err "+err)
          })
  }
  function dynamicsort(property,order) {
    var sort_order = 1;
    if(order === "desc"){
        sort_order = -1;
    }
    return function (a, b){
        // a should come before b in the sorted order
        if(a[property] < b[property]){
                return -1 * sort_order;
        // a should come after b in the sorted order
        }else if(a[property] > b[property]){
                return 1 * sort_order;
        // a and b are the same
        }else{
                return 0 * sort_order;
        }
    }
  }
  function getDrugDetails(){
    console.log(props.webProps)
    let contract = props.webProps.contract
    //getting owner of entered cMFID
    console.log("NULL")
    contract.methods.comapnyDrugs(companyId,dID).call()
          .then((details)=>{
            console.log("details")
            console.log(details)
            setDHumidity(details.humidity)
            setDTemp(details.temperature)
            setDName(details.name)
            setDImgUrl(details.imageUrl)
            setDSupply(details.supply)
            getDrugTrial()
            
            
          }).catch((err)=>{
            console.log("err "+err)
          })

      props.webProps.contract.methods.idToComapanyMap(companyId).call()
      .then((tx)=>{
        console.log("COMP DETAILS")
        setDrugOrigin({companyOwner:tx[0],MFID:tx[1],name:tx[2],totalDrugs:tx[3]})
      console.log(tx[0])
      // setDrugOrigin({tx,})
      }).catch((err)=>{
        console.log("err "+err)
      })
  }
  useEffect(() => {
    // Update the document title using the browser API
    props.setName("Search")
  },[]);


  return (
    
    <div className="">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
          <Row className="listCard">
          <Card style={{ width: '18rem' }}>
            <h5>Drug Origin</h5>
            <hr/>
            <Card.Body>
              <Card.Title><b>{drugOrigin.name}</b></Card.Title>
              <Card.Text>
                <b>Owner </b> : {drugOrigin.companyOwner} <br/>
                <b>MFID </b> : {drugOrigin.MFID}
                <b>Supply </b> : {drugOrigin.supply}

              </Card.Text>
            </Card.Body>
          </Card>
          </Row>
          <Row className="listCard">
          <Card style={{ width: '18rem' }}>
            
            <h5>Drug Info</h5>
            <hr/>
            <Card.Img variant="top" src={dImgUrl} />
            <Card.Body>
              <Card.Title><b>{dName}</b></Card.Title>
              <Card.Text>
                <b>Temperature </b> : {dTemp} <br/>
                <b>Humidity </b> : {dHumidity}

              </Card.Text>
            </Card.Body>
          </Card>
          </Row>
          
          </div>
          <div className="col-md-9">
          {
          searchResult && searchResult.map((li) => (
            <SearchResultCard data={li} webProps={props.webProps} compId={companyId}/>
            )
            )
          }
          </div>
        </div>
      </div>
      {/* <h2>{props.searchText}</h2> */}
      
      
    </div>
  )
}
