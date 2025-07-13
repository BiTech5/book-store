document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("mail").value;
        const password = document.getElementById("password").value;

        const user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user));

        alert("Account created successfully!");
        window.location.href = "login.html";
    });
});
