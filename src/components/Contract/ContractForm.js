import React, { useState } from "react";
import { useContracts } from "../../context/ContractContext";

export default function ContractForm() {
  const { state, dispatch } = useContracts();

  const [selectedBpId, setSelectedBpId] = useState("");
  const [contractName, setContractName] = useState("");

  const generateContract = () => {
    if (!selectedBpId || !contractName) {
      alert("Select blueprint and enter contract name");
      return;
    }

    const bp = state.blueprints.find(
      (b) => String(b.id) === String(selectedBpId)
    );

    if (!bp) return;

    const contractId = Date.now();

    dispatch({
      type: "ADD_CONTRACT",
      payload: {
        id: contractId,
        name: contractName,
        blueprintName: bp.name,
        fields: bp.fields.map((f) => ({ ...f, value: "" })),
        status: "CREATED",
        createdAt: new Date().toISOString(),
      },
    });

    
    dispatch({
      type: "SELECT_CONTRACT",
      payload: contractId,
    });

    setSelectedBpId("");
    setContractName("");
  };

  return (
    <div>
      <h2>Generate Contract</h2>

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

      <label>Contract Name</label>
      <input
        value={contractName}
        onChange={(e) => setContractName(e.target.value)}
      />

      <button onClick={generateContract}>Generate Contract</button>
    </div>
  );
}
