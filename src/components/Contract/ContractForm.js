import React from "react";
import { useContracts } from "../../context/ContractContext";

export default function ContractForm(){
    const{state,dispatch}=useContracts();

    const createContract=(bp)=>{
        dispatch({
            type:"ADD_CONTRACT",
            payload:{
                id:Date.now(),
                name:bp.name+ "Contract",
                blueprintName:bp.name,
                fields:bp.fields,
                status:"CREATED",
                createdAt:new Date().toISOString(),

            },

        });
    };

    return(
        <div>
            <h2>Create Contract</h2>

            {state.blueprints.map((bp)=>(
                <button key={bp.id} onClick={()=>createContract(bp)}>
                    Use {bp.name}
                </button>
            ))} 
        </div>
    );
}