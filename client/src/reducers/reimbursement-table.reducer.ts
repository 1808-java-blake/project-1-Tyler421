import { IReimbursementTableState } from ".";
import { reimbursementTableTypes } from "../actions/reimbursement/reimbursement-table.types";

const initialState: IReimbursementTableState = {
  activePage: 1,
  filteredReimbursements: [],
  itemsCountPerPage: 10,
  reimbursements: [],
  renderedReimbursements: [],
  statusFilter: []
};

export const reimbursementTableReducer = (
  state = initialState,
  action: any
) => {
  switch (action.type) {
    case reimbursementTableTypes.FETCH_REIMBURSEMENTS:
      return {
        ...state,
        reimbursements: action.payload.reimbursements
      };
    case reimbursementTableTypes.FILTER_REIMBURSEMENTS:
      return {
        ...state,
        filteredReimbursements: action.payload.filteredReimbursements,
        statusFilter: action.payload.statusFilter
      };
    case reimbursementTableTypes.UPDATE_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload.activePage,
        renderedReimbursements: action.payload.renderedReimbursements
      };
    case reimbursementTableTypes.UPDATE_REIMBURSEMENT:
      return {
        ...state,
        reimbursements: state.reimbursements.map(reimbursement => {
          return reimbursement.reimbursementId ===
            action.payload.reimbursementId
            ? {
                ...reimbursement,
                resolved: action.payload.resolved,
                resolver: action.payload.resolver,
                status: action.payload.newStatus
              
              }
            : reimbursement;
        })
      };
  }
  return state;
};
