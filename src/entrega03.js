const Container = require("./Container.js");
const express = require("express");

const app = express();
const PORT = 8080;


const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);

const container = new Container("./data/products.json");

app.get("/", (req, res) => {
    res.send(`<h1>Coder Backend Course</h1>
              <h2>Guillermo Ballester</h2>`);
}
);

app.get("/productos", (req,res) => {
    container.getAll().then((products) => {
        res.send(products);
    });
}
);

app.get("/productoRandom",(req,res) => {
    container.getRandomProduct().then((products) => {
        res.send(products);
    });
}
);









// const ejecutarProcess = async () => {

//     const container = new Container("./data/products.json");

//     const product = await container.getRandomProduct();
//     console.log("Obtain random product: ", product);
// };

// ejecutarProcess();