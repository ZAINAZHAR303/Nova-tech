import { CloseOutlined, DeleteOutlined } from "@mui/icons-material";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const CartProducts = ({ onClose }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartitems, setCartItems] = useState(() => {
    // Load initial cart items from localStorage
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const modelref = useRef();

  useEffect(() => {
    const storedItem = localStorage.getItem("selectedItem for cart");
    if (storedItem) {
      const newItem = JSON.parse(storedItem);

      setCartItems((prevItems) => {
        const isItemAlreadyInCart = prevItems.some(
          (item) => item.id === newItem.id
        );
        const updatedCart = isItemAlreadyInCart
          ? prevItems
          : [...prevItems, newItem];

        // Persist the updated cart in localStorage
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });
    }
  }, []);

  useEffect(() => {
    // Calculate total price whenever cartitems changes
    const newTotalPrice = cartitems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotalPrice(newTotalPrice);
  }, [cartitems]);

  const CloseModel = (e) => {
    if (modelref.current === e.target) {
      onClose();
    }
  };

  const handleDeleteItem = (itemId) => {
    setCartItems((prevItems) => {
      const filteredItems = prevItems.filter((item) => item.id !== itemId);

      // Update localStorage with the filtered cart items
      localStorage.setItem("cartItems", JSON.stringify(filteredItems));
      return filteredItems;
    });
  };

  return (
    <div
      ref={modelref}
      onClick={CloseModel}
      className="h-screen w-screen inset-0 fixed bg-[rgba(0,0,0,0.4)] flex items-end justify-end">
      <div className="w-[320px] h-screen  p-4  bg-white">
        <CloseOutlined onClick={onClose} className=" absolute top-8 text-[40px] right-8" />
        <h1 className="text-[20px] font-semibold text-[#2E2E2E]  my-[50px] ">Shopping Cart</h1>
        {cartitems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-[1px] rounded-lg   p-4 mb-4">
            <div className="h-[80px] flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-[80px] w-[80px]"
              />
              <div className="flex flex-col ml-4 gap-2  ">
                <h1 className="text-[15px] font-medium ">{item.name}</h1>
                <h1 className="text-[15px]  font-medium text-[#FF4545]">
                  {item.price}  RS. 

                </h1>
              </div>
              <DeleteOutlined
                className="cursor-pointer fixed right-4"
                onClick={() => handleDeleteItem(item.id)} // Pass item id to handleDeleteItem
              />
            </div>
            
          </div>
        ))}
        <div className="mt-12 flex items-center justify-between">
          <h1 className="text-[20px] font-bold   ">Subtotal</h1>
          <h2 className="text-[20px] font-bold">{totalPrice.toFixed(1)} RS.</h2>
        </div>
        <Link href={{
            pathname: "/placeOrder",
            query: {
             totalPrice: totalPrice,
            },
          }}>
        <div>
          <button className="w-full h-[40px] bg-[#212121] text-white font-medium mt-[20px] ">Checkout</button>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default CartProducts;