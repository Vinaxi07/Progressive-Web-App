const { getRandomEleFromArray, getRndInteger } = require('./utility')

module.exports = function (products) {
  let updatedProduct = getRandomEleFromArray(products);

  if (updatedProduct && "price" in updatedProduct) {
    updatedProduct.price = getRndInteger(50, 70);

    return updatedProduct
  }
};