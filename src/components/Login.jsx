import React from "react";
import Web3 from "web3";
import { useEffect } from "react";

import ContractABI from '../contracts/PharmaSupplyContract.json';
import ConnectBtn from "./ConnectBtn";

export default function Login(props) {

	const contractAddress = "0xb137172f8E0402330cE86edCEB4C03ea816e4Ef8";

	// window.addEventListener("load",function(){
	// 	if (window.ethereum) {	
	// 		// use MetaMask's provider
			
	// 		window.ethereum.enable(); // get permission to access accounts
		
	// 		// detect Metamask account change
	// 		window.ethereum.on('accountsChanged', function (accounts) {
	// 		  console.log('accountsChanges',accounts);
	// 		  let _web3 = props.web3
	// 		  let _contract =  props.contract
	// 		  props.callback({ _web3, accounts, _contract});
	// 		  window.alert("Changed")
	// 		});
		
	// 		 // detect Network account change
	// 		window.ethereum.on('networkChanged', function(networkId){
	// 		  console.log('networkChanged',networkId);
	// 		});
	// 	  } else {
	// 		console.warn(
	// 		  "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
	// 		);
			
	// 	  }
	// })
	useEffect(() => {
		async function listenMMAccount() {
		  window.ethereum.on("accountsChanged", async function() {
			// Time to reload your interface with accounts[0]!
			if(props.web3!=null){
				let accounts = await props.web3.eth.getAccounts();
			// accounts = await web3.eth.getAccounts();
			let _web3 = props.web3
			let _contract =  props.contract
			props.callback({ _web3, accounts, _contract});
			console.log(accounts);
			}
		  });
		}
		listenMMAccount();
	  }, []);
	const DoConnect = async () => {

		console.log('Connecting....');
		try {
			// Get network provider and web3 instance.
			const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
			// Request account access if needed
			await window.ethereum.request({ method: 'eth_requestAccounts' })
			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();
			// Get an instance of the contract sop we can call our contract functions
			const instance = new web3.eth.Contract(
				ContractABI, 
				contractAddress
			);
			props.callback({ web3, accounts, contract: instance });

		} catch (error) {
			// Catch any errors for any of the above operations.
			console.error("Could not connect to wallet.", error);
		}
	};

	// If not connected, display the connect button.
	// if(!props.connected) return <button className="login" onClick={DoConnect}>Connect Wallet</button>;
	return <ConnectBtn clickFunc={DoConnect} addressParam={props.address} connected={props.connected}/>;

	// Display the wallet address. Truncate it to save space.
	// return <>[{props.address}]</>;
}