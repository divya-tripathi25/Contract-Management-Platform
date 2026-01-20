import { useContracts } from "../../context/ContractContext";

export default function ContractDetail() {
  const { state, dispatch } = useContracts();

  const contract = state.contracts.find(
    c => c.id === state.selectedContractId
  );

  if (!contract) return null;

  return (
    <div>
      <h2>Contract Detail</h2>
      <p>{contract.name}</p>
      <p>Based on {contract.blueprintName}</p>

      {contract.fields.map(f => (
        <div key={f.id}>
          <label>{f.label}</label>
          <input
            disabled={contract.status === "LOCKED"}
            value={f.value}
          />
        </div>
      ))}

      {contract.status === "CREATED" && (
        <button onClick={() =>
          dispatch({ type: "UPDATE_STATUS", payload: { id: contract.id, status: "APPROVED" } })
        }>
          Approve
        </button>
      )}
    </div>
  );
}
