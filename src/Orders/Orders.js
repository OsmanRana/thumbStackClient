import React from "react";

const Orders = ({ foodItem }) => {
  const { name, price } = foodItem;
  console.log(typeof(price));
  return (
    <div style={{ maxWidth: "24rem", textAlign: "left", borderRight: "1px solid" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Price: $ {price}</p>
      </div>
    </div>
  );
};

export default Orders;
