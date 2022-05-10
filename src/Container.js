const fs = require("fs");

class Container {
  
  constructor(fileName) {
    this.fileName = fileName;
  }

  // //obtain the max id number used in the file
  // async getMaxId() {
  //   try {
  //     const products = this.GetAll();
  //     //const maxId = Math.max.apply(null, products.map(p => p.id));
  //     const maxId = Math.max(...products);
  //     console.log("maxId", maxId);
  //     return maxId;
  //   } catch {
  //     return 0;
  //   }
  // }

  async save(product) {
    try {
      let products = [];
      if (fs.existsSync(this.fileName)) {
        products = JSON.parse(
          await fs.promises.readFile(this.fileName, "utf-8")
        );
      }
      product.id =
        Math.max.apply(
          null,
          products.map((p) => p.id)
        ) + 1;
      products.push(product);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(products, null, "\t")
      );
      return product.id;
    } catch (err) {
      return 0;
    }
  }

  async getAll() {
    try {
      const content = await fs.promises.readFile(this.fileName);
      return JSON.parse(content);
    } catch (error) {
      return [];
    }
  }

  async getByID(id) {
    try {
      const products = await this.getAll();
      const product = products.find((p) => p.id == id);
      return product;
    } catch (error) {
      return null;
    }
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();
      const filterProducts = (id, products) =>
        products.filter((item) => item.id != id);
      const productsFiltered = await filterProducts(id, products);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(productsFiltered, null, "\t")
      );
      return "product deleted";
    } catch (error) {
      return error;
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify([], null, "\t")
      );
      return "products deleted";
    } catch (error) {
      return `Error deleting products -> ${error}`;
    }
  }

  async getRandomProduct() {
    try {
      const products = await this.getAll();
      const randomIndex = Math.floor(Math.random() * products.length);
      return products[randomIndex];
    } catch (error) {
      return null;
    }
  }
}

module.exports = Container;
