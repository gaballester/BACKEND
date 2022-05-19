const fs = require("fs");

class ProductContainer {
  constructor(fileName) {
    this.fileName = fileName;
  }

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
      //lo parseo porque cuando llega del formulario vinen como string
      product.price = parseFloat(product.price);
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

  async updateById(id, product) {
    try {
      console.log("entro put funcion");
      console.log(id);
      console.log(product);
      const products = await this.getAll();
      const position = products.findIndex(
        (p) => parseInt(p.id) == parseInt(id)
      );
      console.log(position);
      if (position >= 0) {
        products[position] = product;
        products[position].price = parseFloat(product.price);
        products[position].id = parseInt(id);
        await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(products, null, "\t")
        );
        return product;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async getAll() {
    try {
      const content = await fs.promises.readFile(this.fileName);
      return JSON.parse(content);
    } catch (error) {
      return {
        error: error,
      };
    }
  }

  async getByID(id) {
    try {
      const products = await this.getAll();
      const product = products.find((p) => parseInt(p.id) == parseInt(id));
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
      return { status: "product deleted", id: id };
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

module.exports = ProductContainer;
