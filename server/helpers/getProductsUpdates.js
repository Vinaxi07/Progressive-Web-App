const { getRandomEleFromArray, getRndInteger } = require('./utility')

module.exports = {

  productsList: class {
    constructor(products) {
      this.products = products||[]
    }

    updateProductList(updatedProduct) {

      let updatedProductIndex = this.products.findIndex(
        (product) => product.id === updatedProduct.id
      );

      if (updatedProductIndex !== -1) {
        let updatedProducts = [...this.products];
        updatedProducts[updatedProductIndex] = {
          ...this.products[updatedProductIndex],
          ...updatedProduct,
        };
        this.products  = updatedProducts
      }
    }
  },

  updateProductDetails: function (products) {
    let updatedProduct = getRandomEleFromArray(products);

    if (updatedProduct && "price" in updatedProduct) {
      updatedProduct.price = getRndInteger(50, 70);
    }

    if (updatedProduct && "claimed" in updatedProduct) {
      updatedProduct.claimed = updatedProduct.claimed + 1;
    }

    return updatedProduct
  }
}