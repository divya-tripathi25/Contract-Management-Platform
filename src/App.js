import React from "react";
import BlueprintBuilder from "./components/Blueprint/BlueprintBuilder";
import { ContractProvider } from "./context/ContractContext";
import ContractForm from "./components/Contract/ContractForm";

function App(){
  return(
    <ContractProvider>
      <h1>Contract Management</h1>
      <BlueprintBuilder/>
      <ContractForm/>
    </ContractProvider>
  )
}
export default App;
