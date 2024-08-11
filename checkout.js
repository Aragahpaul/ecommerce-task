document.addEventListener("DOMContentLoaded", function () {
  // Retrieve cart item from localStorage
  const cartItem = JSON.parse(localStorage.getItem("cartItem"));

  if (cartItem) {
    // Populate the checkout page with cart details
    document.getElementById("checkout-content").innerHTML = `
      <img src="${cartItem.image}" alt="${cartItem.title}">
      <h2>${cartItem.title}</h2>
      <p>Price: $${cartItem.price.toFixed(2)}</p>
      <p>Quantity: ${cartItem.quantity}</p>
      <h3>Total: $${(cartItem.price * cartItem.quantity).toFixed(2)}</h3>
      <button id="place-order-button">Place Order</button>
    `;

    // Add event listener to the "Place Order" button
    document
      .getElementById("place-order-button")
      .addEventListener("click", function () {
        alert("Order placed successfully!");
        // Clear the cart after placing the order
        localStorage.removeItem("cartItem");
        // Optionally, redirect to a confirmation page or home page
        window.location.href = "order-confirmation.html";
      });
  } else {
    document.getElementById(
      "checkout-content"
    ).innerHTML = `<p>No items in cart.</p>`;
  }
});
