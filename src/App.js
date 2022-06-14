import { useState, react, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { Card,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// Layout
import Layout from "./layout/Layout";
import Menu from "./components/Menu";
import Login from "./components/Login"
import CreateCompany from "./components/pages/CreateCompany"
import IssueProduct from "./components/pages/IssueProduct"
import RegisterDrug from "./components/pages/RegisterDrug"
import SearchProduct from "./components/pages/SearchProduct"
import UpdateProduct from "./components/pages/UpdateProduct"

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./App.css"
import UpdateDrugState from "./components/pages/UpdateDrugState";
import AddRetailerDetails from "./components/pages/AddRetailerDetails";
import Web3 from "web3";
import ContractABI from './contracts/PharmaSupplyContract.json'

const App = (props) => {
	const contractAddress = "0xb137172f8E0402330cE86edCEB4C03ea816e4Ef8";


  
	const [web3props, setWeb3Props] = useState({ web3: null, accounts: null, contract: null })
	const [isOnLocalhost, setIsOnLocalhost] = useState(false)
  const [searchText,setSearchText] = useState("")
  const [isConnected,setIsConnected] = useState(false)  
  const [owner,setOwner] = useState("NONE")
  const [connectedAcc,setConnectedAcc] = useState(null)
  const [currName, setCurrName] = useState("PHARMASUPPLY")
  const [justContract,setJustContract] = useState({contract: null })
  

	


	// Callback function for the Login component to give us access to the web3 instance and contract functions
	const OnLogin = function(param){
		let { web3, accounts, contract } = param;
		if(web3 && accounts && accounts.length && contract){
			setWeb3Props({ web3, accounts, contract });
      setIsConnected(true)
      setConnectedAcc(accounts[0])
      console.log(contract)
		}
	}

		
	window.addEventListener("load", function() {
		if (window.ethereum) {
		// use MetaMask's provider
	
		// detect Metamask account change
		window.ethereum.on('accountsChanged', function (accounts) {
			console.log('accountsChanges111',accounts);
			let { _web3, _, _contract } = web3props;
			setWeb3Props({ _web3, accounts, _contract });
      
		});
	
		// detect Network account change
		window.ethereum.on('networkChanged', function(networkId){
			console.log('networkChanged',networkId);
			if(networkId==5777){
				setIsOnLocalhost(true)
			}else{
				setIsOnLocalhost(false)
			}
		});
		} else {
		console.warn(
			"No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
		);
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		}
	});
	// If the wallet is connected, all three values will be set. Use to display the main nav below.
	const contractAvailable = !(!web3props.web3 && !web3props.accounts && !web3props.contract);
	// Grab the connected wallet address, if available, to pass into the Login component
	const walletAddress = web3props.accounts ? web3props.accounts[0] : "";

  useEffect(
    () => {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const instance = new web3.eth.Contract(
				ContractABI, 
				contractAddress
			);
      console.log("INSTANCE IS")
      console.log(instance)
      setJustContract({contract:instance})
     if(web3props.contract!=null){
       console.log(web3props.contract.methods.owner().call()+"")
       web3props.contract.methods.owner().call()
       .then((_owner)=>{
        setOwner(_owner)

       }).catch((err)=>{
         console.log("err "+err)
       })
     }
    },
    [web3props.contract]
  );

 

  return (
    <div>
      <div className="App">
            <nav className="navbar bg-light">
              <div className="container">
                <a className="navbar-brand" href="#">
                <img src="https://i.ibb.co/dWFbfs9/supply-chain.png" width={40} height={40} alt="supply-chain" border="0"/>
                
                </a>
                <div class="thirteen">
                  <h3>{currName}</h3>
                </div>
                
                <Login callback={OnLogin} connected={contractAvailable} address={walletAddress}/>
              </div>
            </nav>
        </div>
        <div className="container">
			
		</div>
		<div></div>
      <Container>
        <Routes>
          <Route path="/" element={<Home setName={setCurrName} setFunc={setSearchText} text={searchText} isConnected={isConnected} acc={connectedAcc} owner={owner}/>} exact />
          <Route path="/createcompany"  element={<CreateCompany setName={setCurrName} webProps={web3props}/>} />
          <Route path="/issueproduct" element={<IssueProduct setName={setCurrName} webProps={web3props}/>} />
          <Route path="/registerdrug" element={<RegisterDrug setName={setCurrName} webProps={web3props}/>} />
          <Route path="/searchproduct" element={<SearchProduct setName={setCurrName} searchText={searchText} webProps={justContract} />} />
          <Route path="/updateproduct" element={<UpdateProduct setName={setCurrName} webProps={web3props}/>} />
          <Route path="/updatedrugstate" element={<UpdateDrugState setName={setCurrName} webProps={web3props}/>} />
          <Route path="/addretailerdetails" element={<AddRetailerDetails setName={setCurrName} webProps={web3props}/>} />
          <Route path="/about" element={<About />} />
          <Route element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
