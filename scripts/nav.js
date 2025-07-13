document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
    const navLinks = document.getElementById("navLinks");
  
    if (!navLinks) return;
  
    navLinks.innerHTML = `
      <li><a href="index.html">Home</a></li>
      <li><a href="shop.html">Shop</a></li>
      <li><a href="about.html">About</a></li>
      ${
        isLoggedIn
          ? `
        <li><a href="cart.html"><img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart"></a></li>
        <li><a href="#" id="logoutBtn"><img src="asstes/images/logout.png" alt="Logout"></a></li>
        `
          : `
        <li><a href="signup.html">Sign Up</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="cart.html"><img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="Cart"></a></li>
        `
      }
    `;
  
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "index.html";
      });
    }
  });
  