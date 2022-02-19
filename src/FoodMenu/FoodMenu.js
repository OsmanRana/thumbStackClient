import React, { useState } from "react";
import foodMenu from "../mock/foodMenu";
import Orders from "../Orders/Orders";
import FoodMenuDetails from "./FoodMenuDetails";
const FoodMenu = () => {
  const [foodOrder, setfoodOrder] = useState([]);

  const handleOrder = (food) => {
    setfoodOrder(foodOrder.concat(food));
  };

  return (
    <div className="container p-5 ">
      <div className=" p-3 m-3 border-0 shadow ">
        <div className="bg-warning p-3 m-3 text-white text-start">
          <h1>My Orders</h1>
          <p>No of Items: {foodOrder.length} </p>
          <p>Total:</p>
          <p>Tip @ 10%: </p>
          <h3>Total to Pay: </h3>
        </div>
        <div className=" p-3 m-3 border-0 shadow-sm d-flex flex-wrap ">
          {foodOrder.length !== 0 &&
            foodOrder.map((foodItem) => (
              <Orders key={foodItem.id} foodItem={foodItem}></Orders>
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
