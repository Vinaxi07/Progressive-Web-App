module.exports = {
    getRandomEleFromArray: function(array) {
      if (Array.isArray(array)) {
        return array[Math.floor(Math.random() * array.length)];
      }
      return undefined;
    },
    getRndInteger: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};