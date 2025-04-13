const express = require('express')
const bodyParser = require('body-parser')//ques es esto????
const app = express()
const port = 3000; //puerto servidor
const host = "localhost"

app.use(bodyParser.json());//que es un middleware

//que es la request y el response en rest
//Status de reponse en rest
app.get('/version', (request, response) => {
    response.send({
        name: 'rest-server',
        version: '0.0.1',
        description: "rest-server  for demo"
    })
})

app.get('/producto/', (request, response) => {
    console.log("lista los usuarios...")
    response.send(
        
        { "products": [ { "id": 1, 
            "title": "Essence Mascara Lash Princess", 
            "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.", 
            "category": "beauty", 
            "price": 9.99, 
            "discountPercentage": 7.17, 
            "rating": 4.94, 
            "stock": 5, 
            "tags": ["beauty", "mascara"], 
            "brand": "Essence", 
            "sku": "RCH45Q1A", "weight": 2, 
            "dimensions": { "width": 23.17, "height": 14.43, "depth": 28.01 }, 
            "warrantyInformation": "1 month warranty", 
            "shippingInformation": "Ships in 1 month", 
            "availabilityStatus": "Low Stock", "reviews": [ { "rating": 2, "comment": "Very unhappy with my purchase!" }, { "rating": 5, "comment": "Very satisfied!" } ] } ], 
            "total": 1, 
            "skip": 0, 
            "limit": 30 
        } 
)
})

const productos = [
    {
      id: 1,
      title: "Essence Mascara Lash Princess",
      description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
      category: "beauty",
      price: 9.99,
      discountPercentage: 7.17,
      rating: 4.94,
      stock: 5
    }
  ];
  
  app.get('/producto/:id', (request, response) => {
    console.log("Busca un producto por ID");
  
    const id = parseInt(request.params.id);
    const productoEncontrado = productos.find(p => p.id === id);
  
    if (productoEncontrado) {
      response.send({ product: productoEncontrado });
    } else {
      response.status(404).send({ error: 'Producto no encontrado' });
    }
  });
  

app.post('/producto/', (request, response) => {
    console.log("agrega los producto");
    response.send(`contenido de request: ${JSON.stringify(request.body)})}`);

})

app.get('/producto/:id', (request, response) => {
    console.log("busca un producto por id")
    response.send(`contenido de request: ${JSON.stringify(request.body)})}`);

})

app.delete('/producto/:id', (request, response) => {
    console.log("elimina un producto por id")
    response.send(`contenido de request: ${JSON.stringify(request.body)})}`);

})

app.put('/producto/:id', (request, response) => {
    console.log("actualiza un producto por id")
    response.send(`contenido de request: ${JSON.stringify(request.body)})}`);
    
})

app.post('/', (request, response) => {
    response.send(`contenido de request: ${JSON.stringify(request.body)})}`);
})

app.get('/clima', async (request, response) => {

    try {
        const apiResponse = await fetch("https://freetestapi.com/api/v1/weathers");
        if (!apiResponse.ok) {
            throw new Error(`Response status: ${apiResponse.status}`);
        }

        const json = await apiResponse.json();
        response.send(json)
        console.log(json);
    } catch (error) {
        console.error(error.message);
        response.status(500).send({error: "Error al obtener datos del clima"});
    }

})

app.listen(port, host, () => {
    console.log(`Servidor escuchando en el puerto 3000`);
  });
