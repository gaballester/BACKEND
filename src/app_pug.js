const express = require("express");
const productsClass = require("./containers/ProductContainer.js");
const productsRouter = require('./routers/productsRouter');

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//motores de plantillas

app.set('view engine', 'pug');
app.set('views',__dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter);
app.get('/api', (req, res) => {
    res.render('productForm',{pageTitle: 'Products Inputs Page',title: 'Products Inputs Form PUG'});
});

