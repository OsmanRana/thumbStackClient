import React from "react";

const ConfirmedOrder = ({
  order,
  handleRemoveItemFromConfirmOrder,
  handleAddNewItem,
  handleSubTotal,
}) => {
  const { foodOrder } = order;
  return (
    <>
      <div>
        {foodOrder?.length > 0 &&
          foodOrder?.map((foodOrderItem) => {
            return (
              <div
                key={foodOrderItem.id*Math.random()}
                style={{
                  maxWidth: "24rem",
                  textAlign: "left",
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">{foodOrderItem.name}</h5>
                  <p className="card-text">Price: $ {foodOrderItem.price}</p>
                  {handleSubTotal(foodOrderItem.price)}
                </div>
              </div>
            );
          })}
      </div>

      <button
        type="button"
        className="btn btn-success fw-bold text-white w-25 my-3"
        onClick={() => handleAddNewItem(order?._id)}
      >
        Add Item
      </button>
      <button
        type="button"
        className="btn btn-danger fw-bold text-white w-25"
        onClick={() => handleRemoveItemFromConfirmOrder(order._id)}
      >
        Delete Order
      </button>
    </>
  );
};

export default ConfirmedOrder;
