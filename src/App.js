import { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import Land from "./ABI/Land.json"


function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setaccount] = useState(null);
  const [buildings, setbuildings] = useState(null);
  const [cost, setCost] = useState(0);
  const [landContract, setLandContract] = useState(null);

  useEffect(() => {
    loadBlockchainData();
  }, [account]);
  const loadBlockchainData = async () => {
    if (typeof window.ethereum != "undefined") {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      if (account.length > 0) setaccount(accounts[0]);
     
      const networkId=await web3.eth.net.getId();
      const land=await web3.eth.net.Contract(Land.abi,Land.networks[networkId]).address;

      setLandContract(land);

      const cost=await land.methods.cost().call(); 

      setCost(web3.utils.fromWei(cost.toString(),'ether'))

      const buildings=await land.methods.getBuildings().call()
      setbuildings(buildings);

      window.ethereum.on('accountsChanged',(accounts)=>
      {

        setaccount(accounts[0]);

      })

      window.ethereum.on('chainChanged',(chainID)=>{
        window.location.reload();
      })

    }
  };

  return <div className="App"></div>;
}

export default App;
