const getTotalProductsPrice = (products) => {
    return products.reduce((summ, product) => {
      return summ + product.price * product.quantity;
    }, 0);
  };
  
  
  let products = [];
  
  const setProducts = (newProducts) => {
    products = newProducts;
    render();
    console.log(products);
  };
  
  const productsList = document.querySelector(".products-list");
  const newProductForm = document.querySelector(".new-product-form");
  const nameInput = newProductForm.querySelector("input[name=name]");
  const priceInput = newProductForm.querySelector("input[name=price]");
  const quantityInput = newProductForm.querySelector("input[name=quantity]");
  
  const render = () => {
    productsList.innerHTML = `
      <div class="products-list">
        ${products
          .map(
            (product) => `
              <div class="products-list__row product-row">
                <p>${product.name}</p>
                <p>${product.price} € * ${product.quantity} vnt. = 
                ${product.price * product.quantity} €</p>
                <br>
                <button data-remove-product="${product.id}">Delete</button>
              </div>
          `
          )
          .join("")}
      </div>
      <div class="products-total">
        Total: ${getTotalProductsPrice(products)} €
      </div>
    `;
  };
  
  const addProduct = ({ quantity, name, price }) => {
    setProducts([
      ...products,
      {
        id: crypto.randomUUID(),
        quantity,
        price,
        name
      }
    ]);
  };
  
  const removeProduct = (id) => {
    console.log(id);
    setProducts(products.filter((product) => product.id !== id));
  };
  
  newProductForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value;
    const price = +priceInput.value;
    const quantity = +quantityInput.value;
  
    if (name && price && quantity) {
      addProduct({ name, price, quantity });
      newProductForm.reset();
      nameInput.focus();
    }
  });
  
  productsList.addEventListener("click", (e) => {
    const closestDeleteButton = e.target.closest("[data-remove-product]");
    if (closestDeleteButton) {
      const id = closestDeleteButton.dataset.removeProduct;
      removeProduct(id);
    }
  });
  
  render();
  




