import { getAuth, createUserWithEmailAndPassword } from "./firebase.js";

let userEmail = document.getElementById("useremail");
let userPassword = document.getElementById("userpassword");
let userBtn = document.getElementById("singup-btn");

userBtn.addEventListener("click", () => {
    if (userEmail.value.trim() && userPassword.value.trim()) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Registration successful:", user);
                location.href="singin.html"
                // Success message
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "You have registered successfully.",
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(`Error ${errorCode}: ${errorMessage}`);

                // Error message
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Registration failed!",
                    footer: '<a href="./index.html">Did you fill it out correctly?</a>',
                });
            });
    } else {
        // Validation message if fields are empty
        Swal.fire({
            icon: "warning",
            title: "Incomplete Form",
            text: "Please fill out all fields before submitting.",
        });
    }
});
