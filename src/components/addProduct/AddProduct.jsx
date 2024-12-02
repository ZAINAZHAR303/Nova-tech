"use client";

import { useState, useRef } from "react";
import { db } from "../../../config/firebase";
import { collection, addDoc, deleteDoc } from "firebase/firestore"; // Import Firestore functions

import { CloseOutlined } from "@mui/icons-material";
import Loader from "../loader/Loader";

export default function AddProduct({ onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const [image1url, setImage1url] = useState("");
  const [image2url, setImage2url] = useState("");
  const [image3url, setImage3url] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setloading] = useState(false);
  const modelref = useRef();

  const addProductHandler = async () => {
    try {
      setloading(true);
      let uploadedImage1Url = "";
      let uploadedImage2Url = "";
      let uploadedImage3Url = "";

      if (image1) uploadedImage1Url = await uploadImage1();
      if (image2) uploadedImage2Url = await uploadImage2();
      if (image3) uploadedImage3Url = await uploadImage3();

      if (!uploadedImage1Url && image1) throw new Error("Image1 URL not set");
      if (!uploadedImage2Url && image2) throw new Error("Image2 URL not set");
      if (!uploadedImage3Url && image3) throw new Error("Image3 URL not set");

      setImage1url(uploadedImage1Url);
      setImage2url(uploadedImage2Url);
      setImage3url(uploadedImage3Url);

      await addProductToFirestore({
        name,
        price,
        description,
        image1url: uploadedImage1Url,
        image2url: uploadedImage2Url,
        image3url: uploadedImage3Url,
      });

      resetForm();
      alert("Product added successfully!");
      setloading(false);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. See console for details.");
    }
  };

  const uploadImage1 = async () => {
    const data = new FormData();
    data.append("file", image1);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();

      return responseData.url;
    } catch (error) {
      console.error("Error uploading image1:", error);
    }
  };

  const uploadImage2 = async () => {
    const data = new FormData();
    data.append("file", image2);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();

      return responseData.url;
    } catch (error) {
      console.error("Error uploading image2:", error);
    }
  };

  const uploadImage3 = async () => {
    const data = new FormData();
    data.append("file", image3);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();
      console.log("image3url", responseData.url);

      return responseData.url;
    } catch (error) {
      console.error("Error uploading image3:", error);
    }
  };

  const addProductToFirestore = async (product) => {
    console.log("Adding product to Firestore:", product);
    await addDoc(collection(db, "products"), product);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage1url("");
    setImage2url("");
    setImage3url("");
  };
  const CloseModel = (e) => {
    if (modelref.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      ref={modelref}
      onClick={CloseModel}
      className="fixed inset-0 z-30 h-screen w-screen bg-[rgba(0,0,0,0.4)] flex items-center justify-center">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-[90%] lg:w-[50%] relative flex items-center flex-col justify-center p-4 py-12 rounded-[10px] bg-white">
          <CloseOutlined onClick={onClose} className="absolute top-4 right-4" />
          <input
            className="custom-input"
            value={name}
            type="text"
            placeholder="Product Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="custom-input"
            value={price}
            type="number"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            className="custom-input"
            value={description}
            type="text"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            className="custom-input"
            type="file"
            placeholder="Image URL"
            onChange={(e) => setImage1(e.target.files[0])}
          />

          <input
            className="custom-input"
            type="file"
            placeholder="2nd optional Image URL"
            onChange={(e) => setImage2(e.target.files[0])}
          />

          <input
            className="custom-input"
            type="file"
            placeholder="3rd optional Image URL"
            onChange={(e) => setImage3(e.target.files[0])}
          />

          <button
            className="w-[500px] max-sm:w-[80%] h-[40px] bg-[#212121] text-white font-medium mt-[20px]"
            onClick={addProductHandler}>
            ADD PRODUCT
          </button>
        </div>
      )}
    </div>
  );
}
