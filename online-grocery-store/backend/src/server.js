const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Path to the database JSON file
const dbPath = path.join(__dirname, "db.json");

// Helper function to read data from the database
const readData = () => {
  const rawData = fs.readFileSync(dbPath);
  return JSON.parse(rawData);
};

// Helper function to write data to the database
const writeData = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Get all products
app.get("/api/products", (req, res) => {
  const data = readData();
  res.json(data.products);
});

// Add a new product
app.post("/api/products", (req, res) => {
  const { name, price, description, category } = req.body;
  const data = readData();
  const newProduct = {
    id: data.products.length + 1,
    name,
    price,
    description,
    category,
  };
  data.products.push(newProduct);
  writeData(data);
  res.json(newProduct);
});

// Delete a product
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  data.products = data.products.filter(
    (product) => product.id !== parseInt(id)
  );
  writeData(data);
  res.json({ message: "Product deleted successfully" });
});

// Initialize the database if it doesn't exist
if (!fs.existsSync(dbPath)) {
  const initialData = { products: [] };
  writeData(initialData);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
