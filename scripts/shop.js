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
    {
        id: 2,
        title: "Mystery Tales",
        author: "Sarah Johnson",
        category: "mystery",
        price: 350,
        rating: 4.2,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A collection of thrilling mysteries that will keep you guessing."
    },
    {
        id: 3,
        title: "Future Worlds",
        author: "Michael Chen",
        category: "sci-fi",
        price: 450,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Explore the possibilities of tomorrow in this science fiction masterpiece."
    },
    {
        id: 4,
        title: "Classic Literature",
        author: "Emily Brown",
        category: "fiction",
        price: 300,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Timeless stories that have shaped literature for generations."
    },
    {
        id: 5,
        title: "Modern Romance",
        author: "Lisa Wilson",
        category: "romance",
        price: 380,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A heartwarming love story set in contemporary times."
    },
    {
        id: 6,
        title: "History Chronicles",
        author: "Robert Davis",
        category: "history",
        price: 420,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Discover the fascinating stories of our past."
    },
    {
        id: 7,
        title: "The Detective's Case",
        author: "Amanda Clark",
        category: "mystery",
        price: 360,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Follow the brilliant detective as they solve complex cases."
    },
    {
        id: 8,
        title: "Space Odyssey",
        author: "David Miller",
        category: "sci-fi",
        price: 480,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Journey through the cosmos in this epic space adventure."
    },
    {
        id: 9,
        title: "Life Stories",
        author: "Jennifer Taylor",
        category: "biography",
        price: 340,
        rating: 4.1,
        image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Inspiring biographies of remarkable individuals."
    },
    {
        id: 10,
        title: "Self Improvement",
        author: "Mark Anderson",
        category: "self-help",
        price: 320,
        rating: 4.0,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Transform your life with proven strategies and insights."
    },
    {
        id: 11,
        title: "Love in Paris",
        author: "Sophie Martin",
        category: "romance",
        price: 390,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A romantic tale set in the beautiful city of Paris."
    },
    {
        id: 12,
        title: "World War Chronicles",
        author: "Thomas Wilson",
        category: "history",
        price: 460,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A comprehensive look at the events that shaped the 20th century."
    }
];

let currentBooks = [...booksData];
let currentPage = 1;
let booksPerPage = 8;
let currentView = 'grid';

function initializeShop() {
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
    const book = booksData.find(b => b.id === bookId);
    alert(`"${book.title}" has been added to your cart.`);
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

