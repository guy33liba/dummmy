import React, { useEffect, useState } from "react";
import "./Inventory.css";

const Inventory = () => {
 const [products, setProducts] = useState([]);
 const [name, setName] = useState("");
 const [price, setPrice] = useState("");
 const [quantity, setQuantity] = useState("");
 const [category, setCategory] = useState("");
 const [editingId, setEditingId] = useState(null);
 const [searchTerm, setSearchTerm] = useState("");
 const [isLoaded, setIsLoaded] = useState(false);
 useEffect(() => {
  try {
   const savedProducts = localStorage.getItem("inventory");
   setProducts(JSON.parse(savedProducts));
   setIsLoaded(true);
  } catch (error) {
   console.log("Load Error", error);
  }
 }, []);

 useEffect(() => {
  if (isLoaded && products.length >= 0) {
   try {
    localStorage.setItem("inventory", JSON.stringify(products));
   } catch (error) {
    console.error("Save Error", error);
   }
  }
 }, [products]);

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!name || !price || !quantity || !category) {
   alert("Please fill all fields");
   return;
  }

  if (editingId) {
   setProducts(
    products.map((product) =>
     product.id === editingId
      ? { ...product, name, price: parseFloat(price), quantity: parseInt(quantity), category }
      : product
    )
   );
   setEditingId(null);
  } else {
   const newProduct = {
    id: Date.now(),
    name,
    price: parseFloat(price),
    quantity: parseInt(quantity),
    category,
   };
   setProducts([...products, newProduct]);
  }

  setName("");
  setPrice("");
  setQuantity("");
  setCategory("");
 };

 const editProduct = (product) => {
  setName(product.name);
  setPrice(product.price);
  setQuantity(product.quantity);
  setCategory(product.category);
  setEditingId(product.id);
 };

 const deleteProduct = (id) => {
  setProducts(products.filter((product) => product.id !== id));
 };

 const filteredProducts = products.filter(
  (product) =>
   product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
   product.category.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
  <div className="inventory-container">
   <h1>Inventory Management</h1>

   <div className="search-container">
    <input
     type="text"
     placeholder="Search products..."
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
    />
   </div>

   <div className="inventory-layout">
    <div className="inventory-form">
     <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
     <form onSubmit={handleSubmit}>
      <div className="form-group">
       <label>Name:</label>
       <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
       />
      </div>

      <div className="form-group">
       <label>Price:</label>
       <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Product price"
        step="0.01"
       />
      </div>

      <div className="form-group">
       <label>Quantity:</label>
       <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
       />
      </div>

      <div className="form-group">
       <label>Category:</label>
       <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Product category"
       />
      </div>

      <div className="form-actions">
       <button type="submit" className="submit-btn">
        {editingId ? "Update Product" : "Add Product"}
       </button>

       {editingId && (
        <button
         type="button"
         className="cancel-btn"
         onClick={() => {
          setEditingId(null);
          setName("");
          setPrice("");
          setQuantity("");
          setCategory("");
         }}
        >
         Cancel
        </button>
       )}
      </div>
     </form>
    </div>

    <div className="products-list">
     <h2>Product Inventory ({filteredProducts.length})</h2>
     {filteredProducts.length === 0 ? (
      <p>No products found</p>
     ) : (
      <table>
       <thead>
        <tr>
         <th>Name</th>
         <th>Price</th>
         <th>Quantity</th>
         <th>Category</th>
         <th>Actions</th>
        </tr>
       </thead>
       <tbody>
        {filteredProducts.map((product) => (
         <tr key={product.id}>
          <td>{product.name}</td>
          <td>${product.price.toFixed(2)}</td>
          <td>{product.quantity}</td>
          <td>{product.category}</td>
          <td className="actions">
           <button onClick={() => editProduct(product)} className="edit-btn">
            Edit
           </button>
           <button onClick={() => deleteProduct(product.id)} className="delete-btn">
            Delete
           </button>
          </td>
         </tr>
        ))}
       </tbody>
      </table>
     )}
    </div>
   </div>
  </div>
 );
};

export default Inventory;
