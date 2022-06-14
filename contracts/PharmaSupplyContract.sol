// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;
import 'openzeppelin-solidity/contracts/access/Ownable.sol';
import 'openzeppelin-solidity/contracts/utils/Strings.sol';
contract PharmaSupplyContract is Ownable{
    using Strings for uint;
    /*
        EVENTS
        CREATEDRUG
        UPDATE DRUG
        CREATECOMPANY
    */
    event CompanyRegistered(uint,Company);
    event DrugRegistered(uint,Drug);
    event DrugUpdated(string,string,uint,uint);
    //DRUG,COUNTFROM,COUNTTO
    event DrugIssued(Drug,uint,uint);
    event DrugStateUpdated(Drug,DrugState);
    event RetailerAdded(string, string);

    //Registering Retailer and details
    mapping(uint=>mapping(address=>RetailerDetails)) public compToRetailerMap;

    struct Company{
        address companyOwner;
        string MFID;
        string name;
        uint totalDrugs;
    }

    struct RetailerDetails{
        string name;
        string sellerID;
    }

    //CID=>DID=>DRUG DETAILS
    mapping(uint=>mapping(uint=>Drug)) public comapnyDrugs;   
    struct Drug{
        uint temperature;
        string imageUrl;
        uint humidity;
        string name;
        uint drugId;
        uint supply;
    }

    struct DrugState{
        uint temperature;
        uint humidity;
        uint timestamp;
        address handler;
        string location;
    }
    //CID=>DRIGID=>PRODUCTID=>DRUGSTATE[]
    mapping(uint=>mapping(uint=>mapping(uint=>DrugState[]))) public drugTrailMap;

    //CID=>DRUGID=>ADDRESS[]
    mapping(uint=>mapping(uint=>address[])) public handlers;

    uint totalCompanies;
    mapping(uint=>Company) public idToComapanyMap;
    mapping(address=>uint) public ownerToCompanyId;

    function registerCompany(address _owner, string memory _MFID, string memory _name) external onlyOwner{
        Company memory c = Company(_owner,_MFID,_name,0);
        totalCompanies+=1;
        idToComapanyMap[totalCompanies]=c;
        ownerToCompanyId[_owner]=totalCompanies;
        emit CompanyRegistered(totalCompanies,c); 
    }
    function registerDrug(uint _companyId,
                uint _temperature,
                string memory _imageUrl,
                uint _humidity,
                string memory _name
    ) external {
        require(idToComapanyMap[_companyId].companyOwner==msg.sender,"Only company owner can perform this");
        uint _did = idToComapanyMap[_companyId].totalDrugs+1;
        Drug memory d = Drug(_temperature,_imageUrl,_humidity,_name,_did,0);
        
        idToComapanyMap[_companyId].totalDrugs=_did;
        comapnyDrugs[_companyId][_did] = d;   
        emit DrugRegistered(_did,d);
         
        //DRUGID = C+COMPANYID+D+DRUGID
    }

    function updateDrug(
                uint _companyId,
                uint _temperature,
                string memory _imageUrl,
                uint _humidity,
                string memory _name,
                uint _drugId
    ) external {
        require(idToComapanyMap[_companyId].companyOwner==msg.sender,"Only company owner can perform this");
        comapnyDrugs[_companyId][_drugId].temperature = _temperature;
        comapnyDrugs[_companyId][_drugId].imageUrl = _imageUrl;
        comapnyDrugs[_companyId][_drugId].humidity = _humidity;
        comapnyDrugs[_companyId][_drugId].name = _name;
        emit DrugUpdated(_name,_imageUrl,_temperature,_humidity);
    }


    function issueDrugs(uint _companyId,uint _drugId, uint _supply, address[] memory _handlers) external {
        require(idToComapanyMap[_companyId].companyOwner==msg.sender,"Only company owner can perform this");
        uint prevCount = comapnyDrugs[_companyId][_drugId].supply;
        Drug memory d = comapnyDrugs[_companyId][_drugId];
        comapnyDrugs[_companyId][_drugId].supply += _supply;
        handlers[_companyId][_drugId]=_handlers;
        emit DrugIssued(d,prevCount+1,prevCount+_supply);
        
    }

    function updateProductState(uint _companyId, uint _drugId, uint _productId, uint _temperature, uint _humidity, string memory _location) external {
        address[] memory _handlers = handlers[_companyId][_drugId];
        bool isAuthorised;
        for(uint i;i<_handlers.length;i++){
            if(msg.sender==_handlers[i]){
                isAuthorised=true;
                break;
            }
        }
        require(isAuthorised,"You are not authorised");
        DrugState memory state = DrugState(_temperature, _humidity,block.timestamp,msg.sender,_location); 
        Drug memory d = comapnyDrugs[_companyId][_drugId];
        drugTrailMap[_companyId][_drugId][_productId].push(state);
        
        emit DrugStateUpdated(d,state);
    }


    function getDrugTrail(uint _companyId, uint _drugId, uint _productId) public view returns(DrugState[] memory){
        uint len = drugTrailMap[_companyId][_drugId][_productId].length;
        DrugState[] memory state = new DrugState[](len);
        for(uint i;i<len;i++){
            state[i]=drugTrailMap[_companyId][_drugId][_productId][i];
        }
        return state;
    }

    function addRetailerDetails(uint _companyId,address _address, string memory _name, string memory _id) public {
        require(idToComapanyMap[_companyId].companyOwner==msg.sender,"Only company owner can perform this");
        RetailerDetails memory details = RetailerDetails(_name,_id);
        compToRetailerMap[_companyId][_address] = details;
        
        emit RetailerAdded(_name,_id);
    }


}

// ["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db","0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB","0x617F2E2fD72FD9D5503197092aC168c91465E7f2"]