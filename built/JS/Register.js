window.onload = function () {
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('#mainco').style.display = 'block';
        document.body.classList.remove('loading');
    }, 1000);

    function checkEmail() {
        const email = document.getElementById("email").value;
        const confirmEmail = document.getElementById("confirm-email").value;
        const test_email = /\S+@\S+\.\S+/.test(email.trim());

        if (test_email !== true) {
            if (email.trim() === "") {
                document.getElementById("PrimEmail-invalid").innerText = "";
            }
            else {
                document.getElementById("PrimEmail-invalid").innerText = "Enter email in (example@gmail.com) format";
            }
            return false;
        }
        else {
            document.getElementById("PrimEmail-invalid").innerText = "";
        }

        if (email !== confirmEmail) {
            if (confirmEmail.trim() === "") {
                document.getElementById("email-invalid").innerText = "";
            }
            else {
                document.getElementById("email-invalid").innerText = "Emails do not match";
            }
            return false;
        }
        else {
            document.getElementById("email-invalid").innerText = "";
            return true;
        }
    }

    function checkPassword() {
        const password = document.getElementById("pass").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password.trim().length < 8) {
            if (password.trim() === "") {
                document.getElementById("Primepass-invalid").innerText = "";
            }
            else {
                document.getElementById("Primepass-invalid").innerText = "Password must be 8 characters or more";
                return false;
            }
        }
        else {
            document.getElementById("Primepass-invalid").innerText = "";
        }

        if (password !== confirmPassword) {
            if (confirmPassword.trim() === "") {
                document.getElementById("pass-invalid").innerText = "";
            }
            else {
                document.getElementById("pass-invalid").innerText = "Passwords do not match";
            }
            return false;
        }
        else {
            document.getElementById("pass-invalid").innerText = "";
            return true;
        }
    }

    function checkBirthDate() {
        const birthDate = document.getElementById("bd").value.trim();
        const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)(\d{2})$/;
        const match = birthDate.match(pattern);

        if (!match) {
            if (birthDate.trim() === "") {
                document.getElementById("bd-invalid").innerText = "";
            } else {
                document.getElementById("bd-invalid").innerText = "Enter birthdate in DD/MM/YYYY format";
            }
            return false;
        }

        const year = parseInt(match[3] + match[4]);
        if (year > 2024) {
            document.getElementById("bd-invalid").innerText = "Invalid year";
            return false;
        }

        document.getElementById("bd-invalid").innerText = "";
        return true;
    }

    window.handleSubmit = function () {
        const submitBtn = document.getElementById("submit-btn");
        const validEmail = checkEmail();
        const validPassword = checkPassword();
        const validBirthDate = checkBirthDate();
        submitBtn.disabled = !(validEmail && validPassword && validBirthDate);
        return validEmail && validPassword && validBirthDate;
    };

    const form = document.getElementById("register_form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const validEmail = checkEmail();
        const validPassword = checkPassword();
        const validBirthDate = checkBirthDate();

        if (validEmail && validPassword && validBirthDate) {
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("pass").value.trim();

            // Store credentials and hide signup button
            localStorage.setItem("savedEmail", email);
            localStorage.setItem("savedPassword", password);
            localStorage.setItem("hideSignupBtn", "true");

            // Force the home page to check localStorage immediately
            const homePage = window.open("../HTML/Home.html", "_self");
            if (homePage) {
                homePage.onload = function() {
                    homePage.checkSignupBtnVisibility();
                };
            }
        }
    });

    // Add this to make the function available globally
    window.checkSignupBtnVisibility = function() {
        const signupBtn = document.getElementById("signup-btnID");
        if (signupBtn && localStorage.getItem("hideSignupBtn") === "true") {
            signupBtn.style.display = "none";
        }
    };
};