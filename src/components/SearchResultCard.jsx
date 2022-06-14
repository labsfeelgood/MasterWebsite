import React from "react"
import { useEffect } from "react";
import { useState } from "react";
import { Card,Button, Form, ListGroup } from "react-bootstrap";

export default function SearchResultCard(props) {

  const[sellerAddr,setSellerAddress] = useState(null)
  const[sellerName,setSellerName] = useState(null)
  const[sellerId,setSellerId] = useState(null)
  useEffect(() => {
    setSellerAddress()
    getSellerDetails()
  });

  function getDateFromTimestamp(ts){
    
    var date = new Date(parseInt(ts));
    
    return ("Date: "+date.getDate()+
              "/"+(date.getMonth()+1)+
              "/"+date.getFullYear()+
              " "+date.getHours()+
              ":"+date.getMinutes()+
              ":"+date.getSeconds());
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
  function getSellerDetails(){
    console.log(props.webProps)
    let contract = props.webProps.contract
    console.log("CCC")
    console.log(contract)
    console.log(props.compId)
    //getting owner of entered cMFID
    contract.methods.compToRetailerMap(props.compId,props.data[3]).call()
          .then((details)=>{
            setSellerName(details[0])
            setSellerId(details[1])
            console.log("DETAILS")
            console.log(details)
          }).catch((err)=>{
            console.log("err "+err)
          })

  }

  return (
    
    <div>
      {/* {getSellerDetails()} */}
      <ListGroup as="ul" className="listCard">
        
        <ListGroup.Item as="li"><b>temp</b> {props.data[0]}</ListGroup.Item>
        <ListGroup.Item as="li"><b>humidity</b> {props.data[1]}</ListGroup.Item>
        <ListGroup.Item as="li"><b>time</b> {getDateFromTimestamp(props.data[2]).split("Date")}</ListGroup.Item>
        <ListGroup.Item as="li"><b>location</b> {props.data[4]}</ListGroup.Item>
        <ListGroup.Item as="li"><b>handler name</b> {sellerName}</ListGroup.Item>
        <ListGroup.Item as="li"><b>handler address</b> {props.data[3]}</ListGroup.Item>
        <ListGroup.Item as="li"><b>handler seller id</b> {sellerId}</ListGroup.Item>
      
      </ListGroup>
      <b>                                                               ↓</b>
      
    </div>
  )
}
