function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');

    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

document.addEventListener('click', function (event) {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!navbar.contains(event.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        const navLinks = document.getElementById('navLinks');
        const menuToggle = document.querySelector('.menu-toggle');
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});