const express = require("express");
const productsClass = require("./containers/ProductContainer.js");
const productsRouter = require('./routers/productsRouter');

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productsRouter);
app.use('/', express.static('public'));

