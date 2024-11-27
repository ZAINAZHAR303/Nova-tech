import { CloseOutlined } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

const CartProducts = ({ onClose }) => {
  const[totalPrice,SetTotalPrice] = useState(0)
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

  const CloseModel = (e) => {
    if (modelref.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modelref}
      onClick={CloseModel}
      className="h-screen w-screen inset-0 fixed bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
      <div className="w-[320px] p-4 rounded-[10px] bg-white">
        <CloseOutlined onClick={onClose} />
        <h1 className="text-[20px] mb-[50px] ">Shopping Cart</h1>
        {cartitems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-8">
            <div className="h-[80px]flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-[80px] w-[80px]"
              />
              <div className="flex flex-col ">
                <h1 className="text-[15px] font-medium ">{item.name}</h1>
                <h1 className="text-[15px] font-medium text-[#FF4545]">
                  {item.price}

                </h1>
              </div>
            </div>
            {/* {SetTotalPrice(item.price+totalPrice)
            
            } */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartProducts;
