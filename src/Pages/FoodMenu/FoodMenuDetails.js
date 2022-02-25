import React from "react";

const FoodMenuDetails = ({ food, handleOrder }) => {
  const { name, price, image } = food;

  return (
    <>
      <div
        className="card p-3 m-3 border-0 shadow"
        style={{ maxWidth: "24rem" }}
      >
        <img src={image} className="card-img-top iimg-fluid" alt="Food" />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Price: $ {price}</p>
          <button
            type="button"
            className="btn btn-success fw-bold text-white"
            onClick={() => handleOrder(food)}
          >
            Order Now
          </button>
        </div>
      </div>
    </>
  );
};

export default FoodMenuDetails;
