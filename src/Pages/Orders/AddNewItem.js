import React from "react";

const AddNewItem = ({ food, getNewItem }) => {
  const { name, price } = food;
  return (
    <>
      <div
        className="card p-3 m-3 border-0 shadow"
        style={{ maxWidth: "24rem" }}
      >
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">Price: $ {price}</p>
          <button
            type="button"
            className="btn btn-success fw-bold text-white"
            onClick={() => getNewItem(food)}
          >
            Add Item
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNewItem;
