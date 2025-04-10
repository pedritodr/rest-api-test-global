const express = require('express');
const router = express.Router();

// Lista simulada de productos (en memoria)
let products = [
    {
        id: 1,
        title: "Essence Mascara Lash Princess",
        description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
        category: "beauty",
        price: 9.99,
        discountPercentage: 7.17,
        rating: 4.94,
        stock: 5,
        tags: ["beauty", "mascara"],
        brand: "Essence",
        sku: "RCH45Q1A",
        weight: 2,
        dimensions: { width: 23.17, height: 14.43, depth: 28.01 },
        warrantyInformation: "1 month warranty",
        shippingInformation: "Ships in 1 month",
        availabilityStatus: "Low Stock",
        reviews: [
            { rating: 2, comment: "Very unhappy with my purchase!" },
            { rating: 5, comment: "Very satisfied!" }
        ]
    }
];

// GET /products - Obtener todos los productos
router.get('/', (req, res) => {
    res.json({
        products: products,
        total: products.length,
        skip: 0,
        limit: 30
    });
});

// GET /products/:id - Obtener un producto por ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({ product: {
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock
    }});
});

// POST /products - Crear un producto
router.post('/', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1; // Asignar un nuevo ID
    products.push(newProduct);
    res.json("Creado correctamente");
});

// PUT /products/:id - Actualizar un producto
router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    products[productIndex] = { ...products[productIndex], ...req.body, id: productId };
    res.json("Actualizado correctamente");
});

// DELETE /products/:id - Eliminar un producto
router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    products.splice(productIndex, 1);
    res.json("Eliminado correctamente");
});

module.exports = router;