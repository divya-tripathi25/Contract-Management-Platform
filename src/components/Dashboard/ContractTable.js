import React, { useState } from "react";
import { useContracts } from "../../context/ContractContext";

export default function ContractTable() {
  const { state, dispatch } = useContracts();
  const [filter, setFilter] = useState("ALL");

  
  const filteredContracts = state.contracts.filter((c) => {
    if (filter === "ALL") return true;
    return c.status === filter;
  });

  
  const updateStatus = (id, status) => {
    dispatch({
      type: "UPDATE_STATUS",
      payload: { id, status },
    });
  };

  return (
    <div>
      <h2>Contract Dashboard</h2>
      <p>Filter by lifecycle stage, open contracts, and advance them in-line.</p>

    
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="ALL">All</option>
        <option value="CREATED">Created</option>
        <option value="APPROVED">Approved</option>
        <option value="SENT">Sent</option>
        <option value="SIGNED">Signed</option>
        <option value="LOCKED">Locked</option>
        <option value="REVOKED">Revoked</option>
      </select>

      
      <table>
        <thead>
          <tr>
            <th>Contract</th>
            <th>Blueprint</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredContracts.length === 0 && (
            <tr>
              <td colSpan="5">No contracts found</td>
            </tr>
          )}

          {filteredContracts.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.blueprintName}</td>

              <td>
                <span className={`status ${c.status}`}>{c.status}</span>
              </td>

              <td>{new Date(c.createdAt).toLocaleDateString()}</td>

              
              <td className="actions">
                {c.status === "CREATED" && (
                  <button onClick={() => updateStatus(c.id, "APPROVED")}>
                    Approve
                  </button>
                )}

                {c.status === "APPROVED" && (
                  <button onClick={() => updateStatus(c.id, "SENT")}>
                    Move to Sent
                  </button>
                )}

                {c.status === "SENT" && (
                  <button onClick={() => updateStatus(c.id, "SIGNED")}>
                    Mark Signed
                  </button>
                )}

                {c.status === "SIGNED" && (
                  <button onClick={() => updateStatus(c.id, "LOCKED")}>
                    Lock
                  </button>
                )}

                {c.status !== "LOCKED" && c.status !== "REVOKED" && (
                  <button
                    className="danger"
                    onClick={() => updateStatus(c.id, "REVOKED")}
                  >
                    Revoke
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
