const params = new URLSearchParams(window.location.search);
const bookId = parseInt(params.get("id"));
const detailContainer = document.getElementById("bookDetail");

async function fetchBookDetails() {
  try {
    const res = await fetch("data/books.json");
    const books = await res.json();
    const book = books.find(b => b.id === bookId);

    if (!book) {
      detailContainer.innerHTML = `<p class="not-found">Sorry, book not found.</p>`;
      return;
    }

    const stars = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));

    detailContainer.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="book-image"/>
      <div class="book-info">
        <h1>${book.title}</h1>
        <p class="author"><strong>Author:</strong> ${book.author}</p>
        <p class="category"><strong>Category:</strong> ${capitalize(book.category)}</p>
        <p class="price"><strong>Price:</strong> Rs. ${book.price}</p>
        <p class="rating"><span class="stars">${stars}</span> (${book.rating})</p>
        <p class="description">${book.description}</p>
        <div class="action-buttons">
          <button class="btn btn-primary" onclick="addToCart(${book.id})">Add to Cart</button>
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

function addToCart(bookId) {
  showNotification("✅ Book added to cart!");
  console.log(`Book ${bookId} added to cart`);
}

function showNotification(message) {
  const note = document.getElementById("notification");
  note.textContent = message;
  note.classList.remove("hidden");
  setTimeout(() => note.classList.add("hidden"), 2500);
}

window.onload = fetchBookDetails;
