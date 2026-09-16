const passwordInput = document.getElementById("password");
const showPasswordButton = document.querySelector(".show-password");

showPasswordButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showPasswordButton.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"></path>
                <line x1="4" y1="4" x2="20" y2="20"></line>
            </svg>
        `;
    } else {
        passwordInput.type = "password";
        showPasswordButton.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"></path>
                <circle cx="12" cy="12" r="2.5"></circle>
            </svg>
        `;
    }
});
