import React from "react";

const Orders = ({ foodItem, handleRemoveItem }) => {
  const { id, name, price } = foodItem;
  return (
    <div
      style={{ maxWidth: "24rem", textAlign: "left", borderRight: "1px solid" }}
    >
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Price: $ {price}</p>
        <button
          type="button"
          className="btn btn-danger fw-bold text-white"
          onClick={() => handleRemoveItem(id)}
        >
          Remove Item
        </button>
      </div>
    </div>
  );
};

export default Orders;
