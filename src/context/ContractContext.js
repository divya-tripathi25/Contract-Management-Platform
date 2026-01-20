import React, { createContext, useReducer, useContext } from "react";

const ContractContext = createContext();

const initialState = {
  blueprints: [],
  contracts: [],
  selectedContractId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_BLUEPRINT":
      return {
        ...state,
        blueprints: [...state.blueprints, action.payload],
      };

    case "ADD_CONTRACT":
      return {
        ...state,
        contracts: [...state.contracts, action.payload],
      };

    case "UPDATE_STATUS":
      return {
        ...state,
        contracts: state.contracts.map((c) =>
          c.id === action.payload.id
            ? { ...c, status: action.payload.status }
            : c
        ),
      };


    case "UPDATE_FIELD_VALUE":
      return {
        ...state,
        contracts: state.contracts.map((c) =>
          c.id === action.payload.contractId
            ? {
                ...c,
                fields: c.fields.map((f) =>
                  f.id === action.payload.fieldId
                    ? { ...f, value: action.payload.value }
                    : f
                ),
              }
            : c
        ),
      };

    case "SELECT_CONTRACT":
      return {
        ...state,
        selectedContractId: action.payload,
      };

    default:
      return state;
  }
}

export function ContractProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ContractContext.Provider value={{ state, dispatch }}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContracts() {
  return useContext(ContractContext);
}
