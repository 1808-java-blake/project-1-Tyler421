import * as React from "react";
import { Reimbursement } from "../../model/Reimbursement";
import { getCurrentUser } from "../../App";

interface IProps {
  reimbursement: Reimbursement;
  changeStatus: (reimbursementId: number, newStatus: string) => void;
}

export const ReimbursementComponent: React.StatelessComponent<
  IProps
> = props => {
  const { reimbursement, changeStatus } = props;
  const currentUser = getCurrentUser();
  const managerColumn = currentUser && currentUser.role === "Manager";
  return (
    <tr>
      <th scope="row">{reimbursement.reimbursementId}</th>
      <td>${reimbursement.amount}</td>
      <td>{formatTime(reimbursement.submitted)}</td>
      <td>{reimbursement.resolved && formatTime(reimbursement.resolved)}</td>
      <td>{reimbursement.description}</td>
      <td>{reimbursement.author.username}</td>
      <td>{reimbursement.resolver && reimbursement.resolver.username}</td>
      <td>{reimbursement.status}</td>
      <td>{reimbursement.type}</td>
      {managerColumn ? (
        <td>
          {reimbursement.status === "Pending" ? (
            <div className="container">
              <div className="btn-group-vertical">
                <button
                  type="button"
                  className="btn btn-secondary btn-primary"
                  onClick={() =>
                    changeStatus(reimbursement.reimbursementId, "Approved")
                  }
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-primary"
                  onClick={() =>
                    changeStatus(reimbursement.reimbursementId, "Denied")
                  }
                >
                  Deny
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </td>
      ) : (
        <></>
      )}
    </tr>
  );
};

const formatTime = (time: Date) => {
  time = new Date(time);
  let h = time.getHours();
  const amPm = h < 12 ? "AM" : "PM";
  h =  h - 4;
  h = h === 0 ? 12 : h;
  const minutes = time.getMinutes();
  const m = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = time.getSeconds();
  const s = seconds < 10 ? `0${seconds}` : seconds;
  const yyyy = time.getFullYear();
  const month = time.getMonth();
  const mm = month + 1;
  const day = time.getDay();
  const dd = day + 9;
  return (
    <div>
      {yyyy}-{mm}-{dd}
      <br />
      {h}:{m}:{s} {amPm}
    </div>
  );
};
