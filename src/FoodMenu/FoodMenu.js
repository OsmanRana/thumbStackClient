import React, { useState } from "react";
import foodMenu from "../mock/foodMenu";
import Orders from "../Orders/Orders";
import FoodMenuDetails from "./FoodMenuDetails";
const FoodMenu = () => {
  const [foodOrder, setfoodOrder] = useState([]);
  const [subtotal, setSubTotal] = useState([]);

  let total = 0;
  for (let i = 0; i < subtotal.length; i++) {
    total += subtotal[i];
  }
  let tip = total * (0.1).toFixed(2);
  let grandTotal = total + tip;

  const handleOrder = (food) => {
    setfoodOrder(foodOrder.concat(food));
    setSubTotal(subtotal.concat(food.price));
  };

  return (
    <div className="container p-5 ">
      <div className=" p-3 m-3 border-0 shadow ">
        <div className="bg-warning p-3 m-3 text-white text-start">
          <h1>My Orders</h1>
          <p>No of Items: {foodOrder.length} </p>
          <p>Total: $ {total}</p>
          <p>Tip @ 10%: $ {tip} </p>
          <h3>Total to Pay: $ {grandTotal} </h3>
        </div>
        <div className=" p-3 m-3 border-0 shadow-sm d-flex flex-wrap ">
          {foodOrder.length !== 0 &&
            foodOrder?.map((foodItem) => (
              <Orders
                key={foodOrder.indexOf(foodItem) + Math.random()}
                foodItem={foodItem}
              ></Orders>
            ))}
        </div>
        <button
          type="button"
          className="btn btn-danger fw-bold"
          //   onClick={() => handleOrder(food)}
        >
          Pay Now
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-3">
        {foodMenu.map((food) => (
          <FoodMenuDetails
            key={food.id}
            food={food}
            handleOrder={handleOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
