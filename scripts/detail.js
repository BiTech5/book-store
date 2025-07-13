const params = new URLSearchParams(window.location.search);
const bookId = parseInt(params.get("id"));
const detailContainer = document.getElementById("bookDetail");
let currentBook = null; // store book details after fetch

async function fetchBookDetails() {
  try {
    const res = await fetch("data/books.json");
    const books = await res.json();
    const book = books.find(b => b.id === bookId);

    if (!book) {
      detailContainer.innerHTML = `<p class="not-found">Sorry, book not found.</p>`;
      return;
    }

    currentBook = book; // save book globally for addToCart

    const stars = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));

    detailContainer.innerHTML = `
      <div class="book-detail-card">
        <img src="${book.image}" alt="${book.title}" class="book-image"/>
        <div class="book-info">
          <h1>${book.title}</h1>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Category:</strong> ${capitalize(book.category)}</p>
          <p class="price">Rs. ${book.price}</p>
          <p class="rating"><span class="stars">${stars}</span> (${book.rating})</p>
          <p class="description">${book.description}</p>
          <div class="action-buttons">
            <button class="btn btn-primary" onclick="addToCart()">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    detailContainer.innerHTML = `<p class="not-found">Failed to load book data.</p>`;
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function addToCart() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!user || !isLoggedIn) {
    alert("Please login to add books to your cart.");
    window.location.href = "login.html";
    return;
  }

  if (!currentBook) {
    alert("Book data not loaded yet. Try again.");
    return;
  }

  const cartKey = `cart_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existing = cart.find(item => item.id === currentBook.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...currentBook, quantity: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  showNotification(`✅ "${currentBook.title}" added to cart!`);
  console.log(`Book ${currentBook.id} added to cart`);
}

function showNotification(message) {
  const note = document.getElementById("notification");
  note.textContent = message;
  note.classList.remove("hidden");
  note.classList.add("show");

  setTimeout(() => {
    note.classList.remove("show");
    note.classList.add("hidden");
  }, 2500);
}

window.onload = fetchBookDetails;
