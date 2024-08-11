// // product.js

document.addEventListener("DOMContentLoaded", function () {
  // Get the product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    // Fetch product data using the product ID
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        // Populate the page with product details
        document.getElementById("product-content").innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <div class="cart-detail">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h3>$${product.price.toFixed(2)}</h3>
            <div class="p-button">
              <a href="#" id="add-to-cart-button">
                <button>Add To Cart</button>
              </a>
            </div>
            <div class="product-contd">
              <h4>Other Details</h4>
              <div class="product-contd-details">
                <div class="promotions-details">
                  <h5>Promotions</h5>
                  <ul>
                    <li>
                      <h6><a href="#">Call 08141665814 to place Order</a></h6>
                    </li>
                    <li>
                      <h6><a href="#">Need extra Money? Loan up to 500,000 with Cara shops</a></h6>
                    </li>
                    <li>
                      <h6><a href="#">Enjoy cheaper delivery fees when you choose our stations</a></h6>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `;

        // Add event listener to the "Add To Cart" button
        document
          .getElementById("add-to-cart-button")
          .addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default action of the link

            // Get product details to store in localStorage
            const cartItem = {
              id: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: 1, // Default quantity
            };

            // Save the cart item to localStorage
            localStorage.setItem("cartItem", JSON.stringify(cartItem));

            // Redirect to the checkout page
            window.location.href = "checkout.html";
          });
      })
      .catch((error) => console.error("Error fetching product:", error));
  } else {
    // Handle cases where no product ID is provided
    document.getElementById(
      "product-content"
    ).innerHTML = `<p>Product not found.</p>`;
  }
});
