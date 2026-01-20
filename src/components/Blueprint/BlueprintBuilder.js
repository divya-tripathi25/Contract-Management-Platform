import React, { useState } from "react";
import { useContracts } from "../../context/ContractContext";

export default function BlueprintBuilder() {
  const { dispatch } = useContracts();

  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState("Text");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  
  const addField = () => {
    if (!label) return;

    setFields([
      ...fields,
      {
        id: Date.now(),
        label,
        type,
        position: { x, y },
      },
    ]);

    // reset field inputs
    setLabel("");
    setType("Text");
    setX(0);
    setY(0);
  };

  const saveBlueprint = () => {
    if (!name || fields.length === 0) return;

    dispatch({
      type: "ADD_BLUEPRINT",
      payload: {
        id: Date.now(),
        name,
        fields,
      },
    });

    setName("");
    setFields([]);
  };

  return (
    <div>
      <h2>Create Blueprint</h2>

      
      <input
        placeholder="Blueprint name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      
      <div style={{ marginTop: "10px" }}>
        <input
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Text">Text</option>
          <option value="Date">Date</option>
          <option value="Signature">Signature</option>
          <option value="Checkbox">Checkbox</option>
        </select>

        <input
          type="number"
          placeholder="X"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Y"
          value={y}
          onChange={(e) => setY(Number(e.target.value))}
        />

        <button onClick={addField}>Add field</button>
      </div>

      
      {fields.length === 0 && <p>No fields yet. Add at least one to save.</p>}

      <ul>
        {fields.map((f) => (
          <li key={f.id}>
            <strong>{f.label}</strong> — {f.type} ({f.position.x},{" "}
            {f.position.y})
          </li>
        ))}
      </ul>

      <button onClick={saveBlueprint}>Save Blueprint</button>
    </div>
  );
}
