document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("mail").value.trim();
        const password = document.getElementById("password").value;

        if (!name || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[a-zA-Z][a-zA-Z._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const usernamePart = email.split('@')[0];

        if (!emailRegex.test(email)) {
            alert("Invalid email format or email starts with a number.");
            return;
        }

        if (/\d/.test(usernamePart)) {
            alert("Email username should not contain any number.");
            return;
        }

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
