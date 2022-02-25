import React, { useEffect, useState } from "react";
import foodMenu from '../../mock/foodMenu'
import AddNewItem from "../Orders/AddNewItem";
import ConfirmedOrder from "../Orders/ConfirmedOrder";
import Orders from "../Orders/Orders";
import FoodMenuDetails from "./FoodMenuDetails";
import { jsPDF } from "jspdf";

const FoodMenu = () => {
  const [foodOrder, setfoodOrder] = useState([]);
  const [confirmOrders, setConfirmOrders] = useState([]);
  const [display, setDisplay] = useState(false);
  const [newItemId, setNewItemId] = useState("");
  const [subtotal, setSubtotal] = useState([]);

  const handleBill = (id) => {
    fetch(`https://blooming-tundra-68684.herokuapp.com/singleOrder/${id}`)
      .then((res) => res.json())
      .then((data) => setSubtotal(data.foodOrder));
    alert("Calculating bill");
  };

  useEffect(() => {
    fetch("https://blooming-tundra-68684.herokuapp.com/orders")
      .then((res) => res.json())
      .then((data) => setConfirmOrders(data));
  }, []);

  let total = 0;
  for (let i = 0; i < subtotal.length; i++) {
    total += subtotal[i].price;
  }
  let tip = Number((total * 0.1).toFixed(2));

  let grandTotal = total + tip;

  const handlePdfgeneration = () => {
    const doc = new jsPDF("portrait", "px", "a4", "flase");
    alert("Generating a PDF bill");

    doc.text("Ozy Restaurant", 60, 60);
    doc.text(`Number of Items: ${subtotal.length}`, 60, 80);
    doc.text(`Sub-Total: $ ${total}`, 60, 100);
    doc.text(`Tip @ 10%: $ ${tip}`, 60, 120);
    doc.text(`Total to pay: $ ${grandTotal}`, 60, 140);
    doc.save("Bill.pdf");
  };

  const handleOrder = (food) => {
    setfoodOrder(foodOrder.concat(food));
  };

  const handleRemoveItem = (id) => {
    const newFoodOrder = foodOrder.filter((foodItem) => foodItem.id !== id);
    setfoodOrder(newFoodOrder);
  };

  const handleRemoveItemFromConfirmOrder = (id) => {
    const proceed = window.confirm("Are you sure to delete the order");
    if (proceed) {
      fetch(`https://blooming-tundra-68684.herokuapp.com/orders/${id}`, {
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
    fetch("https://blooming-tundra-68684.herokuapp.com/addOrder", {
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
    fetch(`https://blooming-tundra-68684.herokuapp.com/addItem/${newItemId}`, {
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
            <p>No of Items: {subtotal.length} </p>
            <p>Total: $ {total}</p>
            <p>Tip @ 10%: $ {tip} </p>
            <h3>Total to Pay: $ {grandTotal} </h3>
            <button
              className="btn btn-light fw-bold w-25 my-3"
              onClick={() => handlePdfgeneration()}
            >
              Generate PDF Bill
            </button>
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
                  handleBill={handleBill}
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
