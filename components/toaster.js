import React from "react";

function Toaster(props) {
  return (
    <div
      className={`bs-toast toast toast-placement-ex m-2 ${props.visiblity} top-0 end-0 bg-${props.type}`}
      role={props.type}
      aria-live="assertive"
      aria-atomic="true"
      data-delay="2000"
    >
      <div className="toast-header">
        <i className="bx bx-bell me-2"></i>
        <div className="me-auto fw-semibold">{props.title}</div>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">{props.text}</div>
      <div className="toast-body">{props.positions}</div>
    </div>
  );
}

export default Toaster;
