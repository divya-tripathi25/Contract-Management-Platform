import React,{useState} from "react";
import {useContracts} from "../../context/ContractContext";

export default function BlueprintBuilder(){
    const{dispatch}=useContracts();
    const[name,setName]=useState("");
    const[fields,setFields]=useState([]);

    const addField=(type)=>{
        setFields([
            ...fields,
            {
                id:Date.now(),
                type,
                label:`${type} field`,
                position:{x:0,y:fields.length*30},
            },
        ]);
};

    const saveBlueprint=()=>{
        dispatch({
            type:"ADD_BLUEPRINT",
            payload:{
                id:Date.now(),
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
        placeholder="Blueprint Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div>
        <button onClick={() => addField("Text")}>Text</button>
        <button onClick={() => addField("Date")}>Date</button>
        <button onClick={() => addField("Signature")}>Signature</button>
        <button onClick={() => addField("Checkbox")}>Checkbox</button>
      </div>

      <ul>
        {fields.map((f) => (
          <li key={f.id}>{f.label}</li>
        ))}
      </ul>

      <button onClick={saveBlueprint}>Save Blueprint</button>
    </div>
  );
}