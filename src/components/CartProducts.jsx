import { AddCircle, CloseOutlined, DeleteOutlined, RemoveCircle } from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
const CartProducts = ({ onClose }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartitems, setCartItems] = useState([]);
  const modelref = useRef();
  const router = useRouter();

  const quantityAddHandler = (item) => {
    const updatedCart = cartitems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 } // Increment quantity
        : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const quantityDecrementHandler = (item) => {
    const updatedCart = cartitems.map((cartItem) =>
      cartItem.id === item.id
        ? {
          ...cartItem,
          quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1, // Ensure quantity does not go below 1
        }
        : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };


  useEffect(() => {
    const storedItem = JSON.parse(localStorage.getItem("cart"));
    if (storedItem) {
      setCartItems(storedItem);
      console.log("the item quantity ", storedItem);

    }
  }, []);

  useEffect(() => {
    const newTotalPrice = cartitems.reduce(
      (sum, item) => sum + parseFloat(item.price * item.quantity),
      0
    );
    setTotalPrice(newTotalPrice);
    localStorage.setItem("totalPrice", JSON.stringify(newTotalPrice));
  }, [cartitems]);

  const CloseModel = (e) => {
    if (modelref.current === e.target) {
      onClose();
    }
  };

  const handleDeleteItem = (itemId) => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item.id !== itemId); // Exclude the item with the matching ID
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);

  }




  return (
    <div
      ref={modelref}
      onClick={CloseModel}
      className="h-screen w-screen inset-0 fixed bg-[rgba(0,0,0,0.4)] flex items-end justify-end">
      <div className="w-[320px] h-screen  p-4 overflow-y-scroll bg-white">
        <CloseOutlined
          onClick={onClose}
          className=" absolute top-8 text-[#2E2E2E] text-[40px] right-8"
        />
        <h1 className="text-[20px] font-semibold text-[#2E2E2E]  my-[50px] ">
          Shopping Cart
        </h1>
        {cartitems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-between relative border-[1px] rounded-lg   p-4 mb-4">
            <div className="h-[80px]  flex items-center  w-full  ">
              <div>
                <img
                  src={item.image1url}
                  alt={item.name}
                  className="h-[80px] w-[80px]"
                />
              </div>
              <div className="flex flex-col ml-4 w-[50%]   ">
                <h1 className="text-[15px] text-[#2E2E2E] font-medium ">{item.name}</h1>
                <h1 className="text-[15px]  font-medium text-[#FF4545]">
                  {item.price} RS.
                </h1>
                <div className="flex items-center justify-between w-full mt-2 pr-4 ">

                  <AddCircle onClick={() => quantityAddHandler(item)} className="w-[20px] text-[#2E2E2E] h-[20px] "
                    
                  />
                  <h1 className="font-light text-[#2E2E2E]">
                    {item.quantity}
                  </h1>
                  <RemoveCircle onClick={() => quantityDecrementHandler(item)} className="w-[20px] text-[#2E2E2E] h-[20px] "
                    
                  />

                </div>

              </div>
              <DeleteOutlined
                className="cursor-pointer text-[#2E2E2E] absolute  right-3"
                onClick={() => handleDeleteItem(item.id)} // Pass item id to handleDeleteItem
              />

            </div>


          </div>

        ))}
        <div className="mt-12 flex items-center justify-between">
          <h1 className="text-[20px] font-bold text-[#2E2E2E] ">Subtotal</h1>
          <h2 className="text-[20px] font-bold text-[#2E2E2E]">{totalPrice.toFixed(1)} RS.</h2>
        </div>
        {cartitems.length !== 0 ?
          <>
            <Link
              href={{
                pathname: "/placeOrder",
              }}>
              <div >

                <button className="w-full h-[40px] bg-[#212121] text-white font-medium mt-[20px] ">
                  Checkout
                </button>
              </div>
            </Link></>
          : <h1 className="mt-12 text-center text-[19px] font-medium text-[#FF4545] bg-[#f4f4f4] px-4 py-2 rounded-md shadow-sm">
            Please add a product checkout
          </h1>
        }
      </div>
    </div>
  );
};

export default CartProducts;
