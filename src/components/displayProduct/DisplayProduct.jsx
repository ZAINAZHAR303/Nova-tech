import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { collection, getDocs,deleteDoc,doc } from "firebase/firestore";

export default function DisplayProduct() {

  const [products, setProducts] = useState([]); // State to hold the fetched products

  const getProducts = async () => {
    try {
      const collectionRef = collection(db, "products");
      const docs = await getDocs(collectionRef);
      let data = [];
      docs.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() }); // Store document ID and data
      });
      setProducts(data); 
      console.log("datat",data);
      // Update the state with fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const onDeleteHandler = async (id)=>{
    console.log(id)
    try {
      const docRef = doc(db, "notes", id);
      console.log("doc delet");
      
      await deleteDoc(docRef);
      console.log("docoument deleted");
      
      return;
  } catch (error) {
      console.log("error", error);
      throw error;
  }
  };


  useEffect(
    () => {
        getProducts();
        },[]
  )

  return (
    <div style={{ marginTop: 50 }}>
      {/* Display products */}
      <div>
        {products.map((item) => (
          <div key={item.id} style={{ margin: "10px 0" }}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: RS-{item.price}</p>
            <img src={item.image} style={{ maxWidth: "200px" }} />
            <img src={item.image1} style={{ maxWidth: "200px" }} />
            <img src={item.image2} style={{ maxWidth: "200px" }} />
            
            <button onClick={()=>onDeleteHandler(item.id)} style={{backgroundColor:"red"}}> Delete</button>
            {/* <button onClick = {()=>onUpdateHandler(item)} style={{backgroundColor:"green"}}> Update</button> */}
            <hr />
            <hr/>
          </div>
        ))}
      </div>
    </div>
  );
}
