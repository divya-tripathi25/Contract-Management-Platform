import React, { useState } from "react";
import { useContracts } from "../../context/ContractContext";

export default function ContractForm() {
  const { state, dispatch } = useContracts();
  const [selectedBpId, setSelectedBpId] = useState("");
  const [contractName, setContractName] = useState("");

  
  const generateContract = () => {
    if (!selectedBpId || !contractName) {
      alert("Please select a blueprint and enter a contract name");
      return;
    }

    
    const bp = state.blueprints.find(
      (b) => b.id === Number(selectedBpId)
    );

    if (!bp) {
      alert("Selected blueprint not found");
      return;
    }

    
    dispatch({
      type: "ADD_CONTRACT",
      payload: {
        id: Date.now(),
        name: contractName,              
        blueprintName: bp.name,          
        fields: bp.fields.map((f) => ({
          ...f,
          value: "",
        })),
        status: "CREATED",               
        createdAt: new Date().toISOString(),
      },
    });

    
    setSelectedBpId("");
    setContractName("");
  };

  return (
    <div>
      <h2>Generate a Contract</h2>


      <label>Blueprint</label>
      <select
        value={selectedBpId}
        onChange={(e) => setSelectedBpId(e.target.value)}
      >
        <option value="">Select Blueprint</option>
        {state.blueprints.map((bp) => (
          <option key={bp.id} value={bp.id}>
            {bp.name}
          </option>
        ))}
      </select>

      
      <label>Contract name</label>
      <input
        placeholder="Enter contract name"
        value={contractName}
        onChange={(e) => setContractName(e.target.value)}
      />

      <button
        onClick={generateContract}
        disabled={state.blueprints.length === 0}
      >
        Generate Contract
      </button>

      
      {state.blueprints.length === 0 && (
        <p className="empty-text">
          No blueprints available. Please create one first.
        </p>
      )}
    </div>
  );
}
