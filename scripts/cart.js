document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!user || !isLoggedIn) {
        alert("You must be logged in to view your cart.");
        window.location.href = "login.html";
        return;
    }

    const cartKey = `cart_${user.email}`;
    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const cartBody = document.getElementById("cartBody");
    const grandTotalDisplay = document.getElementById("grandTotal");

    function updateCartDisplay() {
        cartBody.innerHTML = "";
        let grandTotal = 0;

        cart.forEach((item, index) => {
            const total = item.price * item.quantity;
            grandTotal += total;

            const row = document.createElement("tr");

            row.innerHTML = `
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>Rs. ${item.price}</td>
          <td>
            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
          </td>
          <td>Rs. ${total}</td>
          <td>
            <button class="edit-btn" data-index="${index}">Update</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
          </td>
        `;

            cartBody.appendChild(row);
        });

        grandTotalDisplay.textContent = grandTotal;
    }

    cartBody.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains("edit-btn")) {
            const input = cartBody.querySelector(`input[data-index="${index}"]`);
            const newQty = parseInt(input.value);
            if (newQty > 0) {
                cart[index].quantity = newQty;
                saveCart();
            }
        }

        if (e.target.classList.contains("delete-btn")) {
            cart.splice(index, 1);
            saveCart();
        }
    });

    function saveCart() {
        localStorage.setItem(cartKey, JSON.stringify(cart));
        updateCartDisplay();
    }

    updateCartDisplay();
});
