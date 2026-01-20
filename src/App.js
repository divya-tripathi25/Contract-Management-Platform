import React from "react";
import "./App.css";
import BlueprintBuilder from "./components/Blueprint/BlueprintBuilder";
import { ContractProvider } from "./context/ContractContext";
import ContractForm from "./components/Contract/ContractForm";
import ContractTable from "./components/Dashboard/ContractTable";

function App() {
  return (
    <ContractProvider>
      <div className="app-container">
        <h1>Contract Management</h1>

        <div className="flex-row">
          <div className="section">
            <BlueprintBuilder />
          </div>

          <div className="section">
            <ContractForm />
          </div>
        </div>

        
        <div className="section">
          <ContractTable />
        </div>

        {/*
        <div className="section">
          <ContractDetail />
        </div>
        */}
      </div>
    </ContractProvider>
  );
}

export default App;
