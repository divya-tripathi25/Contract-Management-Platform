import React, { useState } from "react";
import { useContracts } from "../../context/ContractContext";

export default function ContractTable() {
  const { state, dispatch } = useContracts();
  const [filter, setFilter] = useState("ALL");

  
  const getGroupStatus = (status) => {
    if (["CREATED", "APPROVED", "SENT"].includes(status)) {
      return "PENDING";
    }
    if (status === "SIGNED") {
      return "ACTIVE";
    }
    if (status === "LOCKED") {
      return "SIGNED";
    }
    return status; 
  };

  const filteredContracts = state.contracts.filter((c) => {
    if (filter === "ALL") return true;
    return getGroupStatus(c.status) === filter;
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

      
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="ALL">All</option>
        <option value="PENDING">Pending</option>
        <option value="ACTIVE">Active</option>
        <option value="SIGNED">Signed</option>
      </select>

      <table>
        <thead>
          <tr>
            <th>Contract Name</th>
            <th>Blueprint Name</th>
            <th>Status</th>
            <th>Created Date</th>
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
                <span className={`status ${getGroupStatus(c.status)}`}>
                  {getGroupStatus(c.status)}
                </span>
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
                    Send
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
