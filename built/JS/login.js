window.onload = function () {
    setTimeout(() => {
        document.querySelector('.loader').style.display = 'none';
        document.querySelector('#mainco').style.display = 'block';
        document.body.classList.remove('loading');
    }, 1000);


    function check_email() {
        const email = document.getElementById("Email");
        const emailError = document.getElementById("emailerror");
        const test_email = /\S+@\S+\.\S+/.test(email.value.trim());

        if (test_email !== true) {
            if (email.value.trim() === "") {
                emailError.textContent = "";
                email.style.border = "";
            }
            else {
                email.style.border = "2px solid red";
                emailError.textContent = "Enter email in (example@gmail.com) format";
                return false;
            }
        }

        else {
            emailError.textContent = "";
            email.style.border = "";
            return true;
        }
    }

    function check_password() {
        const password = document.getElementById("password");
        const passwordError = document.getElementById("passworderror");

        if (password.value.trim() === "" || password.value.trim().length < 8) {
            if (password.value.trim() === "") {
                passwordError.textContent = "";
                password.style.border = "";
            }
            else {
                password.style.border = "2px solid red";
                passwordError.textContent = "the pass must be over 6 character";
                return false;
            }
        }
        else {
            passwordError.textContent = "";
            password.style.border = "";
            return true;
        }

    }
    window.handleSubmit = function () {
        const submit_button = document.getElementById("submit-btn");
        const validEmail = check_email();
        const validPassword = check_password();

        submit_button.disabled = !(validEmail && validPassword);
        return validEmail && validPassword;

    }

    const form = document.getElementById("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const validEmail = check_email();
        const validPassword = check_password();

        const enteredEmail = document.getElementById("Email").value.trim();
        const enteredPassword = document.getElementById("password").value.trim();

        
        const storedEmail = localStorage.getItem("savedEmail");
        const storedPassword = localStorage.getItem("savedPassword");

        if (validEmail && validPassword) {
            
            if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
                Swal.fire({
                    title: "Done",
                    text: "Success login",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.href = "../HTML/Search Doctors.html";
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: "Incorrect email or password",
                    icon: "error",
                    confirmButtonText: "Try again",
                });
            }
        }
    });

};