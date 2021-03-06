import * as React from "react";
import {
  ButtonToolbar,
  ToggleButton,
  ToggleButtonGroup
} from "react-bootstrap";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import * as reimbursementTableActions from "../../actions/reimbursement/reimbursement-table.actions";
import { Reimbursement } from "../../model/Reimbursement";
import { IReimbursementTableState, IState } from "../../reducers";
// import { PaginationComponent } from "../pagination/pagination.component";
import { ReimbursementComponent } from "./reimbursement.component";
import { getCurrentUser } from "../../App";

interface IProps extends RouteComponentProps<{}>, IReimbursementTableState {
  fetchReimbursements: () => void;
  filterReimbursements: (
    reimbursements: Reimbursement[],
    statusFilter: string[]
  ) => void;
  updateReimbursement: (reimbursementId: number, newStatus: string) => void;
  updateActivePage: (
    activePage: number,
    filteredReimbursements: Reimbursement[],
    itemsCountPerPage: number
  ) => void;
}

class ReimbursementTableComponent extends React.Component<IProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount = () => {
    this.props.fetchReimbursements();
  };

  public componentDidUpdate(prevProps: IProps) {
    if (this.props.reimbursements !== prevProps.reimbursements) {
      this.filterByStatus(this.props.statusFilter);
    }
    if (
      this.props.filteredReimbursements !== prevProps.filteredReimbursements
    ) {
      this.props.updateActivePage(
        this.props.activePage,
        this.props.filteredReimbursements,
        this.props.itemsCountPerPage
      );
    }
  }

  public filterByStatus = (statusArray: string[]) => {
    const filteredReimbursements = this.props.reimbursements.filter(
      reimbursement => {
        return statusArray.indexOf(reimbursement.status) >= 0;
      }
    );
    this.props.filterReimbursements(filteredReimbursements, statusArray);
  };

  public render() {
    // const filteredReimbursements = this.props.filteredReimbursements;
    // const numberOfFilteredReimbursements = filteredReimbursements.length;
    const currentUser = getCurrentUser();
    const managerColumn =
      currentUser && currentUser.role === "Manager" ? (
        <th scope="col">Approve/Deny</th>
      ) : null;
    return (
      <div className="container">
        <ButtonToolbar>
          <ToggleButtonGroup
            onChange={this.filterByStatus}
            type="checkbox"
            defaultValue={this.props.statusFilter}
          >
            <ToggleButton bsStyle={"primary"} value={"Pending"}>
              Pending
            </ToggleButton>
            <ToggleButton bsStyle={"primary"} value={"Approved"}>
              Approved
            </ToggleButton>
            <ToggleButton bsStyle={"primary"} value={"Denied"}>
              Denied
            </ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Amount</th>
              <th scope="col">Submitted</th>
              <th scope="col">Resolved</th>
              <th scope="col">Description</th>
              <th scope="col">Author</th>
              <th scope="col">Resolver</th>
              <th scope="col">Status</th>
              <th scope="col">Type</th>
              {managerColumn}
            </tr>
          </thead>
          <tbody>
            {this.props.renderedReimbursements.map(
              (reimbursement: Reimbursement) => {
                return (
                  <ReimbursementComponent
                    key={reimbursement.reimbursementId}
                    reimbursement={reimbursement}
                    changeStatus={(
                      reimbursementId: number,
                      newStatus: string
                    ) =>
                      this.props.updateReimbursement(reimbursementId, newStatus)
                    }
                  />
                );
              }
            )}
          </tbody>
        </table>
        {/* <PaginationComponent
          activePage={this.props.activePage}
          itemsCountPerPage={this.props.itemsCountPerPage}
          totalItemsCount={
            numberOfFilteredReimbursements ? numberOfFilteredReimbursements : 1
          }
          updateActivePage={(page: number) =>
            this.props.updateActivePage(
              page,
              filteredReimbursements,
              this.props.itemsCountPerPage
            )
          }
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => state.reimbursementTable;

const mapDispatchToProps = {
  fetchReimbursements: reimbursementTableActions.fetchReimbursements,
  filterReimbursements: reimbursementTableActions.filterReimbursements,
  updateActivePage: reimbursementTableActions.updateActivePage,
  updateReimbursement: reimbursementTableActions.updateReimbursement
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReimbursementTableComponent);
