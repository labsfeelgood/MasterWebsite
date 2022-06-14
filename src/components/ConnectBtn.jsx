import React from "react"
import { Card,Button, Form } from "react-bootstrap";


export default function ConnectBtn(props) {
  let name = props.addressParam
  if (props.connected){
    let temp = props.addressParam
    name=temp.slice(0,5)+"..."+temp.slice(-3)
  }
  return (
    
    
      <Button variant="warning" onClick={props.clickFunc}>
      {(!props.connected)?
      "CONNECT":
      name}
      </Button>
    

  )
}
