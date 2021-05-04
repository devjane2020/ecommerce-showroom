class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

//display product

class UI {
  displayProducts(products) {
    let result = "";
    products.forEch((product) => {
      result += `
       <!-- single product -->
          <article class="product">
            <div class="img-container">
              <img
                class="product-img"
                src=${product.image}
                alt="product"
              />
              <button class="bag-btn" data-id=${product.id}>
                <i class="fas fa-shopping-cart">add to cart</i>
              </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
          </article>
          <!-- end of single product -->
    `;
    });
    productsDOM.innerHTML = result;
  }
}

//local storage

class Storage {}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  //get all products
  products.getProducts().then((products) => ui.displayProducts(products));
});
