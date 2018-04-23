(function (window) {

  function myLibrary() {

    //execute code here
    const catalog = createRandomCatalog(100);

    return {
      searchProductById: searchProductById,
      searchProductsByPrice: searchProductsByPrice,
      searchProductsByType: searchProductsByType,
      searchAllProducts: searchAllProducts
    }

    //function definitions go here

    function createRandomProduct() {
      const typeArray = ['Electronics', 'Book', 'Clothing', 'Food'];
      const price = (Math.random() * 500).toFixed(2);
      const type = typeArray[Math.floor(Math.random() * 4)];

      return {
        price: price,
        type: type
      };
    }

    function createRandomCatalog(num) {
      const catalog = [];

      for (let i = 0; i < num; i++) {
        const item = createRandomProduct();
        catalog.push({
          id: i,
          price: item.price,
          type: item.type
        });
      }

      return catalog;
    }

    function searchAllProducts() {
      const promise = new Promise(function (resolve, reject) {

        setTimeout(function () {
          resolve(catalog);
        }, 1000);

      });

      return promise;
    }

    function searchProductById(id) {
      const promise = new Promise(function (resolve, reject) {
        let i = 0;
        setTimeout(function () {
          while (i < catalog.length) {
            if (catalog[i].id == id) {
              resolve({
                id: id,
                price: catalog[i].price,
                type: catalog[i].type
              });
            }
            i++;
          }
          reject('Invalid ID: ' + id);
        }, 1000);
      });

      return promise;
    }

    function searchProductsByType(type) {
      const promise = new Promise(function (resolve, reject) {
        let i = 0;
        const typeArray = [];
        const possibleTypes = ['Electronics', 'Book', 'Clothing', 'Food'];
        if (!possibleTypes.includes(type)) {
          reject('Invalid type: ' + type);
        } else {
          setTimeout(function () {
            while (i < catalog.length) {
              if (catalog[i].type == type) {
                typeArray.push({
                  id: catalog[i].id,
                  price: catalog[i].price,
                  type: catalog[i].type
                });
              }
              i++;
            }
            resolve(typeArray);
          }, 1000);
        }
      });
      return promise;
    }

    function searchProductsByPrice(price, difference) {
      const promise = new Promise(function (resolve, reject) {
        let i = 0;
        const priceArray = [];
        if (!isFinite(price)) {
          reject('Invalid price: ' + price);
        } else {
          setTimeout(function () {
            while (i < catalog.length) {
              if (Math.abs(catalog[i].price - price) < difference) {
                priceArray.push({
                  id: catalog[i].id,
                  price: catalog[i].price,
                  type: catalog[i].type
                });
              }
              i++;
            }
            resolve(priceArray);
          }, 1000);
        }
      });
      return promise;
    }
  }


  if (typeof (window.api) === 'undefined') {
    window.api = myLibrary();
  }

})(window); 