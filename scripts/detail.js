const params = new URLSearchParams(window.location.search);
const bookId = parseInt(params.get("id"));

const booksData = [
    {
        id: 1,
        title: "The Great Adventure",
        author: "John Smith",
        category: "fiction",
        price: 400,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "An epic tale of courage and discovery in uncharted territories."
    },
];

const book = booksData.find(b => b.id === bookId);

if (book) {
    const container = document.getElementById("bookDetail");
    container.innerHTML = `
        <img src="${book.image}" alt="${book.title}" />
  <div class="book-info">
    <h1>${book.title}</h1>
    <div class="author">Author: ${book.author}</div>
    <div class="category">Category: ${book.category}</div>
    <div class="price">Rs. ${book.price}</div>
    <div class="rating">
      <span class="stars">★★★★☆</span> (${book.rating})
    </div>
    <div class="description">
    ${book.description}
    </div>
    <div class="action-buttons">
      <button class="btn btn-primary">Add to Cart</button>
      <a href="shop.html" class="btn btn-secondary">Back to Shop</a>
    </div>
  </div>
      `;
} else {
    document.getElementById("bookDetail").textContent = "Book not found.";
}