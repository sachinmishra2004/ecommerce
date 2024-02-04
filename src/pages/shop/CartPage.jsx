import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setcartitems] = useState([]);

  //calculate the price:
  const calculateprice = (item) => {
    return item.price * item.quantity;
  };

  //handle increasing function
  const handleIncreasing = (item) => {
    // console.log(item._id);
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setcartitems(updatedCart);
      });
    refetch();
  };

  //handle the decreases function
  const handleDecrease = (item) => {
    // console.log(item._id);
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          refetch();
          setcartitems(updatedCart);
        });
      refetch();
    } else {
      alert("Item can't be zero");
    }
  };
  //calculate the total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculateprice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  //handle delete button
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch(); // this is use for render the items cards
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "deleted",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
    refetch();
  };
  return (
    <div className="section-container">
      <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col justify-center items-center gap-8">
          <div className=" space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug ">
              Items Added to The
              <span className="text-green">Food</span>{" "}
            </h2>
          </div>
        </div>
      </div>

      {/* {table data} */}
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-green">
              <tr className="text-white">
                <th>#</th>
                <th>Food</th>
                <th>Items</th>
                <th>Qunantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <td>
                    <button
                      className="btn btn-xs"
                      onClick={() => handleDecrease(item)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={() => console.log(item.quantity)}
                      className="w-10 mx-2 text-center overflow-hidden appearance-none"
                    />
                    <button
                      className="btn btn-xs"
                      onClick={() => handleIncreasing(item)}
                    >
                      +
                    </button>
                  </td>
                  <td>${calculateprice(item).toFixed(2)}</td>
                  <th>
                    <button
                      className="btn btn-ghost text-red btn-xs"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* customer details*/}
      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-meduim">Customer Details</h3>
          <h2>Name : {user.name}</h2>
          <p>Email : {user.email}</p>
          <p>User_id : {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <p className="font-meduim">Shoping details</p>
          <p>Total Items :{cart.length}</p>
          <p>total Price: ${orderTotal.toFixed(2)}</p>
          <button className="btn bg-green text-white">Proceed CheckOut</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
