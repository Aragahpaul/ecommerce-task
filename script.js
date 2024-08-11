const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");
if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector(".products");
  const cartCountElement = document.querySelector(".cart-count");
  async function fetchProduct(url) {
    try {
      let data = await fetch(url);
      let response = await data.json();
      console.log(response);

      for (let i = 0; i < response.length; i++) {
        let description = response[i].description;
        let title = response[i].title;
        let productId = response[i].id;

        let formattedPrice = response[i].price.toFixed(2);

        //  generate blog post url for prodfucts using product id
        let postUrl = `./products-1.html?id=${productId}`;

        products.innerHTML += `

        <div class="product">
        <div class="img-section">
        <img src="${response[i].image}" alt="" />
        </div>
        <div class="product-details">
        <h2 class = "product-title">

        <a href="${postUrl}" target"_blank">${
          title.length > 17 ? title.substring(0, 17).concat("...") : title
        }
        </a>
        </h2>
        <h4 class = "product-category">${response[i].category}</h4>
        <p class = "product-description">${
          description.length > 80
            ? description.substring(0, 80).concat("... more")
            : description
        }</p>
        <div class = "product-price-container">
        <h3 class = "price">$${formattedPrice}</h3>
         <a href = "#" data-product-id="${response[i].id}" class="add-to-cart">
         <i class="fa-solid fa-cart-shopping"></i>
         </a>
        </div>
        </div>
        </div>
        `;
      }

      document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          let productId = button.getAttribute("data-productId");
          addToCart(productId);
        });
      });
    } catch (error) {
      console.error("error fetching products:", error);
    }
  }

  function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[productId] = (cart[productId] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    let totalCount = Object.values(cart).reduce((a, b) => a + b, 0);
    cartCountElement.textContent = totalCount;
  }

  updateCartCount();
  fetchProduct("https://fakestoreapi.com/products?limit=5");
});
