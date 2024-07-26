import React, { useState } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import "./App.css";

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Trigger re-render to refresh product list
  };

  return (
    <div className="App">
      <h1>Online Grocery Store</h1>
      <AddProduct onProductAdded={handleProductAdded} />
      <ProductList key={refreshKey} />
    </div>
  );
};

export default App;
