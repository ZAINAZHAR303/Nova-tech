'use client';

import { useState } from "react";
import { db } from "../../../config/firebase";
import { collection, addDoc,deleteDoc } from "firebase/firestore"; // Import Firestore functions
import DisplayProduct from "../displayProduct/DisplayProduct";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const[image1, setImage1] = useState("");
  const[image2, setImage2] = useState("");
  const [description, setDescription] = useState("");

  const addProductHandler = async () => {
    try {
      const product = {
        name,
        price,
        image,
        image1,
        image2,
        description,
      };

      // Add a new document to the "products" collection
      const docRef = await addDoc(collection(db, "products"), product);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setName("");
    setPrice("");
    setImage("");
    setDescription("");

  };

  return (
    <div>
      <input
        value={name}
        type="text"
        placeholder="Product Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        value={price}
        type="number"
        placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <input
        value={description}
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <input
        value={image}
        type="text"
        placeholder="Image URL"
        onChange={(e) => setImage(e.target.value)}
      />
      <br />
      <input
        value={image1}
        type="text"
        placeholder="2nd optional Image URL"
        onChange={(e) => setImage1(e.target.value)}
      />
      <br />
      
      <input
        value={image2}
        type="text"
        placeholder="3rd optional Image URL"
        onChange={(e) => setImage2(e.target.value)}
      />
      <br />
      
      <button onClick={addProductHandler}>Add Product</button>
      <DisplayProduct/>
    </div>
  );
}
