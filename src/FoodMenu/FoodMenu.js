import React from "react";
import foodMenu from "../mock/foodMenu";
import FoodMenuDetails from "./FoodMenuDetails";
const FoodMenu = () => {
  return (
    <div className="container p-5 ">
      <div className="row row-cols-1 row-cols-md-3">
        {foodMenu.map((food) => (
          <FoodMenuDetails key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default FoodMenu;
