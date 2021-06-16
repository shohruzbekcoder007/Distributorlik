import React from "react";
import "./Modal.css";

export const Modal = ({ show, close, discountList }) => {
  return (
    <div
      className="modal-wrapper"
      style={{
        transform: show ? "translateY(0vh)" : "translateY(-100vh)",
        opacity: show ? "1" : "0",
      }}
    >
      <div className="modal-header">
        <p>Chegirmadagi mahsulotlar ro'yxati</p>
        <span onClick={close} className="close-modal-btn">
          x
        </span>
      </div>
      <div className="modal-content">
        <div className="modal-body table-responsive">
          <table className="table table-striped table-hover text-center  mb-0 text-white">
            <thead>
              <tr>
                <td scope="col">Mahsulot nomi</td>
                <td scope="col">Provider</td>
                <td scope="col">Miqdori</td>
                <td scope="col">O'lchov turi</td>
              </tr>
            </thead>
            <tbody>
              {discountList.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.provider}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <div className="modal-footer">
                    <button onClick={close} className="btn-cancel">Close</button>
                </div> */}
      </div>
    </div>
  );
};
