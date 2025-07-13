document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            alert("No account found. Please sign up first.");
            return;
        }

        if (storedUser.email === email && storedUser.password === password) {
            localStorage.setItem("isLoggedIn", "true");
            alert("Login successful!");
            window.location.href = "index.html"; 
        } else {
            alert("Incorrect email or password.");
        }
    });
});
