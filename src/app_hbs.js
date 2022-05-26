const express = require("express");
const productsClass = require("./containers/ProductContainer.js");
const productsRouter = require('./routers/productsRouter');

const { engine } = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//motores de plantillas
// app.engine(
//     "hbs",
//     engine({
//       extname: ".hbs",
//       defaultLayout: "productList.hbs",
//     })
//   );
//app.set('view engine', 'hbs');
//app.set('views',__dirname + '/views');

app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "main",
    })
  );
  

app.set('view engine', 'hbs');
app.set('views',__dirname +  '/views');

app.use(express.static(__dirname + '/public'));style="width: 30px; height:30px"

app.use('/api/products', productsRouter);
app.get('/api', (req, res) => {
    //res.render('productForm',{pageTitle: 'Products Inputs Page',title: 'Products Inputs Form'});
    res.render('productForm',{pageTitle: 'Products Inputs Page',title: 'Products Inputs Form'});
});

