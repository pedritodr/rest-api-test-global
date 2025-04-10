const express = require('express');
const app = express();
const productsRouter = require('./routes/products');

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica para probar
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Registrar el router de productos
app.use('/products', productsRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});