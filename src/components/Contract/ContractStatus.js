import React from "react";
import { useContracts } from "../../context/ContractContext";

const flow=["CREATED","APPROVED","SENT","SIGNED","LOCKED"];

export default function ContractStatus({contract}){
    const {dispatch}=useContracts();
    const index=flow.index0f(contract.status);
    const nextStatus=flow[index+1];

    return(
        <div>
            <strong>{contract.status}</strong>

            {nextStatus && contract.status!=="REVOKED" &&(
                <button onClick={()=>
                    dispatch({
                        type:"UPDATE_STATUS",
                        payload:{id:contract.id,status:nextStatus},
                    })
                }
                >Move to {nextStatus}
                </button>
            )}

            {contract.status!=="LOCKED" && (
                <button onClick={()=>
                    dispatch({
                        type:"UPDATE_STATUS",
                        payload:{id:contract.id,status:"REVOKED"},
                    })
                }
                >Revoke</button>
            )}
        </div>
    );
}