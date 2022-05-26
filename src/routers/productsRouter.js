const express = require("express");
const productsRouter = express.Router();
const productsClass = require('../containers/ProductContainer');

const productObject = new productsClass('./data/products.json');

productsRouter.get("/", async (req, res) => {
    try {
        const products = await productObject.getAll();
        //res.json(products);
        res.render('productList',{pageTitle: 'ProductListPage', title: 'Products List', products: products});
    } catch (error) {
        res.json({
            error: 'error al obtener los productos'
        });
    }
});

productsRouter.get("/:id", (req, res) => {
    try {
        const product = productObject.getByID(req.params.id);
        res.json(product);
    }
    catch (error) {
        res.json({
            error: 'error al obtener el producto'
        });
    }
});

productsRouter.post("/", (req, res) => {
    try {
         productObject.save(req.body).then((result) => {
            res.json({"Add new Product with id": result});
        });       
    }
    catch (error) {
        res.json({
            error: 'Save product error'
        });
    }
}
);

productsRouter.put("/:id", (req, res) => {
    try {
        console.log('entro put ruta');
        productObject.updateById(req.params.id, req.body)
        .then(
            (result) => {
                res.send({'Success upate product': result.id});
            }
        )
        .catch(
            (error) => {
                res.json({
                    error: 'Update product error'
                });
            }   
        );
    }
    catch (error) {
        res.json({
            error: 'Product update error'
        });
    }  
});

productsRouter.delete("/:id", (req, res) => {
    try {
        productObject.deleteById(req.params.id)
        .then(
            (result) => {
                res.send({'product Id deleted': result.id});
            }
        );
    }
    catch (error) {
        res.json({
            error: 'prudct delete error'    
        });
    }
});



module.exports = productsRouter;
