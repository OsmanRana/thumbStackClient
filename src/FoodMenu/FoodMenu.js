import React, { useEffect, useState } from "react";
import foodMenu from "../mock/foodMenu";
import AddNewItem from "../Orders/AddNewItem";
import ConfirmedOrder from "../Orders/ConfirmedOrder";
import Orders from "../Orders/Orders";
import FoodMenuDetails from "./FoodMenuDetails";
const FoodMenu = () => {
  const [foodOrder, setfoodOrder] = useState([]);
  const [subtotal, setSubTotal] = useState([]);
  const [confirmOrders, setConfirmOrders] = useState([]);
  const [display, setDisplay] = useState(false);
  const [newItemId, setNewItemId] = useState("");
  console.log(confirmOrders);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setConfirmOrders(data));
  }, []);

  let total = 0;
  for (let i = 0; i < subtotal.length; i++) {
    total += subtotal[i];
  }
  let tip = total * (0.1).toFixed(2);
  let grandTotal = total + tip;

  const handleOrder = (food) => {
    setfoodOrder(foodOrder.concat(food));
  };

  const handleSubTotal = (item) => {
    // setSubTotal(subtotal.concat(item));
    console.log(total);
  };

  const handleRemoveItem = (id) => {
    const newFoodOrder = foodOrder.filter((foodItem) => foodItem.id !== id);
    setfoodOrder(newFoodOrder);
  };

  const handleRemoveItemFromConfirmOrder = (id) => {
    const proceed = window.confirm("Are you sure to delete the order");
    if (proceed) {
      fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Order deletes successfully!");
            const newConfirmedOrder = confirmOrders.filter(
              (order) => order._id !== id
            );
            setConfirmOrders(newConfirmedOrder);
          }
        });
    }
  };

  const handleConfirmOrder = () => {
    fetch("http://localhost:5000/addOrder", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ foodOrder }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Your order palced Successfully!");
          setfoodOrder("");
          window.location.reload();
        }
      });
  };

  const getNewItem = (food) => {
    fetch(`http://localhost:5000/addItem/${newItemId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(food),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Item added successfully");
          window.location.reload();
        }
      });
  };

  const handleAddNewItem = (id) => {
    setNewItemId(id);
    if (display) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  };
  return (
    <>
      <div className="container p-5 ">
        <div className=" p-3 m-3 border-0 shadow ">
          <div className="bg-warning p-3 m-3 text-white text-start">
            <h1>My Orders</h1>
            <p>No of Items: {foodOrder.length} </p>
            <p>Total: $ {total}</p>
            <p>Tip @ 10%: $ {tip} </p>
            <h3>Total to Pay: $ {grandTotal} </h3>
          </div>
          <h3>Placed Orders: </h3>
          <div className=" p-3 m-3 border-0 shadow-sm d-flex flex-column flex-wrap ">
            {confirmOrders?.length !== 0 &&
              confirmOrders?.map((order) => (
                <ConfirmedOrder
                  key={order._id}
                  order={order}
                  handleAddNewItem={handleAddNewItem}
                  handleRemoveItemFromConfirmOrder={
                    handleRemoveItemFromConfirmOrder
                  }
                  handleSubTotal={handleSubTotal}
                ></ConfirmedOrder>
              ))}
          </div>
          {display && (
            <div className="row row-cols-1 row-cols-md-3">
              {foodMenu.map((food) => (
                <AddNewItem key={food.id} food={food} getNewItem={getNewItem} />
              ))}
            </div>
          )}
          <h3>Taking Orders: </h3>
          <div className=" p-3 m-3 border-0 shadow-sm d-flex flex-wrap ">
            {foodOrder.length !== 0 &&
              foodOrder?.map((foodItem) => (
                <Orders
                  key={foodOrder.indexOf(foodItem) + Math.random()}
                  foodItem={foodItem}
                  handleRemoveItem={handleRemoveItem}
                ></Orders>
              ))}
          </div>
          <button
            type="button"
            className="btn btn-success fw-bold"
            onClick={() => handleConfirmOrder()}
          >
            Confirm Order
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
    </>
  );
};

export default FoodMenu;
