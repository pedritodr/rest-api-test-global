const express = require('express');
const bodyParser = require('body-parser'); // Permite leer JSON en el cuerpo de las peticiones
const app = express();
const port = 3000; // Puerto del servidor

app.use(bodyParser.json()); // Middleware para analizar JSON

// Ruta para versión del servidor
app.get('/version', (req, res) => {
    res.send({
        name: 'rest-server',
        version: '0.0.1',
        description: "rest-server for demo"
    });
});


/// SECCION DE PRODUCTOS  

// Memory storage para productos 
let products = [
  {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 7.17,
      "rating": 4.94,
      "stock": 5,
      "tags": ["beauty", "mascara"],
      "brand": "Essence",
      "sku": "RCH45Q1A",
      "weight": 2,
      "dimensions": { "width": 23.17, "height": 14.43, "depth": 28.01 },
      "warrantyInformation": "1 month warranty",
      "shippingInformation": "Ships in 1 month",
      "availabilityStatus": "Low Stock",
      "reviews": [
          { "rating": 2, "comment": "Very unhappy with my purchase!" },
          { "rating": 5, "comment": "Very satisfied!" }
      ]
  }
];

// Contador para generar IDs únicos
let nextProductId = 2;

// 1. GET /products
app.get('/products', (req, res) => {
  res.json({
      "products": products,
      "total": products.length,
      "skip": 0,
      "limit": 30
  });
});

// 2. GET /products/:id
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);

  if (product) {
      res.json({ "product": product });
  } else {
      res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// 3. POST /products
app.post('/products', (req, res) => {
  const newProduct = {
      id: nextProductId++,
      ...req.body
  };
  products.push(newProduct);
  res.status(201).send("Creado correctamente");
});

// 4. PUT /products/:id
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(p => p.id === productId);

  if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...req.body };
      res.send("Actualizado correctamente");
  } else {
      res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// 5. DELETE /products/:id
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const initialLength = products.length;
  products = products.filter(p => p.id !== productId);

  if (products.length < initialLength) {
      res.send("Eliminado correctamente");
  } else {
      res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Aquí se inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
