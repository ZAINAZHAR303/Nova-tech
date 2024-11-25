'use client'
import { useState } from "react"

export default function AddProduct() {
const[name,setName] =useState("")
const [price,setPrice] =useState("")
const [image,setImage] = useState("")
const [description,setDescription] = useState("")
const  addProductHandler = ()=>{
    const product = {
        name:name,
        price:price,
        image:image,
        description:description
    }
}
    return (
    <div>
      <input value={name} type="text" placeholder="Product Name" onChange={ e => setName(e.target.value)} />
      <br/>
      <input value={price} type="number" placeholder="Price"  onChange={ e => setPrice(e.target.value)} />
      <br/>
      <input  value={description} type='text' placeholder='Description' onChange={ e => setDescription(e.target.value)} />
      <br/>
      <imput value={image} type="text" placeholder= "image url" onChange={ e => setImage(e.target.value)} />
      <button onClick={addProductHandler}>Add Product</button>
    </div>
  )
}
