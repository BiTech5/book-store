let booksData = [];
let currentBooks = [];
let currentPage = 1;
let booksPerPage = 8;
let currentView = 'grid';

async function initializeShop() {
  const res = await fetch('data/books.json');
  booksData = await res.json();
  currentBooks = [...booksData];
  displayBooks();
  updateResultCount();
  createPagination();
}

function displayBooks() {
    const booksGrid = document.getElementById('booksGrid');
    const startIndex = (currentPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const booksToShow = currentBooks.slice(startIndex, endIndex);

    booksGrid.innerHTML = '';

    booksToShow.forEach(book => {
        const bookCard = createBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.className = `book-card ${currentView === 'list' ? 'list-view' : ''}`;
    bookCard.onclick = () => viewBookDetails(book.id);

    const stars = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));

    bookCard.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <div class="book-info">
            <h3>${book.title}</h3>
            <div class="book-author">by ${book.author}</div>
            <div class="book-category">${book.category.charAt(0).toUpperCase() + book.category.slice(1)}</div>
            <div class="book-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">(${book.rating})</span>
            </div>
            <div class="book-price">Rs.${book.price}</div>
            <div class="book-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${book.id})">Add to Cart</button>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); viewBookDetails(${book.id})">View Details</button>
            </div>
        </div>
    `;

    return bookCard;
}

function searchBooks() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    currentBooks = booksData.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    displayBooks();
    updateResultCount();
    createPagination();
}

function filterByCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'all') {
        currentBooks = [...booksData];
    } else {
        currentBooks = booksData.filter(book => book.category === category);
    }

    currentPage = 1;
    displayBooks();
    updateResultCount();
    createPagination();
}

function applyPriceFilter() {
    const minPrice = parseInt(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseInt(document.getElementById('maxPrice').value) || 1000;

    currentBooks = currentBooks.filter(book => book.price >= minPrice && book.price <= maxPrice);
    currentPage = 1;
    displayBooks();
    updateResultCount();
    createPagination();
}

// Sort books
function sortBooks() {
    const sortBy = document.getElementById('sortBy').value;

    switch (sortBy) {
        case 'name':
            currentBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'price-low':
            currentBooks.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentBooks.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            currentBooks.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            currentBooks.sort((a, b) => b.id - a.id);
            break;
    }

    displayBooks();
}

function changeView(view) {
    currentView = view;

    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const booksGrid = document.getElementById('booksGrid');
    if (view === 'list') {
        booksGrid.classList.add('list-view');
    } else {
        booksGrid.classList.remove('list-view');
    }

    displayBooks();
}

function createPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(currentBooks.length / booksPerPage);

    pagination.innerHTML = '';

    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            displayBooks();
            createPagination();
        }
    };
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = currentPage === i ? 'active' : '';
        pageBtn.onclick = () => {
            currentPage = i;
            displayBooks();
            createPagination();
        };
        pagination.appendChild(pageBtn);
    }
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayBooks();
            createPagination();
        }
    };
    pagination.appendChild(nextBtn);
}

function updateResultCount() {
    const resultCount = document.getElementById('resultCount');
    resultCount.textContent = currentBooks.length;
}

function addToCart(bookId) {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!user || !isLoggedIn) {
        alert("Please login to add books to your cart.");
        window.location.href = "login.html";
        return;
    }

    const book = booksData.find(b => b.id === bookId);
    if (!book) {
        alert("Book not found!");
        return;
    }

    const cartKey = `cart_${user.email}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const existing = cart.find(item => item.id === book.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`✅ "${book.title}" has been added to your cart.`);
}


function viewBookDetails(bookId) {
    window.location.href = `book-detail.html?id=${bookId}`;
}

function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
}

window.onload = initializeShop;

