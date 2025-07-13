document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("mail").value;
        const password = document.getElementById("password").value;

        const user = { name, email, password };
        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(u => u.email === email)) {
            alert("User already exists with this email.");
            return;
        }

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");

        alert("Account created successfully!");
        window.location.href = "login.html";


    });
});
