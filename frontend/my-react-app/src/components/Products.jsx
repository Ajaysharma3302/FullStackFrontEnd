// src/components/Products.js
import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../components/api/api';
import AuthContext from '../context/AuthContext';

const Products = () => {
  const { authToken } = React.useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  const handleCreate = async () => {
    try {
      await createProduct(newProduct);
      setProducts([...products, newProduct]);
    } catch (err) {
      console.error('Failed to create product', err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updatedProduct = { ...newProduct }; // Update with form data
      await updateProduct(id, updatedProduct);
      setProducts(products.map((product) => (product.id === id ? updatedProduct : product)));
    } catch (err) {
      console.error('Failed to update product', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error('Failed to delete product', err);
    }
  };

  if (!authToken) {
    return <div>Please log in to manage products.</div>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <div>
        <input
          type="text"
          placeholder="Product name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Product price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={handleCreate}>Create Product</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name} - ${product.price}</span>
            <button onClick={() => handleUpdate(product.id)}>Update</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
