const Container = require("./Container.js");

const fs = require("fs");


const ejecutarProcess = async () => {

    const container = new Container("./data/products.json");
  
    const product = {
      name: "ThinkPad X1 Yoga Gen 6 | 2 in 1 Business Laptop",
      price: 1319,
      thumbnail:
        "https://p1-ofp.static.pub/fes/cms/2022/03/16/v4dwxvugc90n6gf9oj2tddwevhiwsb899818.png",
    };
    const product2 = {
      name: "ThinkPad X1 Yoga Gen 7 (14” Intel) 2 in 1 Laptop",
      price: 1721.85,
      thumbnail:
        "https://p2-ofp.static.pub/fes/cms/2021/12/06/unvilqz9ei8c22vr6lo6p43xrgpg4t960588.png",
    };
    const product3 = {
      name: "IdeaPad Flex 3i Chromebook (15” Intel) 2 in 1",
      price: 484.99,
      thumbnail:
        "https://p1-ofp.static.pub/ShareResource/na/subseries/hero/lenovo-ideapad-flex-3i-chromebook-15.png",
    };
  
    const id  = await container.save(product);
    const id2 = await container.save(product2);
    const id3 = await container.save(product3);
  
    console.log(
      "Agregué los siguientes 3 productos con ids: ",
      id,
      id2,
      id3
    );
    
    //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    const products = await container.getAll();
    console.log("Obtain all products: ", products);
  
    // getByID(Number): Object - Devuelve el objeto con el id que se pasa como parámetro.
    const productById = await container.getByID(2);
    console.log("Obtain product with id: ", 2, " -> ", productById);
  
    //deleteById(Number): String - Elimina el objeto con el id que se pasa como parámetro.
    await container.deleteById(5);
    console.log("Drop product with id: ", 5);
  
    // muestro los productos que quedaron
    const products2 = await container.getAll();
    console.log("Obtain all remimaned products: ", products2);
  
    // deleteAll():  Elimina todos los objetos del archivo.
    await container.deleteAll();
    console.log("Drop all products");
    const products3 = await container.getAll();
    console.log(products3);
  };
  
  ejecutarProcess();