import React from "react";
import foodMenu from "../mock/foodMenu";
import FoodMenuDetails from "./FoodMenuDetails";
const FoodMenu = () => {
  return (
    <div>
      {foodMenu.map((food) => (
        <FoodMenuDetails key={food.id} food={food} />
      ))}
    </div>
  );
};

export default FoodMenu;
