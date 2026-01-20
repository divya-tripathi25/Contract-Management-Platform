import React from "react";
import { useContracts } from "../../context/ContractContext";

export default function ContractDetail() {
  const { state, dispatch } = useContracts();

  const contract = state.contracts.find(
    (c) => c.id === state.selectedContractId
  );

  if (!contract) {
    return <p className="empty-text">Create or select a contract to fill details.</p>;
  }

  const handleChange = (fieldId, value) => {
    dispatch({
      type: "UPDATE_FIELD_VALUE",
      payload: {
        contractId: contract.id,
        fieldId,
        value,
      },
    });
  };

  const incomplete = contract.fields.some(
    (f) => f.value === "" || f.value === null
  );

  return (
    <div className="contract-detail">
      <h2>Contract Details</h2>

      <p>
        <strong>{contract.name}</strong> <br />
        Blueprint: {contract.blueprintName}
      </p>

      {contract.fields.map((field) => (
        <div key={field.id}>
          <label>{field.label}</label>

          {field.type === "Text" && (
            <input
              value={field.value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={contract.status === "LOCKED"}
            />
          )}

          {field.type === "Date" && (
            <input
              type="date"
              value={field.value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={contract.status === "LOCKED"}
            />
          )}

          {field.type === "Checkbox" && (
            <input
              type="checkbox"
              checked={field.value || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
              disabled={contract.status === "LOCKED"}
            />
          )}
          {field.type === "Signature" && (
          <input
        type="text"
        placeholder="Type full name as signature"
        value={field.value}
        onChange={(e) =>
          handleChange(field.id, e.target.value)
        }
        disabled={contract.status === "LOCKED"}
      />
    )}
        </div>
      ))}

      {incomplete && (
        <p className="empty-text">
          Please fill all fields before approving the contract.
        </p>
      )}
    </div>
  );
}
